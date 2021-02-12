import pg from "pg"
import {
	TableDescription,
	TableMeta,
	TableMetaCatalog,
	UserTypes,
} from "./types/table-meta"

type TableDict = Record<string, TableDescription>
type SchemaDict = Record<string, TableDict>

export let pgPool: pg.Pool | null = null

export function connect(connectionString: string) {
	pgPool = new pg.Pool({
		connectionString,
	})
}

export function disconnect() {
	if (pgPool) pgPool.end()
}

export async function getDatabaseUserTypes(
	schemaPatterns: string[] = ["public"],
) {
	const query = `
		SELECT n.nspname AS schema,
        pg_catalog.format_type ( t.oid, NULL ) AS name,
        t.typname AS internal_name,
        CASE
            WHEN t.typrelid != 0
            THEN CAST ( 'tuple' AS pg_catalog.text )
            WHEN t.typlen < 0
            THEN CAST ( 'var' AS pg_catalog.text )
            ELSE CAST ( t.typlen AS pg_catalog.text )
        END AS size,
        pg_catalog.array_to_string (
            ARRAY( SELECT e.enumlabel
                    FROM pg_catalog.pg_enum e
                    WHERE e.enumtypid = t.oid
                    ORDER BY e.oid ), E'\n'
            ) AS elements,
        pg_catalog.obj_description ( t.oid, 'pg_type' ) AS description
    FROM pg_catalog.pg_type t
    LEFT JOIN pg_catalog.pg_namespace n
        ON n.oid = t.typnamespace
    WHERE ( t.typrelid = 0
            OR ( SELECT c.relkind = 'c'
                    FROM pg_catalog.pg_class c
                    WHERE c.oid = t.typrelid
                )
        )
        AND NOT EXISTS
            ( SELECT 1
                FROM pg_catalog.pg_type el
                WHERE el.oid = t.typelem
                    AND el.typarray = t.oid
            )
        AND n.nspname <> 'pg_catalog'
        AND n.nspname <> 'information_schema'
        AND pg_catalog.pg_type_is_visible ( t.oid )
    ORDER BY 1, 2;`

	if (!pgPool) throw new ReferenceError("No database connection!")

	const { rows } = await pgPool?.query<UserTypes>(query, schemaPatterns)

	return rows
}

export async function getTableMetaCatalog(
	schemaPatterns: string[] = ["public"],
): Promise<TableMetaCatalog> {
	/**
	 * This query gets all the tables in a schema, WITH their
	 *  * Table comments
	 *  * Column comments
	 *  * Foreign key constraints.
	 * which are then used to filter against what heads to the outer AST.
	 */
	const query = `
	select
  cols.table_schema,
  cols.table_name,
  cols.column_name,
  cols.udt_name,
  cols.is_nullable,
  column_rels.target_table as foreign_table,
	pg_catalog.obj_description(
		(format('"%s"."%s"', cols.table_schema, cols.table_name))::regclass::oid
	) as table_comment,
  (
    select
      pg_catalog.col_description(
        c.oid, cols.ordinal_position :: int
      )
    from
      pg_catalog.pg_class c
    where
      c.oid = (
        SELECT
          (
            format(
              '"%s"."%s"', cols.table_schema, cols.table_name
            )
          )::regclass::oid
      )
      and c.relname = cols.table_name
  ) as column_comment
	from
		information_schema.columns cols
		left join (
			SELECT
				c.relname as "target_table"
			FROM
				pg_catalog.pg_class c
				LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
				AND n.nspname <> 'pg_catalog'
				AND n.nspname <> 'information_schema'
				AND n.nspname !~ '^pg_toast'
				AND pg_catalog.pg_table_is_visible(c.oid)
			ORDER BY
			1
		) column_rels
		ON column_rels.target_table = cols.column_name

		where
			${schemaPatterns
				.map((_, index) => `cols.table_schema = $${index + 1}`)
				.join(" or ")}
		order by
			cols.table_name,
			cols.column_name asc;
	`
	if (!pgPool) throw new ReferenceError("No database connection!")

	const { rows } = await pgPool?.query<TableMeta>(query, schemaPatterns)

	return rows
}

/**
 * Take the result set (columns + tables) and turn them
 * into tables with their meta attached (columns, constraints and comments)
 * and return as a map.
 *
 * @param tables to convert to a meta catalog.
 */
export function convertTableMetaCatalogsToTableDict(
	tables: TableMetaCatalog,
): TableDict {
	const out = {} as TableDict

	for (const table of tables) {
		if (out.hasOwnProperty(table.table_name)) {
			out[table.table_name].columns.push(table)
		} else {
			out[table.table_name] = out[table.table_name] ?? {
				columns: [table],
				table_name: table.table_name,
				table_comment: table.table_comment,
				table_schema: table.table_schema,
				udt_name: table.udt_name,
			}
		}
	}

	return out
}

/**
 * Take a table map and convert it to a map of tables per schema.
 *
 * @param tableDict to convert to a schema dictionary.
 */
export function convertTableDictToSchemaDict(tableDict: TableDict): SchemaDict {
	const out = {} as SchemaDict
	for (const tableName in tableDict) {
		const table = tableDict[tableName]
		out[table.table_schema] = {
			...(out[table.table_schema] ?? {}),
			[table.table_name]: table,
		}
	}

	return out
}
