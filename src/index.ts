import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";//for safety
import morgan from "morgan";
import * as dynamoose from "dynamoose";

/*ROUTE IMPORTS */
//import courseRoutes from "./routes/courseRoutes";
/*CONFIGURATIONS*/
dotenv.config();

const isProduction=process.env.NODE_ENV=="production";//convinent for testing

if(!isProduction){
    dynamoose.aws.ddb.local(); // Use local DynamoDB instance instead of AWS
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

/* ROUTES */
app.get("/",(req,res)=>{
    res.send("Hello World")
});

//app.use("/courses",courseRoutes);//any route in courseRoutes are mounted under /courses

/* SERVER */
const port=process.env.PORT || 3000;
if(!isProduction){
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
}