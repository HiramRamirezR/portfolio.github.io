const endPoint = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon = document.querySelector('.search')
const ok = document.querySelector('.circle')
const display = document.querySelector('.display')
const arriba = document.querySelector('.arriba')
const abajo = document.querySelector('.abajo')

arriba.addEventListener('click', () => {
    pokemon.value ++
})

abajo.addEventListener('click', () => {
    pokemon.value --
    if (pokemon.value <= 0) {
      pokemon.value = 0
    }
})



ok.addEventListener('click', () => {
    display.textContent = ''
  window.fetch(`${endPoint}${pokemon.value.toLowerCase()}`)
    .then(response => {
      if (response.status === 404) {
        /* alert('El Pokemón no está disponible, intenta con otro.') */
        display.textContent = 'El Pokemón no está disponible, intenta con otro. (￣ー￣)'
      } else {
        return response.json()
      }
  })
  .then(responseJSON => {
    const allItems = []
    const result = []
    
    for(let pokemonInfo in responseJSON) {
      result.push([pokemonInfo, responseJSON[pokemonInfo]])
    }
    console.table(result)
    console.log(result)

    //Crear imagen
    const pokemonImg = document.createElement('img')
    pokemonImg.src = result[14][1].front_default
    
    //Nombre y ID
    const pokemonName = document.createElement('h3')
    pokemonName.textContent = `Name: ${result[10][1]}`

    const pokemonId = document.createElement('h3')
    pokemonId.textContent = `PokeID: ${result[6][1]}`

    const pokemonType = document.createElement('h3')
    pokemonType.textContent = `Type: ${result[16][1][0].type.name}`

    display.append(pokemonImg, pokemonName, pokemonId, pokemonType)
    
  })
})