import { Request, Response } from "express";
import { Route } from "@/siteApi/route";
/**
 * Catches all requests that haven't been caught yet.
 */
export class QueryRoute extends Route {
	constructor() {
		super("/something");
	}

	public init(): void {
		this.router.all("/something", (req: Request, res: Response) => { this.handle(req, res); });
	}

	private async handle(req: Request, res: Response) {
		const queryArgs = req.query; // object with key value pairs parsed from the query string (url decoded already)
		if (!queryArgs.q || queryArgs.q.trim().length < 1) {
			res.status(400).end("Query is empty");
		}
		const sqlQuery = queryArgs.q; // normally would not do this because of potential SQL injection but meh
		try {
			const rows: any[] =  await this.siteAPI.db.query(sqlQuery);
			res.status(200).end(JSON.stringify(rows));
		} catch (err) {
			res.status(400).end(JSON.stringify(err));
		}
	}
}
