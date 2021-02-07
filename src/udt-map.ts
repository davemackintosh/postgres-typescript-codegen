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
			return ts.SyntaxKind.StringKeyword
		case "bool":
			return ts.SyntaxKind.BooleanKeyword
		default:
			return ts.SyntaxKind.UnknownKeyword
	}
}
