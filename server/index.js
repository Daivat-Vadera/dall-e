const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 8080;
const connectDB = require("./mongodb/connect");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//DB connection
try {
  connectDB(process.env.MONGODB_URL);
} catch (error) {
  console.log(error);
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/post", require("./routes/postRoutes"));
app.use("/api/v1/dalle", require("./routes/dalleRoutes"));

app.get("/", async (req, res) => {
  res.send("Hello from dalle");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
