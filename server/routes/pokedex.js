import express from 'express'
import getPokedex, {getLengthPokedex, searchPokedex} from '../utils/FileReader.js'

const router = express.Router()

// Get  all pokedex
router.get('/', async (req, res) => {
  try {
    let pokedex = await getPokedex({type: "all"})
    res.status(200).json(pokedex)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})
// Get pokemon by id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (!isNaN(id) && id > 0) {
    try {
      let pokedex = await getPokedex({type: "single", id:id})
      if (pokedex) {
        return res.status(200).json(pokedex)
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
  return res.status(500).json({msg: `Element with id: ${id} not found`})
})
// Get pokemon/s by name 
router.get('/search/:text', async (req, res) => {
  const searcInput = req.params.text
  try {
    let results = await searchPokedex(searcInput)
    if (results.length > 0) {
      return res.status(200).json(results)
    }
    return res.status(500).json({msg: "No pokemon found"})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})

export default router