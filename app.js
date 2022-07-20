const express = require("express");
const path = require("path");

let app = express();

const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));

const indexRouter = require("./src/routers/index.js");
const productsRouter = require("./src/routers/products.js");
const usersRouter = require("./src/routers/users.js");

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.listen(process.env.PORT || 3040, () => {
console.log("Servidor corriendo en el puerto 3040");
});




