const express = require("express");

const app = express();

const connectDB = require("./utils/connect");

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    }
);





