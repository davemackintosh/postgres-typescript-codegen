import { Config } from "../src/types/config"

const config: Config = {
	db: {
		connectionString: "postgres://postgres@localhost:5432/dvdrental",
		schemas: ["public"],
	},
	outDir: "./src/",
}

export default config
