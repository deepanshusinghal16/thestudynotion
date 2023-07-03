const express = require('express');
const app = express();
//Routes
const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');
const contactUsRoute = require("./routes/Contact");
//db
const { dbConnect } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database se coonnection
dbConnect();
cloudinaryConnect();

//middleware for JSON
app.use(express.json());
app.use(cookieParser());
app.use(
    cors()
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
);

//Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);



app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Yourr  server is running......!!"
    })
});
