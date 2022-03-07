import { Router } from "express";
import Controller from "./user.controller";
import Service from "./user.service";
import Repository from "./user.repository";
import mongooseService from "../db/mongoose.service";

const user = (dbService: typeof mongooseService): Router => {
    return Controller(Service(Repository(dbService)));
};

export default user;
