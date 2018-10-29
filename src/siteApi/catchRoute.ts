import { Request, Response } from "express";
import { Route } from "@/siteApi/route";

/**
 * Catches all requests that haven't been caught yet.
 */
export class CatchRoute extends Route {
	constructor() {
		super("*");
	}

	public init(): void {
		this.router.all("*", (req: Request, res: Response) => { this.handle(req, res); });
	}

	private handle(req: Request, res: Response) {
		res.status(404).end();
	}
}
