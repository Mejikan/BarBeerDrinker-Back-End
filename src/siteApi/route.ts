import express from "express";
import { SiteApi } from "@/siteApi/siteApi";

export class Route {
	protected siteApi: SiteApi | null = null;
	protected router: express.Router;
	protected readonly basePath: string;

	constructor(basePath: string) {
		this.basePath = basePath;
		this.router = express.Router();
	}

	public init(siteApi: SiteApi): void {
		this.siteApi = siteApi;
		this.siteApi.express.use(this.basePath, this.router);
		this.siteApi.routes.set(this.basePath, this);
	}
}
