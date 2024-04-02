const express = require("express");

const app = express();

const rootRouter = require("./routes/index");

const CORS = require("cors");

app.use(CORS());

//?Database connection
const connectDB = require("./utils/connect");

connectDB();


app.use(express.json());
//?Routes
app.use("/api/v1",rootRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    }
);







