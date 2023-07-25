import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser"
import * as cors from "cors";
import 'dotenv/config';

import dataSource from "./src/db/connect"
import userRouter from "./src/routes/user.route";
import errorHandler from "./src/util/error.handler";

dataSource.initialize().then((dataSource) => {
    const app = express();

    app.use(cors({
        origin: 'https://auth-user.vercel.app',
        credentials: true
    }));
    app.use(express.json());
    app.use(bodyParser());
    app.use(cookieParser());

    app.use("/api/v1/user", userRouter);
    app.use(errorHandler)

    const port = parseInt(process.env.PORT) || 4000
    app.listen(port, () => console.log("application is running on " + port))
}).catch((err) => console.log(err))

