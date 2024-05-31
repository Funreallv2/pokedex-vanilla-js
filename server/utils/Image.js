
const getPokemonImgURL = (id) => {
  let idFormatted = idChecker(id)
  if (idFormatted) {
    return `https://res.cloudinary.com/dmdp4huyc/image/upload/v1717170368/${idFormatted}`
  }
}

const idChecker= (id) => {
  if (id < 1) {
    return false
  } else if (id < 10){
    return `00${id}.png`
  } else if (id < 100) {
    return `0${id}.png`
  } else {
    return `${id}.png`
  }
}

export default getPokemonImgURL;