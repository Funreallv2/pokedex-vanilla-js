// Getting Elements 
const searchEl = document.getElementById('searchbar')
const pokemonContainer = document.querySelector('.pokedex-container')
const tempBtn = document.querySelector('.temp-btn')

// Search function 
searchEl.addEventListener('keyup', async (e)=>{
  let searchValue = searchEl.value
  pokemonContainer.innerHTML = ``
  let tempArray = await searchInPokedex(searchValue)
  displayPokemons(await tempArray)
})

setUpPokedex()

// Making child for each data that send
async function searchInPokedex(value) {
  try {
    console.log(value)
    if (value === '') {
      console.log("really")
      return await getPokedex()
    }
    let data = await fetch(`http://localhost:8000/api/pokedex/search/${value}`)
    let respond = data.json()
    return respond
  } catch (error) {
    console.error(error)
    return undefined
  }
}

async function getPokedex() {
  try {
    let data = await fetch(`http://localhost:8000/api/pokedex`)
    let result = await data.json()
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}

async function displayPokemons(array) {
  if (array) {
    if (array.msg) {
      pokemonContainer.innerHTML = `<h1>NOT FOUND</h1>`
    } else {
      console.log("passed")
      array.forEach(pokemon => {
        let pokemonEl = document.createElement('div')
        pokemonEl.classList.add('pokedex-item')
        pokemonEl.innerHTML = `
        <img src="${pokemon.imgUrl}" alt="picture of ${pokemon.name.english}">
        <div class="pokedex-desc">
          <p>${pokemon.id}</p>
          <button onclick="playAudio('${pokemon.name.english}')">${pokemon.name.english}</button>
        </div>
        `
        pokemonContainer.appendChild(pokemonEl)
      });  
    }
  } else {
    array = await getPokedex();
    array.forEach(pokemon => {
      let pokemonEl = document.createElement('div')
      pokemonEl.innerHTML = `
      <p>${pokemon.id}</p>
      <p>${pokemon.name.english}</p>
      `
      pokemonContainer.appendChild(pokemonEl)
    })
  }
}

async function setUpPokedex() {
  let result = await getPokedex()
  displayPokemons(await result)
}

async function playAudio(pokemonName) {
  try {
    // Gets the audio data from api
    let result = await fetch(`http://api.voicerss.org/?key=2ee324b0e81647c380339b10a0d7960f&hl=en-us&src=${pokemonName}`)
    let respond = await result.blob()
    // Creates an url for the audio
    let audioUrl = URL.createObjectURL(respond)
    // Creating and audio and merging two 
    let pokemonAudio = new Audio();
    pokemonAudio.src = audioUrl
    pokemonAudio.play()
  } catch (error) {
    console.error(error)
  }
}