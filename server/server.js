import express from 'express';
import pokedex from './routes/pokedex.js'
const PORT = process.env.PORT || 8000;

const app = express();

// Accepting json data and urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
// Logger middleware
app.use((req, res, next) => {
  console.log(req.method + ` ` + req.url)
  next()
})
// CORS bypass
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
  })
  next()
}) 
// Pokedex route
app.use('/api/pokedex', pokedex)

// Server port
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
})