import { connect, disconnect, getTableMetaCatalog } from "../src/db-ops"

describe("Get ", () => {
	it("Should pull all the tables and schemas.", async () => {
		connect(process.env.CONNECTION_STRING as string)
		const tablesRaw = await getTableMetaCatalog()
		console.log(tablesRaw)

		disconnect()
	})
})
