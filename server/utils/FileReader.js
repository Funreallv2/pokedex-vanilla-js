import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __updirname = path.dirname(__dirname)


const getPokedex = async (option) => {
  try {
    const data = await fs.readFile(path.join(__updirname, 'pokedex.json'), 'utf-8')
    const respond = await JSON.parse(data)
    if (option.type === 'single') {
      return await respond.find(pokemon => pokemon.id === parseInt(option.id))
    }
    return respond
  } catch (error) {
    console.error(error)
  }
}

export const getLengthPokedex = async () => {
  try {
    const data = await fs.readFile(path.join(__updirname, 'pokedex.json'), 'utf-8')
    const respond = await JSON.parse(data)
    return respond.length
  } catch (error) {
    console.error(error)
  }
}

export const searchPokedex = async (value) => {
  try {
    const data = await fs.readFile(path.join(__updirname, 'pokedex.json'), 'utf-8')
    const respond = await JSON.parse(data)
    let validPokemons = [];
    respond.filter(pokemon => {
      pokemon.name.english.toLowerCase().includes(value.toLowerCase()) && validPokemons.push(pokemon)
    })
    return validPokemons
  } catch (error) {
    console.error(error)
  }
}

export default getPokedex;
