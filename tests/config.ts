import { Config } from "../src/types/config"

const config: Config = {
	db: {
		connectionString:
			process.env.CONNECTION_STRING ??
			"postgres://postgres@localhost:5432/dvdrental",
		schemas: ["public"],
	},
	outDir: "./src/",
}

export default config
