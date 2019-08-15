const express = require("express");
const multer = require("multer");
const upload = multer({
  dest: __dirname + "/public/images"
});
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const reloadMagic = require("./reload-magic.js");
const passwords = {};
const sessions = {};
let cart = [];
const checkout = [];
const initialCatalogues = require("./src/data.js");
const catalogues = [...initialCatalogues];
reloadMagic(app);

class Item {
  constructor(title, img, price, category, description) {
    this.title = title;
    this.image = img;
    this.price = price;
    this.category = category;
    this.description = description;
    this.id = generateId();
  }
}

class CheckoutData {
  constructor(
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    cardName,
    cardNumber,
    expDate,
    cVV
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
    this.cardName = cardName;
    this.cardNumber = cardNumber;
    this.expDate = expDate;
    this.cVV = cVV;
  }
}

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

const generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
app.get("/session", (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    const username = sessions[sessionId];
    return res.send(JSON.stringify({ success: true, username }));
  }
  res.send(JSON.stringify({ success: false }));
});
app.get("/", function(req, res) {
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: "Invalid session" })
    );
  }
  res.send(
    JSON.stringify({
      success: true
    })
  );
});
app.post("/signup", upload.none(), (req, res) => {
  console.log("this is the body", req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username]) {
    return res.send(
      JSON.stringify({ success: false, message: "Username taken" })
    );
  }
  passwords[username] = enteredPassword;
  console.log("passwords object", passwords);
  res.send(JSON.stringify({ success: true }));
});
app.post("/login", upload.none(), (req, res) => {
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  console.log("expected password", req.body, passwords);
  if (enteredPassword === expectedPassword) {
    console.log("password matches");
    const sessionId = generateId();
    console.log("generated id", sessionId);
    sessions[sessionId] = username;
    res.cookie("sid", sessionId);
    return res.send(JSON.stringify({ success: true }));
  }
  res.send(JSON.stringify({ success: false, message: "Login failed" }));
});
app.post("/logout", (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});
app.post("/newitem", upload.single("img"), (req, res) => {
  console.log("*** inside new item");
  console.log("body", req.body);
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  console.log("username", username);
  const title = req.body.title;
  const imgPath = req.file ? `/images/${req.file.filename}` : "";
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const newItem = new Item(title, imgPath, price, category, description);
  console.log("new item", newItem);
  const matchedCatalogue = catalogues.find(
    catalogue => catalogue.id === newItem.category
  );
  matchedCatalogue.products.push(newItem);
  res.send(JSON.stringify({ success: true }));
});
app.get("/catalogue", upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  res.send(JSON.stringify({ success: true, catalogues }));
});
app.get("/product", upload.none(), (req, res) => {
  const catalogueId = req.query.catalogueId;
  const productId = req.query.productId;
  const matchedCatalogue = catalogues.find(
    catalogue => catalogue.id === catalogueId
  );
  const matchedProduct = matchedCatalogue.products.find(
    product => Number(product.id) === Number(productId)
  );
  const product = matchedProduct;
  console.log(matchedCatalogue, matchedProduct, catalogues);
  res.send(JSON.stringify({ success: true, product }));
});
app.post("/cart/product", upload.none(), (req, res) => {
  console.log(req.body, "post product");
  const catalogueId = req.body.catalogueId;
  const productId = req.body.productId;
  const matchedCatalogue = catalogues.find(
    catalogue => catalogue.id === catalogueId
  );
  const matchedProduct = matchedCatalogue.products.find(
    product => product.id === Number(productId)
  );
  const product = matchedProduct;
  cart.push(product);
  res.send(JSON.stringify({ success: true, product, cart }));
});
app.get("/cart/product", upload.none(), (req, res) => {
  res.send(JSON.stringify({ success: true, cart }));
});
app.post("/remove/cart/product", upload.none(), (req, res) => {
  const catalogueId = req.body.catalogueId;
  const productId = req.body.productId;
  const matchedCatalogue = catalogues.find(
    catalogue => catalogue.id === catalogueId
  );
  const matchedProduct = matchedCatalogue.products.find(
    product => product.id === Number(productId)
  );
  const product = matchedProduct;
  cart.splice(cart.find(p => p.id === product.id), 1);
  // cart.splice(cart.findIndex(p => p.id), 1);
  res.send(JSON.stringify({ success: true, product, cart }));
});
app.post("/checkoutData", upload.none(), (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const country = req.body.country;
  const cardName = req.body.cardName;
  const cardNumber = req.body.cardNumber;
  const expDate = req.body.expDate;
  const cVV = req.body.cVV;
  const checkoutData = new CheckoutData(
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    cardName,
    cardNumber,
    expDate,
    cVV
  );
  checkout.push(checkoutData);
  cart = [];
  res.send(JSON.stringify({ success: true }));
});
app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
