const Producto = require("../models/productoModels");

// Crear un nuevo producto
// Crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    const {
      id,
      nombre,
      descripcion,
      precio,
      categoria,
      fabricante,
      imagen_url
    } = req.body;

    // Verificar que todos los campos sean obligatorios
    if (
      !id ||
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      !fabricante ||
      !imagen_url
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios para crear un producto." });
    }

    if (!Array.isArray(categoria)) {
      return res
        .status(400)
        .json({ error: "El campo 'categoria' debe ser un array de Strings." });
    }

    const nuevoProducto = new Producto({
      id,
      nombre,
      descripcion,
      precio,
      categoria,
      fabricante,
      imagen_url
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findOne({ id: req.params.id });
    if (!producto) {
      return res.status(404).json({ mensaje: "El Producto no ha sido encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto por ID
const actualizarProducto = async (req, res) => {
  try {
    const actualizado = await Producto.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!actualizado) {
      return res.status(404).json({ mensaje: "El Producto no ha sido encontrado" });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto por ID
const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findOneAndDelete({ id: req.params.id });
    if (!eliminado) {
      return res.status(404).json({ mensaje: "El Producto no ha sido encontrado" });
    }
    res.json({ mensaje: "El Producto ha sido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};
