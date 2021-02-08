import { writeFileSync } from "fs"
import ts from "typescript"
import mkdirp from "mkdirp"
import { schemaToModuleWithBody, tableToInterface } from "./ast"
import {
	convertTableDictToSchemaDict,
	convertTableMetaCatalogsToTableDict,
	getTableMetaCatalog,
	connect,
} from "./db-ops"
import { Config } from "./types/config"
const OUTDIR = "./src/generated"

async function main(configPath: string) {
	const config: Config = require(configPath).default
	// Connect to the database.
	connect(config.db.connectionString)

	// Create a "source file" because printer needs one
	// for some reason even though any attempt to write
	// or update it will error with False expression error.
	// Or I don't understand what it's for since there's no
	// documentation that I can find for it.
	const file = ts.createSourceFile(
		OUTDIR,
		"",
		ts.ScriptTarget.Latest,
		false,
		ts.ScriptKind.TS,
	)

	const printer = ts.createPrinter()

	const tablesRaw = await getTableMetaCatalog(["public", "private", "unknown"])
	const tables = convertTableMetaCatalogsToTableDict(tablesRaw)
	const schemas = convertTableDictToSchemaDict(tables)
	const modules: ts.ModuleDeclaration[] = []

	// Generate the modules and populate them with their interfaces.
	for (const schema in schemas) {
		const body = []
		for (const table in schemas[schema]) {
			body.push(tableToInterface(schemas[schema][table]))
		}

		modules.push(schemaToModuleWithBody(schema, body))
	}

	// Wrap the modules in a bigger wrapper which also takes advantage of
	// TypeScript's declarataion merging so our DB will also have the CRUD
	// methods from our static code.
	const out = schemaToModuleWithBody("DB", modules)

	// Convert the AST into a string.
	const moduleSource = printer.printNode(ts.EmitHint.Unspecified, out, file)

	// Write out the file.
	await mkdirp(OUTDIR)
	writeFileSync(OUTDIR + "/crud.d.ts", moduleSource)
}

main(process.argv[2])
