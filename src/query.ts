import { DB } from "./types/db"

export type Ops = "select" | "insert" | "update" | "delete"

export interface QueryTypes<T extends DB.Table> {
	select: [(keyof T["shape"])[] | "*", T["name"], ...SQLPartialValue<T>[]]
}

export type Operation<Q> = Q extends `${infer O}` ? O : unknown
export type SQLPartialValue<T extends DB.Table> =
	| keyof T["shape"]
	| "*"
	| T["name"]
	| T["shape"]

export class Query<T extends DB.Table> {
	constructor(
		private staticParts: string[],
		private values: SQLPartialValue<T>[],
	) {}

	build() {
		console.log(this.staticParts)
	}
}
