class PokemonCard extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    }


    build(){
        const appRoot = document.createElement('div');
        appRoot.setAttribute('class', 'pokemon_card ' + this.getAttribute('type') );

        const pokemonName = document.createElement('span')
        pokemonName.setAttribute('class', 'pokemon_name')
        pokemonName.setAttribute('value', this.getAttribute('id'))
        pokemonName.textContent = this.getAttribute('name')
        pokemonName.addEventListener('click', () => {
            showPokemonDetail(this.getAttribute('id'))
        })

        const pokemonId = document.createElement('span')
        pokemonId.setAttribute('class', 'pokemon_id')
        pokemonId.textContent = '#00' + this.getAttribute('id')

        const pokemonTypesField = document.createElement('div')
        pokemonTypesField.setAttribute('class', 'pokemon_types')
        
        const pokemonTypes = this.getAttribute('types')
        const typesField = pokemonTypes.split(',')
     
        typesField.map((typeField) => {
            const pokemonType = document.createElement('span')
            pokemonType.setAttribute('class', ('pokemon_type ') +  typeField)
            pokemonType.textContent = typeField
   

            pokemonTypesField.appendChild(pokemonType)
            
        })
        

        const pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('class', 'pokemon_image')
        pokemonImage.src = this.getAttribute('image')
        pokemonImage.alt = this.getAttribute('alt')

       
 

        appRoot.appendChild(pokemonName)
        appRoot.appendChild(pokemonId)
        appRoot.appendChild(pokemonTypesField)
        appRoot.appendChild(pokemonImage)
         


        return appRoot;
    }

    styles(){
        const style = document.createElement('style');
        style.textContent = `
            @import url("./assets/components/pokemon-card/pokemon-card.css");
            @import url("./assets/css/global.css");
        
        `

        return style;
    }
}

customElements.define('pokemon-card', PokemonCard);