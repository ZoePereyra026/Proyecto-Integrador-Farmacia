const Producto = require("../models/productoModels");

// Buscar productos por categoría dentro del array 'categoria'
const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const query = req.query.categoria;

    if (!query) {
      return res.status(400).json({ error: "Debe proporcionar al menos un término de categoría." });
    }

    const fragmentos = query.split(",").map(fragmento =>
      new RegExp(fragmento.trim(), "i") 
    );

    const productos = await Producto.find({
      categoria: { $elemMatch: { $in: fragmentos } }
    });

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron productos con esas categorías." });
    }

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
      imagen_url,
      stock
    } = req.body;

    // Verificar que todos los campos sean obligatorios
    if (
      !id ||
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      !fabricante ||
      !imagen_url ||
      stock === undefined
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
      imagen_url,
      stock
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

// Buscar productos por fabricante
const obtenerProductosPorFabricante = async (req, res) => {
  try {
    const { fabricante } = req.query;

    if (!fabricante) {
      return res.status(400).json({ error: "Se debe porporcionar el nombre del fabricante." });
    }

    const productos = await Producto.find({
      fabricante: { $regex: new RegExp(fabricante, "i") } 
    });

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: "No se han encontrado productos de ese fabricante" });
    }

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar productos por rango de precio
const obtenerProductosPorRangoPrecio = async (req, res) => {
  try {
    const { precioMin, precioMax } = req.query;

    // Validar que al menos un límite de precio esté presente
    if (!precioMin && !precioMax) {
      return res.status(400).json({ error: "Se debe proporcionar al menos un límite de precio" });
    }

    const precioFiltro = {};
    if (precioMin) precioFiltro.$gte = Number(precioMin);
    if (precioMax) precioFiltro.$lte = Number(precioMax);

    const filtro = { precio: precioFiltro };

    // Buscar productos con el filtro
    const productos = await Producto.find(filtro);

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: "No se han encontrado productos que se encuentren en este rango de precio" });
    }

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar solo el stock de un producto determinado solo por su ID
const actualizarStockProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined || typeof stock !== "number" || stock < 0) {
      return res.status(400).json({ error: "El campo 'stock' debe ser un número (no negativo)." });
    }

    const producto = await Producto.findOneAndUpdate(
      { id: parseInt(id) },
      { stock },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: "El Producto no ha sido encontrado." });
    }

    res.json({ mensaje: "El Stock del producto ha sido actualizado correctamente.", producto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerProductosPorCategoria,
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosPorFabricante,
  obtenerProductosPorRangoPrecio,
  actualizarStockProducto
};
