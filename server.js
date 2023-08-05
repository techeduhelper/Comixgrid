import express from "express";
import colors from "colors";
import dotenv from 'dotenv'
import morgan from "morgan";
import connectDB from "./db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors';
import productRoute from './routes/productRoute.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


// configure env (4th step)
dotenv.config()

// database connection (6th step)
connectDB();

// rest object (1st step)
const app = express();

// middlewares (5th step)
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// static files
// Serve static files from the 'client/dist' directory
const distDir = join(dirname(fileURLToPath(import.meta.url)), './client/dist');
app.use(express.static(distDir));

// Catch-all route to serve the SPA's index.html
app.get('*', function (req, res) {
    return res.sendFile(join(distDir, 'index.html'));
});


// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes)
app.use("/api/v1/product", productRoute)



// Rest api (2nd step)
app.get("/", (req, res) => {
    res.send(
        "Hello World"
    )
})

// PORT (3rd step)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgYellow.white);
})