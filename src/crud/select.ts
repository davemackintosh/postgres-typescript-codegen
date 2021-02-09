import pg from "pg"
import { DB } from "../types/db"

function returningColumnsValue<Table>(columns?: (keyof Table | "*")[]): string {
	return columns.join(",") ?? "*"
}

/**
 *
 * @param where clause for query.
 */
export async function select<Table>(
	table: DB.TableNames,
	where?: Partial<Table>,
	returning?: (keyof Table)[],
	values: Table[keyof Table],
): Promise<Table[]> {
	const query = new pg.Query<Table>(`
	SELECT ${returningColumnsValue<Table>(returning)} 
	FROM ${table}
	WHERE 
	`)
}
