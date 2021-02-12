export module DB {
	export interface Table {
		schema: string
		name: string
		shape: Record<string, unknown>
	}

	export enum Op {
		Insert = "insert",
		Select = "select",
		Update = "update",
		Delete = "delete",
	}

	/**
	 * In the generated code, this is actually a module
	 * but this file exists to please the TypeScript overlords
	 * in the static code (I.E sql.ts)
	 */
	export type SQL = Record<string, DB.Table>
}
