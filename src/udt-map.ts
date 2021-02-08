import ts from "typescript"
import { TableMeta, TableMetaCatalog, UDTName } from "./types/table-meta"

export function columnToTSSyntaxKindMap({
	udt_name,
}: TableMeta): ts.KeywordTypeSyntaxKind {
	switch (udt_name) {
		case "varchar":
		case "text":
		case "citext":
		case "uuid":
		case "timestamp":
		case "timestamptz":
			return ts.SyntaxKind.StringKeyword
		case "bool":
			return ts.SyntaxKind.BooleanKeyword
		case "int":
		case "int2":
		case "int4":
			return ts.SyntaxKind.NumberKeyword
		default:
			throw new ReferenceError(
				"No way to convert this type. Received '" + udt_name + "'",
			)
	}
}
