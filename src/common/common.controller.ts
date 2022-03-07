import { Router, Request, Response } from "express";

const commonController = () => {
    const router = Router();

    /**
     * Home page.
     * @route GET /
     */
    const index = (req: Request, res: Response) => {
        res.send("ok");
    };

    router.route("/").get(index);

    return router;
};

export default commonController;
