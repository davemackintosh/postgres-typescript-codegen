import { DB } from "types/db"
import { sql } from "../src/sql"

export interface Store extends DB.Table {
	name: "store"
	shape: {
		name: string
		location?: {
			lat: number
			long: number
		}
	}
}

describe("SQL strings are type safe with models", () => {
	it("Should compile with known safe values", () => {
		sql<Store>`SELECT ${"*"} FROM ${"store"} WHERE ${{
			name: "farts",
			nope: 1,
		}} OR ${{ narp: 3 }}`
	})
})
