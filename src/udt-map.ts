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
		case "date":
		case "tsvector":
		case "timestamp":
		case "timestamptz":
		default:
			return ts.SyntaxKind.StringKeyword
		case "bool":
			return ts.SyntaxKind.BooleanKeyword
		case "int":
		case "int2":
		case "int4":
			return ts.SyntaxKind.NumberKeyword
	}
}
