import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import { Env } from "@/siteApi/env";
import { Route } from "@/siteApi/route";

export class SiteApi {
	public static init: SiteApi;

	public static async main(): Promise<void> {
		const siteApi = new SiteApi();
		SiteApi.init = siteApi;

		siteApi.initMiddleware();
		siteApi.initRoutes();
		siteApi.listen();
	}

	public routes: Map<string, Route>;
	public express: express.Application;

	// database

	constructor() {
		dotenv.config();
		this.routes = new Map();
		this.express = express();
	}

	public initMiddleware(): void {
		this.express.use(logger("dev"));
		this.express.use(bodyParser.json());
		this.express.use(cors({
			origin: Env.SITE_VIEW_DOMAIN,
			optionsSuccessStatus: 200,
			credentials: true,
		}));
	}

	public initRoutes(): void {
	}

	public listen(): void {
		this.express.listen(Env.PORT || 8081);

		console.log("Server running on port " + (Env.PORT || 8081));
	}
}

SiteApi.main();
