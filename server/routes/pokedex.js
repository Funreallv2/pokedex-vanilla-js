import express from 'express'
import getPokedex, {getLengthPokedex} from '../utils/FileReader.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let pokedex = await getPokedex({type: "all"})
    res.status(200).json(pokedex)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})

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

export default router