
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const { obtenerProductos, agregarProducto } = require("./sheets");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: false
}));

function authMiddleware(req, res, next) {
  if (req.session.usuario) next();
  else res.redirect("/");
}

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  const { usuario, clave } = req.body;
  if (usuario === "admin" && clave === "1234") {
    req.session.usuario = usuario;
    res.redirect("/productos");
  } else {
    res.send("❌ Usuario o clave incorrectos");
  }
});

app.get("/productos", authMiddleware, async (req, res) => {
  const productos = await obtenerProductos();
  res.render("productos", { productos, usuario: req.session.usuario });
});

app.post("/productos", authMiddleware, async (req, res) => {
  const { codigo, nombre, descripcion, precio } = req.body;
  const nuevoProducto = [codigo, nombre, descripcion, precio];
  try {
    await agregarProducto(nuevoProducto);
    res.redirect("/productos");
  } catch (error) {
    console.error("Error agregando producto:", error);
    res.send("❌ Error al agregar producto");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

app.listen(3000, () => {
  console.log("✅ Servidor corriendo en http://localhost:3000");
});
