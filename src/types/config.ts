export interface Config {
	db: {
		connectionString: string
		schemas?: string[]
	}
	outDir: string
}
