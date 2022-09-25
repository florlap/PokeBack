const { Router } = require("express");
const { getAllPokemons } = require("../Controllers/getPokemons");
const { Pokemon, Tipos } = require("../db");

const pokeRouter = Router();


pokeRouter.get('/', async(req, res)=> {
  try {
      const { name } = req.query; 
      const nombres = await getAllPokemons();
      if(name){
        const filtrados = nombres.filter((ele)=> ele.nombre === name)
        filtrados.length 
        ?res.status(200).json(filtrados)
        :res.status(400).json("No se encontro tu poke")
      } else {
        res.status(200).json(nombres)
      }        
      } catch (error) {
      console.log(error)
  }
})



pokeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getAllPokemons();
    const pokeId = data.find((p) => p.id == id);
    if (pokeId) {
      res.status(200).send(pokeId);
    } else {
      res.status(404).send("No se encontro ningun pokemon con ese id");
    }
  } catch (error) {
    console.log(error);
  }
});

pokeRouter.post("/", async (req, res) => {
  try {
    const {
      nombre,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      imagen,
      tipos,
      
    } = req.body;
    const nuevoPoke = await Pokemon.create({
      nombre,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      imagen,
      
    });
    const miBase = await Tipos.findAll({
      where: { nombre: tipos },
    });

    await nuevoPoke.addTipos(miBase);
    res.status(201).send("Tu Pokemon se creo exitosamente!!!");
  } catch (error) {
    console.log(error);
  }
});




module.exports = { pokeRouter };
