import ts, { factory } from "typescript"
import { TableDescription } from "./types/table-meta"
import { columnToTSSyntaxKindMap } from "./udt-map"

const snakeToPascal = (name: string): string =>
	name.replace(/(^\w|-\w|_\w)/g, (text) =>
		text.replace(/[-_]/, "").toUpperCase(),
	)

const commentize = (contents: string): string =>
	`*\n * ${contents.replace(/\n/g, "\n * ")}\n `

export function schemaToModuleWithBody(
	schemaName: string,
	body: ts.Statement[],
) {
	return factory.createModuleDeclaration(
		[],
		factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
		factory.createIdentifier(snakeToPascal(schemaName)),
		factory.createModuleBlock(body),
	)
}

/**
 * Convert a TableDescription to a TypeScript AST object for writing.
 * @param table to convert to TypeScript AST.
 */
export function tableToInterface(table: TableDescription): ts.Statement {
	let interfaceDecl = factory.createInterfaceDeclaration(
		[],
		factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
		factory.createIdentifier(snakeToPascal(table.table_name)),
		[],
		[],
		table.columns.map((column) => {
			const typeValue = column.foreign_table
				? factory.createTypeReferenceNode(
						`${snakeToPascal(column.table_schema)}.${snakeToPascal(
							column.foreign_table,
						)}`,
				  )
				: factory.createKeywordTypeNode(columnToTSSyntaxKindMap(column))

			let node = factory.createPropertySignature(
				[],
				factory.createIdentifier(column.column_name.toLowerCase()),
				column.is_nullable === "YES"
					? factory.createToken(ts.SyntaxKind.QuestionToken)
					: undefined,
				typeValue,
			)

			// Add any column comments.
			if (column.column_comment) {
				node = ts.addSyntheticLeadingComment(
					node,
					ts.SyntaxKind.MultiLineCommentTrivia,
					commentize(column.column_comment),
					true,
				)
			}

			return node
		}),
	)

	// And any table comments.
	if (table.table_comment) {
		interfaceDecl = ts.addSyntheticLeadingComment(
			interfaceDecl,
			ts.SyntaxKind.MultiLineCommentTrivia,
			commentize(table.table_comment),
			true,
		)
	}

	return interfaceDecl
}
