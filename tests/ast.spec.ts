import {
	connect,
	disconnect,
	getTableMetaCatalog,
	convertTableDictToSchemaDict,
	convertTableMetaCatalogsToTableDict,
} from "../src/db-ops"
import { schemaToModuleWithBody, tableToInterface } from "../src/ast"

describe("Create a file which describes the test database", () => {
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

		const tableAST = tableToInterface(schemas.public.store)

		// I don't really like snapshots, but this seems like a pretty good
		// use case for them as writing this out is going to be more erroneous
		// than just generating the one I know is correct to use for comparisons.
		expect(tableAST).toMatchInlineSnapshot(`
		NodeObject {
		  "decorators": Array [],
		  "end": -1,
		  "flags": 8,
		  "heritageClauses": Array [],
		  "kind": 253,
		  "localSymbol": undefined,
		  "locals": undefined,
		  "members": Array [
		    NodeObject {
		      "decorators": undefined,
		      "end": -1,
		      "flags": 8,
		      "kind": 162,
		      "localSymbol": undefined,
		      "locals": undefined,
		      "modifierFlagsCache": 0,
		      "modifiers": Array [],
		      "name": IdentifierObject {
		        "end": -1,
		        "escapedText": "address_id",
		        "flags": 8,
		        "kind": 78,
		        "modifierFlagsCache": 0,
		        "originalKeywordKind": undefined,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 0,
		      },
		      "nextContainer": undefined,
		      "parent": undefined,
		      "pos": -1,
		      "questionToken": undefined,
		      "symbol": undefined,
		      "transformFlags": 1,
		      "type": TokenObject {
		        "end": -1,
		        "flags": 8,
		        "kind": 144,
		        "modifierFlagsCache": 0,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 1,
		      },
		    },
		    NodeObject {
		      "decorators": undefined,
		      "end": -1,
		      "flags": 8,
		      "kind": 162,
		      "localSymbol": undefined,
		      "locals": undefined,
		      "modifierFlagsCache": 0,
		      "modifiers": Array [],
		      "name": IdentifierObject {
		        "end": -1,
		        "escapedText": "last_update",
		        "flags": 8,
		        "kind": 78,
		        "modifierFlagsCache": 0,
		        "originalKeywordKind": undefined,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 0,
		      },
		      "nextContainer": undefined,
		      "parent": undefined,
		      "pos": -1,
		      "questionToken": undefined,
		      "symbol": undefined,
		      "transformFlags": 1,
		      "type": TokenObject {
		        "end": -1,
		        "flags": 8,
		        "kind": 147,
		        "modifierFlagsCache": 0,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 1,
		      },
		    },
		    NodeObject {
		      "decorators": undefined,
		      "end": -1,
		      "flags": 8,
		      "kind": 162,
		      "localSymbol": undefined,
		      "locals": undefined,
		      "modifierFlagsCache": 0,
		      "modifiers": Array [],
		      "name": IdentifierObject {
		        "end": -1,
		        "escapedText": "manager_staff_id",
		        "flags": 8,
		        "kind": 78,
		        "modifierFlagsCache": 0,
		        "originalKeywordKind": undefined,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 0,
		      },
		      "nextContainer": undefined,
		      "parent": undefined,
		      "pos": -1,
		      "questionToken": undefined,
		      "symbol": undefined,
		      "transformFlags": 1,
		      "type": TokenObject {
		        "end": -1,
		        "flags": 8,
		        "kind": 144,
		        "modifierFlagsCache": 0,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 1,
		      },
		    },
		    NodeObject {
		      "decorators": undefined,
		      "end": -1,
		      "flags": 8,
		      "kind": 162,
		      "localSymbol": undefined,
		      "locals": undefined,
		      "modifierFlagsCache": 0,
		      "modifiers": Array [],
		      "name": IdentifierObject {
		        "end": -1,
		        "escapedText": "store_id",
		        "flags": 8,
		        "kind": 78,
		        "modifierFlagsCache": 0,
		        "originalKeywordKind": undefined,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 0,
		      },
		      "nextContainer": undefined,
		      "parent": undefined,
		      "pos": -1,
		      "questionToken": undefined,
		      "symbol": undefined,
		      "transformFlags": 1,
		      "type": TokenObject {
		        "end": -1,
		        "flags": 8,
		        "kind": 144,
		        "modifierFlagsCache": 0,
		        "parent": undefined,
		        "pos": -1,
		        "transformFlags": 1,
		      },
		    },
		  ],
		  "modifierFlagsCache": 0,
		  "modifiers": Array [
		    TokenObject {
		      "end": -1,
		      "flags": 8,
		      "kind": 92,
		      "modifierFlagsCache": 0,
		      "parent": undefined,
		      "pos": -1,
		      "transformFlags": 0,
		    },
		  ],
		  "name": IdentifierObject {
		    "end": -1,
		    "escapedText": "Store",
		    "flags": 8,
		    "kind": 78,
		    "modifierFlagsCache": 0,
		    "originalKeywordKind": undefined,
		    "parent": undefined,
		    "pos": -1,
		    "transformFlags": 0,
		  },
		  "nextContainer": undefined,
		  "parent": undefined,
		  "pos": -1,
		  "symbol": undefined,
		  "transformFlags": 1,
		  "typeParameters": Array [],
		}
	`)

		expect(schemaToModuleWithBody("public", [tableAST])).toMatchInlineSnapshot(`
		NodeObject {
		  "body": NodeObject {
		    "end": -1,
		    "flags": 8,
		    "kind": 257,
		    "modifierFlagsCache": 0,
		    "parent": undefined,
		    "pos": -1,
		    "statements": Array [
		      NodeObject {
		        "decorators": Array [],
		        "end": -1,
		        "flags": 8,
		        "heritageClauses": Array [],
		        "kind": 253,
		        "localSymbol": undefined,
		        "locals": undefined,
		        "members": Array [
		          NodeObject {
		            "decorators": undefined,
		            "end": -1,
		            "flags": 8,
		            "kind": 162,
		            "localSymbol": undefined,
		            "locals": undefined,
		            "modifierFlagsCache": 0,
		            "modifiers": Array [],
		            "name": IdentifierObject {
		              "end": -1,
		              "escapedText": "address_id",
		              "flags": 8,
		              "kind": 78,
		              "modifierFlagsCache": 0,
		              "originalKeywordKind": undefined,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 0,
		            },
		            "nextContainer": undefined,
		            "parent": undefined,
		            "pos": -1,
		            "questionToken": undefined,
		            "symbol": undefined,
		            "transformFlags": 1,
		            "type": TokenObject {
		              "end": -1,
		              "flags": 8,
		              "kind": 144,
		              "modifierFlagsCache": 0,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 1,
		            },
		          },
		          NodeObject {
		            "decorators": undefined,
		            "end": -1,
		            "flags": 8,
		            "kind": 162,
		            "localSymbol": undefined,
		            "locals": undefined,
		            "modifierFlagsCache": 0,
		            "modifiers": Array [],
		            "name": IdentifierObject {
		              "end": -1,
		              "escapedText": "last_update",
		              "flags": 8,
		              "kind": 78,
		              "modifierFlagsCache": 0,
		              "originalKeywordKind": undefined,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 0,
		            },
		            "nextContainer": undefined,
		            "parent": undefined,
		            "pos": -1,
		            "questionToken": undefined,
		            "symbol": undefined,
		            "transformFlags": 1,
		            "type": TokenObject {
		              "end": -1,
		              "flags": 8,
		              "kind": 147,
		              "modifierFlagsCache": 0,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 1,
		            },
		          },
		          NodeObject {
		            "decorators": undefined,
		            "end": -1,
		            "flags": 8,
		            "kind": 162,
		            "localSymbol": undefined,
		            "locals": undefined,
		            "modifierFlagsCache": 0,
		            "modifiers": Array [],
		            "name": IdentifierObject {
		              "end": -1,
		              "escapedText": "manager_staff_id",
		              "flags": 8,
		              "kind": 78,
		              "modifierFlagsCache": 0,
		              "originalKeywordKind": undefined,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 0,
		            },
		            "nextContainer": undefined,
		            "parent": undefined,
		            "pos": -1,
		            "questionToken": undefined,
		            "symbol": undefined,
		            "transformFlags": 1,
		            "type": TokenObject {
		              "end": -1,
		              "flags": 8,
		              "kind": 144,
		              "modifierFlagsCache": 0,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 1,
		            },
		          },
		          NodeObject {
		            "decorators": undefined,
		            "end": -1,
		            "flags": 8,
		            "kind": 162,
		            "localSymbol": undefined,
		            "locals": undefined,
		            "modifierFlagsCache": 0,
		            "modifiers": Array [],
		            "name": IdentifierObject {
		              "end": -1,
		              "escapedText": "store_id",
		              "flags": 8,
		              "kind": 78,
		              "modifierFlagsCache": 0,
		              "originalKeywordKind": undefined,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 0,
		            },
		            "nextContainer": undefined,
		            "parent": undefined,
		            "pos": -1,
		            "questionToken": undefined,
		            "symbol": undefined,
		            "transformFlags": 1,
		            "type": TokenObject {
		              "end": -1,
		              "flags": 8,
		              "kind": 144,
		              "modifierFlagsCache": 0,
		              "parent": undefined,
		              "pos": -1,
		              "transformFlags": 1,
		            },
		          },
		        ],
		        "modifierFlagsCache": 0,
		        "modifiers": Array [
		          TokenObject {
		            "end": -1,
		            "flags": 8,
		            "kind": 92,
		            "modifierFlagsCache": 0,
		            "parent": undefined,
		            "pos": -1,
		            "transformFlags": 0,
		          },
		        ],
		        "name": IdentifierObject {
		          "end": -1,
		          "escapedText": "Store",
		          "flags": 8,
		          "kind": 78,
		          "modifierFlagsCache": 0,
		          "originalKeywordKind": undefined,
		          "parent": undefined,
		          "pos": -1,
		          "transformFlags": 0,
		        },
		        "nextContainer": undefined,
		        "parent": undefined,
		        "pos": -1,
		        "symbol": undefined,
		        "transformFlags": 1,
		        "typeParameters": Array [],
		      },
		    ],
		    "transformFlags": 1,
		  },
		  "decorators": Array [],
		  "end": -1,
		  "flags": 8,
		  "kind": 256,
		  "localSymbol": undefined,
		  "locals": undefined,
		  "modifierFlagsCache": 0,
		  "modifiers": Array [
		    TokenObject {
		      "end": -1,
		      "flags": 8,
		      "kind": 92,
		      "modifierFlagsCache": 0,
		      "parent": undefined,
		      "pos": -1,
		      "transformFlags": 0,
		    },
		  ],
		  "name": IdentifierObject {
		    "end": -1,
		    "escapedText": "Public",
		    "flags": 8,
		    "kind": 78,
		    "modifierFlagsCache": 0,
		    "originalKeywordKind": undefined,
		    "parent": undefined,
		    "pos": -1,
		    "transformFlags": 0,
		  },
		  "nextContainer": undefined,
		  "parent": undefined,
		  "pos": -1,
		  "symbol": undefined,
		  "transformFlags": 1,
		}
	`)
		disconnect()
	})
})
