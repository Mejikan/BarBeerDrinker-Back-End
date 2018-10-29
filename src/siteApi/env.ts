import dotenv from "dotenv";
dotenv.config();

export class Env {
	public static readonly PROJECT_DIR: string = (process.env.PROJECT_DIR || __dirname);
	public static readonly PORT: number = (process.env.PORT ? parseInt(process.env.PORT, 10) : 8081);
	public static readonly SITE_VIEW_DOMAIN: string = (process.env.SITE_VIEW_DOMAIN || "http://localhost:8080");

	public static get DB_HOST(): string {
		if (!process.env.DB_HOST) {
			throw new Error("DB_HOST is undefined");
		}
		return process.env.DB_HOST;
	}

	public static get DB_USER(): string {
		if (!process.env.DB_USER) {
			throw new Error("DB_USER is undefined");
		}
		return process.env.DB_USER;
	}

	public static get DB_PASS(): string {
		if (!process.env.DB_PASS) {
			throw new Error("DB_PASS is undefined");
		}
		return process.env.DB_PASS;
	}

}
