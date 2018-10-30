import mysql, { Connection, ConnectionConfig } from "mysql";
import { Env } from "./env";

export class SQL {
	private connection: Connection;

	constructor() {
		const config: ConnectionConfig = {host: Env.DB_HOST, user: Env.DB_USER, password: Env.DB_PASS} as ConnectionConfig;
		this.connection = mysql.createConnection(config);
		this.connection.connect((err: any) => {
			if (err) {
				let errMsg: string = "";
				if (typeof(err) === "string") {
					errMsg = err;
				} else if (err instanceof Error) {
					errMsg = err.message || err.name;
				}
				throw new Error("Failed to connect " + errMsg);
			} else {
				console.log("Database Connected");
			}
		});
	}

	public async query( query: string ) {
		return new Promise<any[]>( (resolve, reject) => {
			this.connection.query(query, (err, rows) => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
		});
	}

	public close() {
		return new Promise( (resolve, reject) => {
			this.connection.end( (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}

}
