import { pgPool } from "db-ops"
import pg from "pg"
import { DB } from "./types/db"

export type SQLPartialValue<T extends DB.Table> =
	| keyof T["shape"]
	| "*"
	| T["name"]
	| T["shape"]

type SelectQueryType<T extends DB.Table> = [
	(keyof T["shape"])[] | "*",
	T["name"],
	...SQLPartialValue<T>[]
]

interface QueryTypeValues<T extends DB.Table> {
	[DB.Op.Select]: SelectQueryType<T>
}

export async function sql<Op extends DB.Op, Datum extends DB.Table>(
	strings: TemplateStringsArray,
	...interpolations: QueryTypeValues<Datum>[Op]
): Promise<pg.QueryResult<Datum["shape"]>> {
	if (!pgPool) throw new ReferenceError("No PG connection!")

	return pgPool.query<Datum["shape"]>()
}
