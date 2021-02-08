import {
	connect,
	disconnect,
	getTableMetaCatalog,
	convertTableDictToSchemaDict,
	convertTableMetaCatalogsToTableDict,
} from "../src/db-ops"

describe("Get ", () => {
	it("Should pull all the tables and schemas.", async () => {
		// Connect to the database.
		connect(process.env.CONNECTION_STRING as string)

		// Get all the tables, columns, comments, foreign keys, etc.
		const tablesColumnsList = await getTableMetaCatalog()

		expect(tablesColumnsList.length).toBe(128)

		const tablesRaw = convertTableMetaCatalogsToTableDict(tablesColumnsList)

		expect(Object.keys(tablesRaw)).toEqual([
			"actor",
			"actor_info",
			"address",
			"category",
			"city",
			"country",
			"customer",
			"customer_list",
			"film",
			"film_actor",
			"film_category",
			"film_list",
			"inventory",
			"language",
			"nicer_but_slower_film_list",
			"payment",
			"rental",
			"sales_by_film_category",
			"sales_by_store",
			"staff",
			"staff_list",
			"store",
		])

		const schemas = convertTableDictToSchemaDict(tablesRaw)

		expect(schemas.public).toBeTruthy()
		disconnect()
	})
})
