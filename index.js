const express = require("express");
const path = require("path");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", portfolioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});