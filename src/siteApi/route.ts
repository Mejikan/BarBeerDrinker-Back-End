import express from "express";
import { SiteApi } from "@/siteApi/siteApi";

export class Route {

	protected router: express.Router;
	protected readonly basePath: string;
	private siteApi: SiteApi | null = null;

	protected get siteAPI(): SiteApi {
		if (this.siteApi) {
			return this.siteApi;
		}
		throw Error();
	}

	constructor(basePath: string) {
		this.basePath = basePath;
		this.router = express.Router();
	}

	public preInit(siteApi: SiteApi): void {
		this.siteApi = siteApi;
		this.siteApi.express.use(this.basePath, this.router);
		this.siteApi.routes.set(this.basePath, this);

		this.init();
	}

	protected init(): void {
		//
	}
}
