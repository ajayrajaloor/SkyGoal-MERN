const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors')
const router = require("./route/route");
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3001' }));

async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB has been connected:", mongoose.connection.name);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth',router)

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Hx1A63Pi0dcEaaWC