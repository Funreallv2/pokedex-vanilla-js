import express from 'express';
import pokedex from './routes/pokedex.js'
const PORT = process.env.PORT || 8000;

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use((req, res, next) => {
  console.log(req.method + ` ` + req.url)
  next()
})

app.use('/api/pokedex', pokedex)


app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
})