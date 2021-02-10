import { DB } from "./types/db"
import { SQLPartialValue, Query } from "./query"

export function sql<Datum extends DB.Table>(
	strings: TemplateStringsArray,
	...interpolations: SQLPartialValue<Datum>[]
): Query<Datum> {
	return new Query<Datum>([...strings], interpolations)
}
