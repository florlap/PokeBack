const { Pokemon, Tipos } = require("../db");
const axios = require("axios");

const getPokemons = async () => {
  try {
    const pokeApi = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`);
    const pokeInfo = pokeApi.data?.results.map((poke) => {
      // ingresa a las 40 url, 1 x 1
      return axios(poke.url); // hace el subrequest. retorname la data de la url de cada poke
    });
    const promesas = await Promise.all(pokeInfo).then((res) => {
      //ingresa a cada promesa y espera
      const arrPromesas = res.map((prop) => {
        // y mapea cada prpiedad
        return {
          id: prop.data.id,
          nombre: prop.data.name,
          vida: prop.data.stats[0].base_stat,
          ataque: prop.data.stats[1].base_stat,
          defensa: prop.data.stats[2].base_stat,
          velocidad: prop.data.stats[5].base_stat,
          altura: prop.data.height,
          peso: prop.data.weight,
          imagen: prop.data.sprites.other.home.front_default,
          tipos: prop.data.types.map((t) => {
            return {
              nombre: t.type.name,
            };
          }),
          pais: "Argentina"
        };
      });
      return arrPromesas;
    });
    
    return promesas;
  } catch (error) {
    console.log(error);
  }
}; 



// GUARDO POKE EN BASE
const baseDeDatos = async () => {
  try {
    return await Pokemon.findAll({
      include: {
        model: Tipos,
        attributes: ["nombre"],
        through: {
          attributes: [],
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPokemons = async () => {
  try {
    const infoApi = await getPokemons();

    const base = await baseDeDatos();

    if (base.length > 0) {
      const infoTotal = [...infoApi, ...base];
      return infoTotal;
    }
    return infoApi;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPokemons,
  baseDeDatos,
  getAllPokemons,
};












// BUSQUEDA POR NOMBRE desde api 
//  const allPokemonsName = async (name) => {
//   const nombresDeApi = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
//   const deApi = nombresDeApi.data;
//   console.log("ESTO ES NAME API", deApi);
//   return {
//     id: deApi.id,
//     nombre: deApi.name,
//     vida: deApi.stats[0].base_stat,
//     ataque: deApi.stats[1].base_stat,
//     defensa: deApi.stats[2].base_stat,
//     velocidad: deApi.stats[5].base_stat,
//     altura: deApi.height,
//     peso: deApi.weight,
//     imagen: deApi.sprites.other.dream_world.front_default,
//     tipos: deApi.types.map((t) => {
//       return { nombre: t.type.name };
//     }),
//   };
// };