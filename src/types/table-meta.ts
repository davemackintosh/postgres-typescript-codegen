export type UDTName =
	| "varchar"
	| "uuid"
	| "text"
	| "bool"
	| "citext"
	| "timestamp"
	| "timestamptz"

/**
 * We gather information about the tables in your schemas to generate
 * code from. This is the shape of the data we return from that query
 * in it's singular form.
 */
export interface TableMeta {
	table_schema: string
	table_name: string
	column_name: string
	udt_name: UDTName
	is_nullable: "YES" | "NO"
	foreign_table: string | null
	table_comment: string | null
	column_comment: string | null
}

export type TableMetaCatalog = TableMeta[]

/**
 * We then smush it into a more useful shape and dedupe some data to
 * get this new interface.
 */
export interface TableDescription
	extends Omit<
		TableMeta,
		"column_name" | "is_nullable" | "column_comment" | "foreign_table"
	> {
	columns: TableMeta[]
}
