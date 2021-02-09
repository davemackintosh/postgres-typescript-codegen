import { sql } from "../src/sql"

module DB {
	export interface Store {
		name: string
		location?: {
			lat: number
			long: number
		}
	}
	export module SQL {
		export interface Store {
			name: "store"
			location?: { lat: number; long: number }
			columns: DB.Store
		}
	}
}

describe("SQL strings are type safe with models", () => {
	it("Should compile with known safe values", () => {
		sql<DB.SQL.Store>`SELECT ${"*"} FROM ${"store"} WHERE ${{
			name: "farts",
		}}`
	})
})
