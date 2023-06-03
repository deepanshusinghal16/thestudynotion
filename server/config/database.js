const mongoose = require('mongoose');
require("dotenv").config();


exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((e) => {
            console.log("Error connecting to MongoDB");
            console.error(e);
            process.exit(1);
        })
}
