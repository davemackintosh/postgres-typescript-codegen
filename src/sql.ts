import { pgPool } from "./db-ops"
import pg from "pg"
import { DB } from "./types/db"

export async function select<Datum extends DB.Table>(
	strings: TemplateStringsArray,
	...[cols, name, ...values]: [
		(keyof Datum["shape"])[] | "*",
		Datum["name"],
		Datum["shape"][],
	]
): Promise<pg.QueryResult<Datum["shape"]>> {
	for (const word of strings) {
		console.log(word)
	}

	if (!pgPool) throw new ReferenceError("No PG connection!")

	const query = pgPool?.query<Datum["shape"]>("")

	return query
}
