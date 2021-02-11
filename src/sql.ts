import { pgPool } from "./db-ops"
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

export function columns<Table extends DB.Table>(columns: (keyof Table['shape'])[]): string[] {
	return columns.map(column => `'${column}'`)
}

function parseValue<T>(value: SQLPartialValue<T extends DB.Table>) {
		if (
			typeof value === "string" ||
			typeof value === "number"
		) {
			return value as string
		}

		if (value.toString() === "[object Object]") {
			const keysAndValues: string[] = []
			for (const [key, innerValue] of Object.entries(value)) {
				keysAndValues.push(`"${key}" = ${parseValue<T>(innerValue)}`)
			}
			return keysAndValues.join(" AND ")
		}

		if (Array.isArray(value)) {
			return value.join(", ")
		}
}

/**
 * Execute a query on the server with type safety and auto completion.
 *
 * @param strings that are static.
 * @param interpolations that are values.
 */
export async function sql<
	Op extends keyof QueryTypeValues<Datum>,
	Datum extends DB.Table
>(
	strings: TemplateStringsArray,
	...interpolations: QueryTypeValues<Datum>[Op]
): Promise<pg.QueryResult<Datum["shape"]>> {
	if (!pgPool) throw new ReferenceError("No PG connection!")

	let queryString = strings[0]
	const values: Datum["shape"][] = []

	for (let index = 0, max = interpolations.length; index < max; index++) {
		queryString += parseValue<Datum>(interpolations[index])
		queryString += strings[index + 1]
	}

	console.log(queryString)

	return pgPool.query<Datum["shape"]>(queryString, values)
}
