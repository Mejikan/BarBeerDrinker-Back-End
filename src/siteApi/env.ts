import dotenv from "dotenv";
dotenv.config();

export class Env {
	public static readonly PROJECT_DIR: string = (process.env.PROJECT_DIR || __dirname);
	public static readonly PORT: number = (process.env.PORT ? parseInt(process.env.PORT, 10) : 8081);
	public static readonly SITE_VIEW_DOMAIN: string = (process.env.SITE_VIEW_DOMAIN || "http://localhost:8080");

	public static get DB_URI(): string {
		if (!process.env.DB_URI) {
			throw new Error("DB_URI is undefined");
		}
		return process.env.DB_URI;
	}

	public static get DB_USERNAME(): string {
		if (!process.env.DB_USERNAME) {
			throw new Error("DB_USERNAME is undefined");
		}
		return process.env.DB_USERNAME;
	}

	public static get DB_PASSWORD(): string {
		if (!process.env.DB_PASSWORD) {
			throw new Error("DB_PASSWORD is undefined");
		}
		return process.env.DB_PASSWORD;
	}

	public static get DB_NAME(): string {
		if (!process.env.DB_NAME) {
			throw new Error("DB_NAME is undefined");
		}
		return process.env.DB_NAME;
	}

	public static readonly SESSION_SECRET: string = (process.env.SESSION_SECRET || "CoQgPBtybSNzboVEuGRzi14DUiylDamx");

	public static get PASSPORT_GOOGLE_CLIENT_ID(): string {
		if (!process.env.PASSPORT_GOOGLE_CLIENT_ID) {
			throw new Error("PASSPORT_GOOGLE_CLIENT_ID is undefined");
		}
		return process.env.PASSPORT_GOOGLE_CLIENT_ID;
	}

	public static get PASSPORT_GOOGLE_CLIENT_SECRET(): string {
		if (!process.env.PASSPORT_GOOGLE_CLIENT_SECRET) {
			throw new Error("PASSPORT_GOOGLE_CLIENT_SECRET is undefined");
		}
		return process.env.PASSPORT_GOOGLE_CLIENT_SECRET;
	}
}
