
const pokemonCardDetails = document.getElementById('pokemon_details');
const pokemonCards = document.getElementById('pokemon_cards')
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')


const maxRecords = 151
const limit = 8;
let offset = 0;

const pokemonApi = new PokemonApi();

function generatePokemonCard(pokemon){
   return ` 
    <pokemon-card
        name=${pokemon.name}
        type=${pokemon.type}
        types=${pokemon.types}
        image=${pokemon.photo}
        id=${pokemon.number}
        
    ></pokemon-card>`
}
function generatePokemonDetail(pokemon){
   return ` 
    <pokemon-detail
        name=${pokemon.name}
        type=${pokemon.type}
        types=${pokemon.types}
        image=${pokemon.photo}
        id=${pokemon.number}
        weight=${pokemon.weight}
        height=${pokemon.height}
        abilities=${pokemon.abilities}
        stats=${pokemon.stats}
        
        
    ></pokemon-detail>`
}

async function loadPokemons(offset, limit){
    await pokemonApi.getPokemons(offset, limit)
    .then((pokemons = [] ) => {
        
        pokemonCards.innerHTML = pokemons.map(generatePokemonCard).join('')
        
    })
   
}

loadPokemons(offset, limit)

function loadPokemonDetail(id){
    const pokemon = pokemonApi.getPokemon(id)
        .then((pokemon) => {
            pokemonCardDetails.innerHTML = generatePokemonDetail(pokemon)
        })
}


function showPokemonDetail(value){
    pokemonCards.classList.add('pokemon_card-hidde')
    pokemonCardDetails.classList.add('show_details')
    loadPokemonDetail(value)
}

nextButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)
        nextButton.classList.add('hidde_controller-button')
       
        
    } else {
        loadPokemons(offset, limit)
        prevButton.classList.remove('hidde_controller-button')
       
    }
})


prevButton.addEventListener('click', () => {
  if(offset > 0){
    
    offset -= limit
    loadPokemons(offset, limit)
    nextButton.classList.remove('hidde_controller-button')
  }

  if(offset <= 0)
    prevButton.classList.add('hidde_controller-button')
})

