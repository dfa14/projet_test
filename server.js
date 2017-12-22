const express = require("express");
const nunjucks = require("nunjucks");
const api_call = require("./api_call");

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

app.get("/", function(request, result) {
  api_call.categoriesList()
    .then(data => result.render("home",{"categories" : data}))
});

app.get("/categories/:id", function(request, result) {
  api_call.productsByCategory(request.params.id)
    .then(data => result.render("categories",{"productsList": data}))
});

app.get("/products/:id", function(request, result) {
  api_call.productsData(request.params.id)
    .then(data => result.render("products",{"image" : data.image, "price": data.price, "name" : data.name, "description": data.description, "rating" : data.rating}))
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.use(express.static("images"));
