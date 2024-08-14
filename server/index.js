import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./utils/DBUtils.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config({});


const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);


// Start the server
app.listen(port, () => {
  dbConnection();
  console.log(`Server running on port ${port}`);
});
