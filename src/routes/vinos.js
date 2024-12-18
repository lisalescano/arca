const express = require("express");
const router = express.Router();
const { TipoDeVino, Pais, Vino } = require("../db");

router.post("/tipos", async (req, res) => {
    try {
        const { name } = req.body;
        const nuevoTipo = await TipoDeVino.create({ name });
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/tipos", async (req, res) => {
    try {
      const tipos = await TipoDeVino.findAll({
        include: [
          {
            model: Pais,
           
            include: [
              {
                model: Vino,
                as: "Vinos",
              },
            ],
          },
        ],
      });
  
      res.status(200).json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.put("/tipos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const tipo = await TipoDeVino.findByPk(id);
        if (!tipo) return res.status(404).json({ error: "Tipo de vino no encontrado" });
        await tipo.update({ name });
        res.status(200).json(tipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/tipos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await TipoDeVino.findByPk(id);
        if (!tipo) return res.status(404).json({ error: "Tipo de vino no encontrado" });
        await tipo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/paises", async (req, res) => {
    try {
        const { name, tipoVinoId } = req.body;
        const nuevoPais = await Pais.create({ name, tipoVinoId });
        res.status(201).json(nuevoPais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/paises", async (req, res) => {
    try {
        const paises = await Pais.findAll({ include: Vino });
        res.status(200).json(paises);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/vinos", async (req, res) => {
    try {
        const { name, description, price, paisId } = req.body;
        const nuevoVino = await Vino.create({ name, description, price, paisId });
        res.status(201).json(nuevoVino);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/vinos", async (req, res) => {
    try {
        const vinos = await Vino.findAll({ include: Pais });
        res.status(200).json(vinos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/vinos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description, price, paisId } = req.body;
        const vino = await Vino.findByPk(id);
        if (!vino) return res.status(404).json({ error: "Vino no encontrado" });
        await vino.update({ description, price, paisId });
        res.status(200).json(vino);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/vinos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const vino = await Vino.findByPk(id);
        if (!vino) return res.status(404).json({ error: "Vino no encontrado" });
        await vino.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;