export module DB {
	export interface Table {
		name: string
		shape: Record<string, unknown>
	}

	/**
	 * In the generated code, this is actually a module
	 * but this file exists to please the TypeScript overlords
	 * in the static code (I.E sql.ts)
	 */
	export type SQL = Record<string, DB.Table>
}
