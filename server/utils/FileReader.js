import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import getPokemonImgURL from './Image.js'
// __dirname, __filename workaround using es6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __updirname = path.dirname(__dirname)


const getPokedex = async (option) => {
  try {
    const pokemonData = await fs.readFile(path.join(__updirname, 'pokedex.json'), 'utf-8')
    const respond = await JSON.parse(pokemonData)
    // Adding img url to every pokemon
    let newRespond = [];
    respond.forEach(pokemon => {
      newRespond.push({...pokemon, imgUrl: getPokemonImgURL(pokemon.id)})
    });
    // returns single pokemon data
    if (option.type === 'single') {
      
      return await newRespond.find(pokemon => pokemon.id === parseInt(option.id))
    }
    // returns all pokemons
    console.log(newRespond.slice(0, 10))
    return newRespond
  } catch (error) {
    console.error(error)
  }
}
// Gets length of pokedex
export const getLengthPokedex = async () => {
  try {
    const data = await fs.readFile(path.join(__updirname, 'pokedex.json'), 'utf-8')
    const respond = await JSON.parse(data)
    return respond.length
  } catch (error) {
    console.error(error)
  }
}
// Gets pokemons that have 'value' inside their name
export const searchPokedex = async (value) => {
  try {
    const data = await fs.readFile(path.join(__updirname, 'pokedex.json'), 'utf-8')
    const respond = await JSON.parse(data)
    let validPokemons = [];
    respond.filter(pokemon => {
      pokemon.imgUrl = getPokemonImgURL(pokemon.id)
      pokemon.name.english.toLowerCase().includes(value.toLowerCase()) && validPokemons.push(pokemon)
    })
    return validPokemons
  } catch (error) {
    console.error(error)
  }
}


export default getPokedex;
