import { DB } from "../src/types/db"
import { sql } from "../src/sql"
import { connect, disconnect } from "../src/db-ops"
import { Config } from "types/config"

export interface Address extends DB.Table {
	name: "address"
	schema: "public"
	shape: {
		address: string
		district?: string
	}
}

export interface Store extends DB.Table {
	name: "store"
	schema: "public"
	shape: {
		address_id?: string | Address["shape"]
	}
}

beforeAll(() => {
	const config: Config = require("./config").default
	connect(config.db.connectionString)
})
afterAll(() => disconnect())

describe("SQL strings are type safe with models and operations.", () => {
	it("Should compile with known safe values", async () => {
		const query = await sql<
			DB.Op.Select,
			Store
		>`SELECT ${"*"} FROM ${"store"} WHERE ${{
			address_id: sql<DB.Op.Select, Address>`SELECT ${[
				"address_id",
			]} FROM ${"address"}`,
		}}`

		console.log(rows)
	})
})
