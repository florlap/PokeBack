const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const{ pokeRouter} = require("./pokemonRoute")
const {typeRoute} = require("./typeRoute")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemon", pokeRouter)
router.use("/type", typeRoute)


module.exports = router;
