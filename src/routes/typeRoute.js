const { Router } = require ('express');
const axios = require ('axios')
const {Tipos}= require ('../db')

const typeRoute = Router()

typeRoute.get('/', async(req, res)=> {
  try {
      const tiposEnLaBase = await Tipos.findAll()
      if(!tiposEnLaBase.length) {
      const promesa = await axios.get("https://pokeapi.co/api/v2/type")
      const infoTipos = promesa.data.results;
      const tipos = infoTipos.map((type) => {
            return {
              nombre: type.name
              };
          });
          await Tipos.bulkCreate(tipos);
          res.status(200).send(tipos);
          } else {
          res.send(tiposEnLaBase);
          }
          } catch (error) {
            console.log(error)
        }
    })

 
module.exports= {typeRoute}