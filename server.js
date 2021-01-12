const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/article");
const methodOverride = require("method-override");
const PORT = process.env.PORT || "8080";

const app = express();

app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://erentutus:12345@cluster0.nxer6.mongodb.net/<greenHouse>?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ greenHouseName: "asc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(PORT);
