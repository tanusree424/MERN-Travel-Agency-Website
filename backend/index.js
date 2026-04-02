import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import authRoute from "./Routes/AuthRoute.js";
import cors from "cors";
import connectToDatabase from "./Config/DatabaseConnection.js";
import userRoutes from "./Routes/userRoutes.js";
import packageRouter from "./Routes/packageRoutes.js";
import bookingRoutes from "./Routes/BookingsRoute.js";
import contactRoute from "./Routes/ContactRoutes.js";
import reviewRoutes from "./Routes/ReviewRoutes.js";
import DashboardRoutes from "./Routes/DashboardRoutes.js";
import blogRoutes from "./Routes/BlogRoutes.js";
dotenv.config()

const  app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173", "https://travel-agency-frontend-phi.vercel.app"],
    credentials:true
}))
app.use(express.urlencoded({extended:true}));


app.use("/auth", authRoute);
app.use("/user", userRoutes);
app.use("/package", packageRouter)
app.use("/bookings",bookingRoutes);
app.use("/contact",contactRoute);
app.use("/reviews", reviewRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/blogs", blogRoutes)

app.get("/", async (req,res) =>
{
    return res.send("Hello World");
}   
);

const PORT = process.env.PORT || 5000;
const serverConnected = async () => {
    try {
    await   connectToDatabase()
     app.listen(PORT , ()=>{
    console.log(`Server Running on PORT: http://localhost:${PORT}`)
});
    } catch (error) {
       console.log(error?.message) 
    }
}

serverConnected()
