import mysql, { Connection, ConnectionConfig } from "mysql";
import { Env } from "./env";

export class SQL {
	private connection!: Connection;

	constructor() {
		this.handleDisconnect();
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

	private handleDisconnect() {
		const config: ConnectionConfig = {host: Env.DB_HOST, user: Env.DB_USER, password: Env.DB_PASS} as ConnectionConfig;
		this.connection = mysql.createConnection(config); // Always recreate the connection since the old one is invalid

		this.connection.connect((err: any) => {
			if (err) {
				// The server is either down or restarting
				let errMsg: string = "";
				if (typeof(err) === "string") {
					errMsg = err;
				} else if (err instanceof Error) {
					errMsg = err.message || err.name;
				}
				console.error("Failed to connect " + errMsg);

				/**
				 * We introduce a delay before attempting to reconnect to avoid a hot loop and to allow our script
				 * to process async requests in the meantime.
				 */
				setTimeout(this.handleDisconnect, 2000);
			} else {
				console.log("Database Connected");
			}
		});

		this.connection.on("error", (err) => {
			console.error("MySQL Connection Error has occured.");
			console.error(err);

			/**
			 * Connection to the MySQL server is usually lost due to either server restart, or an idle connection
			 * timeout (the wait_timeout server variable configures this).
			 */
			if (err.code === "PROTOCOL_CONNECTION_LOST") {
				this.handleDisconnect();
			} else {
				throw err;
			}
		});
	}

}
