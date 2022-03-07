import MongoStore from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "../util/secrets";
import session from "express-session";

const mongoUrl = MONGODB_URI;
export const mongoStoreSession = session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: {
            autoReconnect: true,
        },
    }),
});
