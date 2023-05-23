class PokemonDetail extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    }


    build() {
        const appRoot = document.createElement('div');
        appRoot.setAttribute('class', 'container');

        const pokemonDetail = this.pokemonCard()
        appRoot.appendChild(pokemonDetail)

        const pokemonInfo = this.pokemonInfo()
        appRoot.appendChild(pokemonInfo)

        const pokemonHideButton = this.pokemonHideButton();

        appRoot.appendChild(pokemonHideButton);

        return appRoot;
    }

    styles() {
        const style = document.createElement('style');
        style.textContent = `
            @import url("./assets/components/pokemon-detail/pokemon-detail.css");
            @import url("./assets/css/global.css");
            @import url("https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css");
            
        `

        return style;
    }

    pokemonCard() {
        const pokemonDetail = document.createElement('div')
        pokemonDetail.setAttribute('class', 'pokemon_detail ' + this.getAttribute('type'))

        const pokemonName = document.createElement('span')
        pokemonName.setAttribute('class', 'pokemon_name')
        pokemonName.textContent = this.getAttribute('name')

        const pokemonId = document.createElement('span')
        pokemonId.setAttribute('class', 'pokemon_id')
        pokemonId.textContent = '#00' + this.getAttribute('id')

        const pokemonTypesField = document.createElement('div')
        pokemonTypesField.setAttribute('class', 'pokemon_types')

        const pokemonTypes = this.getAttribute('types')
        const typesField = pokemonTypes.split(',')

        typesField.map((typeField) => {
            const pokemonType = document.createElement('span')
            pokemonType.setAttribute('class', ('pokemon_type ') + typeField)
            pokemonType.textContent = typeField


            pokemonTypesField.appendChild(pokemonType)

        })



        const pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('class', 'pokemon_image')
        pokemonImage.src = this.getAttribute('image')
        pokemonImage.alt = this.getAttribute('alt')


        pokemonDetail.appendChild(pokemonName)
        pokemonDetail.appendChild(pokemonId)
        pokemonDetail.appendChild(pokemonTypesField)
        pokemonDetail.appendChild(pokemonImage)


        return pokemonDetail;
    }

    pokemonInfo() {
        const pokemonInfo = document.createElement('div');
        pokemonInfo.setAttribute('class', 'pokemon_info');

        const infoTitle = document.createElement('h3');
        infoTitle.setAttribute('class', 'pokemon_info-title');
        infoTitle.textContent = 'Informações';

        const infoContainer = document.createElement('div');
        infoContainer.setAttribute('class', 'pokemon_info-container');

        const aboutContent = this.pokemonAbout();
        const pokemonStats = this.pokemonStats();

        infoContainer.appendChild(aboutContent);
        infoContainer.appendChild(pokemonStats);

        pokemonInfo.appendChild(infoTitle);
        pokemonInfo.appendChild(infoContainer);




        return pokemonInfo;
    }

    pokemonAbout() {
        const aboutContent = document.createElement('div');
        aboutContent.setAttribute('class', 'content');

        const aboutTitle = document.createElement('h4');
        aboutTitle.setAttribute('class', 'pokemon_info-subtitle');
        aboutTitle.textContent = 'Sobre';

        const pokemonAbout = document.createElement('div');
        pokemonAbout.setAttribute('class', 'pokemon_about')


        const aboutName = document.createElement('span');
        aboutName.setAttribute('class', 'about_name');
        aboutName.textContent = 'Nome'

        const pokemonAboutName = document.createElement('span');
        pokemonAboutName.setAttribute('class', 'pokemon_about-name');
        pokemonAboutName.textContent = this.getAttribute('name');

        const aboutHeight = document.createElement('span');
        aboutHeight.setAttribute('class', 'about_name');
        aboutHeight.textContent = 'Altura'

        const aboutHeightValue = document.createElement('span');
        aboutHeightValue.setAttribute('class', 'pokemon_about-name');
        aboutHeightValue.textContent = this.getAttribute('height');

        const aboutWeight = document.createElement('span');
        aboutWeight.setAttribute('class', 'about_name');
        aboutWeight.textContent = 'Peso'

        const aboutWeightValue = document.createElement('span');
        aboutWeightValue.setAttribute('class', 'pokemon_about-name');
        aboutWeightValue.textContent = this.getAttribute('weight');

        const aboutSkills = document.createElement('span');
        aboutSkills.setAttribute('class', 'about_name');
        aboutSkills.textContent = 'Habilidades'

        const aboutSkillsValue = document.createElement('span');
        aboutSkillsValue.setAttribute('class', 'pokemon_about-name');
        aboutSkillsValue.textContent = this.getAttribute('abilities');

        pokemonAbout.appendChild(aboutName)
        pokemonAbout.appendChild(pokemonAboutName)

        pokemonAbout.appendChild(aboutHeight)
        pokemonAbout.appendChild(aboutHeightValue)

        pokemonAbout.appendChild(aboutWeight)
        pokemonAbout.appendChild(aboutWeightValue)

        pokemonAbout.appendChild(aboutSkills)
        pokemonAbout.appendChild(aboutSkillsValue)


        aboutContent.appendChild(aboutTitle)
        aboutContent.appendChild(pokemonAbout)



        return aboutContent;
    }

    pokemonStats() {
        const pokemonAboutContent = document.createElement('div')
        pokemonAboutContent.setAttribute('class', 'content')

        const skillsTitle = document.createElement('h4');
        skillsTitle.setAttribute('class', 'pokemon_info-subtitle');
        skillsTitle.textContent = 'Status Base';

        const pokemonStats = document.createElement('div');
        pokemonStats.setAttribute('class', 'pokemon_about');

        const stats = this.getAttribute('stats').split('.')
            .filter((i) => i)
            .map((stat) => {
                const newStat = stat.split(',').filter((i) => i)

                return newStat
            })


        stats.map((st) => {
            const statName = document.createElement('span');
            statName.setAttribute('class', 'about_name');
            statName.textContent = st[0];

            const statsInfo = document.createElement('div');
            statsInfo.setAttribute('class', 'statsInfo');

            const statsValue = document.createElement('span');
            statsValue.setAttribute('class', 'stats_value');
            statsValue.textContent = st[1]

            const skillBar = document.createElement('div');
            skillBar.setAttribute('class', 'skill_bar');

            const skillPercentage = document.createElement('span');
            skillPercentage.setAttribute('class', 'skill_percentage');

            skillPercentage.style.maxWidth = '100%';
            skillPercentage.style.width = st[1] +'%';

            if(st[1] > 50){
                skillPercentage.classList.add('grass')
            }else if(st[1] == 50){
                skillPercentage.classList.add('electric')
            }else if(st[1] < 50){
                skillPercentage.classList.add('fire')
            }

            skillBar.appendChild(skillPercentage);

            statsInfo.appendChild(statsValue)
            statsInfo.appendChild(skillBar)

            pokemonStats.appendChild(statName)
            pokemonStats.appendChild(statsInfo)
        })

        pokemonAboutContent.appendChild(skillsTitle)
        pokemonAboutContent.appendChild(pokemonStats)

        return pokemonAboutContent;
    }

    pokemonHideButton(){
        const hideButton = document.createElement('button');
        hideButton.setAttribute('class', 'detail_button '+ this.getAttribute('type'))
        
        const hideButtonIcon = document.createElement('i')
        hideButtonIcon.setAttribute('class','ri-arrow-up-line')
        
        hideButton.appendChild(hideButtonIcon)

        hideButton.addEventListener('click', () => {
            pokemonCards.classList.remove('pokemon_card-hidde')
            pokemonCardDetails.classList.remove('show_details')
        })

        return hideButton;
    }
}

customElements.define('pokemon-detail', PokemonDetail);