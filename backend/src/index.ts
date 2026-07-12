import express from "express";
import cors from "cors";
import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({origin : ENV.FRONTEND_URL}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.get("/", (req, res) => {
    res.send("HEsdiufhsugfullo world");
})

app.listen(ENV.PORT, ()=> {
    console.log(`server running on port ${ENV.PORT}`)
})