import { DB } from "../src/types/db"
import { sql } from "../src/sql"
import ts from "typescript"
import { connect, disconnect } from "../src/db-ops"
import { Config } from "types/config"

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

beforeAll(() => {
	const config: Config = require("./config").default
	connect(config.db.connectionString)
})
afterAll(() => disconnect())

describe("SQL strings are type safe with models and operations.", () => {
	it("Should compile with known safe values", async () => {
		const { rows } = await sql<DB.Op.Select, Store>`SELECT ${[
			"location",
			"name",
		]} FROM ${"store"} WHERE ${{
			name: "farts",
		}} OR ${{ name: "Poops" }}`

		console.log(rows)
	})
})
