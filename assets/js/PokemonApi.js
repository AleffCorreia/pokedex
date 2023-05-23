class PokemonApi {

    convertPokeApiDetailToPokemon(pokeDetail) {
        const pokemon = new Pokemon()
        pokemon.number = pokeDetail.id
        pokemon.name = pokeDetail.name
        pokemon.height = pokeDetail.height
        pokemon.weight = pokeDetail.weight

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types

        pokemon.types = types
        pokemon.type = type

        const abilities = pokeDetail.abilities.map((abilitiesStlot) => abilitiesStlot.ability.name)
        pokemon.abilities = abilities


        const stats = pokeDetail.stats.map((stat) => [stat.stat.name, stat.base_stat + '.']);
        pokemon.stats = stats


        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
     

        return pokemon
    }

    getPokemonDetail = (pokemon) => {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(this.convertPokeApiDetailToPokemon)
    }

    getPokemons = (offset = 0, limit = 5) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(this.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
    }

    getPokemon = (id) => {
        const url =`https://pokeapi.co/api/v2/pokemon/${id}/`
        return fetch(url)
            .then((response) => response.json())
            .then(this.convertPokeApiDetailToPokemon)
    }
    

}