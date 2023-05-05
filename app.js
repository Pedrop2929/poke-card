//use it to generate random numbers from 1 - 150
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151)
    fetchData(random)
})

//Create a request with an async function, need to wait for the information to be available
const fetchData = async(id) => {

    //Try: fetch the information from the server then convert it to json
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()

        console.log(data)

        //create a new constant "pokemon", this object will contain the image data and name
        const pokemon = {
                //create property to access image data
                img: data.sprites.other.dream_world.front_default,
               
                name: data.name,
               
                hp: data.stats[0].base_stat,
                
                xp: data.base_experience,
                
                attack: data.stats[1].base_stat,

                special: data.stats[3].base_stat,

                defense: data.stats[2].base_stat,
            }
            //Create function to update the data 
        updateCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const updateCard = (pokemon) => {


    //class "flex" is where the information is stored
    const flex = document.querySelector('.flex ')

    //create const where we access the content of the "template-card", this is used to capture the template
    const template = document.querySelector('#template-card').content

    //use clone when a loop is used in order to avoid errors, ex. arrys
    const clone = template.cloneNode(true)

    //create a fragment for the template 
    const fragment = document.createDocumentFragment()

    //use the selector to access the class that we're trying to change, modify property inside the "pokemon" object 
    clone.querySelector('.card-body-image').setAttribute('src', pokemon.img)

    
    clone.querySelector('.card-body-image').innerHTML = `${pokemon.name} <span>${pokemon.hp}hp </span>`,

        //use the selector to access the class that we're trying to change, modify property inside the "pokemon" object 
        clone.querySelector('.card-body-text').textContent = pokemon.xp + ' ' + 'Exp',

        //use the selector to access the class that we're trying to change, use h3 to change it directly, use array to indicate space, modify property inside the "pokemon" object
        clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack + 'K',
        
        clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.special + 'K',
   
        clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.defense + 'K',

        //use the fragment to save the specified piece of code 
        fragment.appendChild(clone)

    //take data from the fragment and pass it to the "felx" class
    flex.appendChild(fragment)
}
