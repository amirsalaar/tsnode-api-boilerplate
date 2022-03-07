import mongoose from "mongoose";
import { MONGODB_URI } from "../util/secrets";
import bluebird from "bluebird";
import logger from "../util/logger";
class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
    };
    constructor() {
        this.connectWithRetry();
    }

    public get getMongoose() {
        mongoose.Promise = bluebird;

        return mongoose;
    }

    /**
     * mongoose.connect() attempts to connect to the local
     * MongoDB service (running with docker-compose) and will time out
     * after serverSelectionTimeoutMS milliseconds.
     *
     * However, @method MongooseService.connectWithRetry() retries the above
     * if the application starts but the MongoDB service is not yet running.
     * Since it’s in a singleton constructor, @method connectWithRetry() will
     * only be run once, but it will retry the connect() call indefinitely,
     * with a pause of @property {retrySeconds} seconds whenever a timeout occurs
     */
    private connectWithRetry() {
        logger.info("Attempting MongoDB connection (will retry if needed)");
        mongoose
            .connect(MONGODB_URI, this.mongooseOptions)
            .then(() => {
                logger.info("MongoDB is connected");
            })
            .catch((err) => {
                const retrySeconds = 5;
                logger.warning(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds}):`,
                    err,
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    }
}

export default new MongooseService();
