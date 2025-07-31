const Categoria = require("../models/categoriaModels");

// Crear una nueva categoría
const crearCategoria = async (req, res) => {
  try {
    const {
      id,
      nombre,
      descripcion,
      destacada,
      estado
    } = req.body;

    // Verificar que todos los campos sean obligatorios
    if (
      !id ||
      !nombre ||
      !descripcion ||
      typeof destacada === "undefined" ||
      typeof estado === "undefined"
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios para crear una categoría." });
    }

    const existeCategoria = await Categoria.findOne({ id });
    if (existeCategoria) {
      return res
        .status(400)
        .json({ error: "Ya existe una categoría con ese ID." });
    }

    const nuevaCategoria = new Categoria({
      id,
      nombre,
      descripcion,
      destacada,
      estado
    });

    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ id: req.params.id });
    if (!categoria) {
      return res.status(404).json({ mensaje: "La Categoría no ha sido encontrada." });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una categoría por ID
const actualizarCategoria = async (req, res) => {
  try {
    const actualizada = await Categoria.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!actualizada) {
      return res.status(404).json({ mensaje: "La Categoría no ha sido encontrada." });
    }
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una categoría por ID 
const eliminarCategoria = async (req, res) => {
  try {
    const eliminada = await Categoria.findOneAndDelete({ id: req.params.id });

    if (!eliminada) {
      return res.status(404).json({ mensaje: "La Categoría no ha sido encontrada." });
    }

    res.json({ mensaje: "La Categoría ha sido eliminada correctamente.", categoria: eliminada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Desactivar una categoría por ID. 
// Esta función puede ser útil si se quiere mantener la categoría en la BD pero no mostrarla.
const desactivarCategoria = async (req, res) => {
  try {
    const desactivada = await Categoria.findOneAndUpdate(
      { id: req.params.id },
      { estado: false },
      { new: true }
    );

    if (!desactivada) {
      return res.status(404).json({ mensaje: "Categoría no encontrada." });
    }

    res.json({ mensaje: "Categoría desactivada correctamente.", categoria: desactivada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  desactivarCategoria,
  eliminarCategoria
};
