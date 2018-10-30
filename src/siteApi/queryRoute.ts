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

		const rows: any[] =  await this.siteAPI.db.query("SELECT *  FROM BarBeerDrinker.bars LIMIT 1 ;");
		const row = rows[0];
		res.status(200).end(row.name);
	}
}
