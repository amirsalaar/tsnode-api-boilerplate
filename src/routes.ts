import { Router } from "express";
import mongooseService from "./db/mongoose.service";
import commonController from "./common/common.controller";
import User from "./user";

const appRouter = (dbService: typeof mongooseService): Router => {
    const routes = Router();

    routes.use("/", commonController());
    routes.use("/users", User(dbService));

    return routes;
};

export default appRouter;
