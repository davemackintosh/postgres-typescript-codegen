import pg from "pg"
import { DB } from "../src/types/db"

export function sql<Datum extends DB.SQL>(
	strings: TemplateStringsArray,
	...values: [
		(keyof Datum["columns"])[] | "*",
		Datum["name"],
		...Datum["columns"][]
	]
): pg.Query<Datum["columns"]> {
	for (const word of strings) {
		console.log(word)
	}

	const query = new pg.Query<Datum["columns"]>("")

	return query
}
