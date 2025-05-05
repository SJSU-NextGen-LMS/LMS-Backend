import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";//for safety
import morgan from "morgan";
import * as dynamoose from "dynamoose";
import {
    clerkMiddleware,
    createClerkClient,
    requireAuth,
  } from "@clerk/express";


/*ROUTE IMPORTS */
import courseRoutes from "./routes/courseRoutes";
import progressRoutes from "./routes/progressRoutes";
import moduleRoutes from "./routes/moduleRoutes";
import userClerkRoutes from "./routes/userClerkRoutes";

/*CONFIGURATIONS*/
dotenv.config();

const isProduction=process.env.NODE_ENV=="production";//convinent for testing

if(!isProduction){
    dynamoose.aws.ddb.local(); // Use local DynamoDB instance instead of AWS
}

export const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(clerkMiddleware());

/* ROUTES */
app.get("/",(req,res)=>{
    res.send("Hello World")
});

app.use("/courses", courseRoutes); //any route in courseRoutes are mounted under /courses
app.use("/modules",moduleRoutes);
app.use("/progress", progressRoutes); //any route in progressRoutes are mounted under /progress
app.use("/users/clerk", requireAuth(), userClerkRoutes);

/* SERVER */
const port=process.env.PORT || 3001;
if(!isProduction){
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
}