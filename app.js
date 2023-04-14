const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //use it to generate random numbers from 1 - 150


document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151)
    fetchData(random)
})

//Create a request with an async function, need to wait for the information to be available
//Try: fetch the information from the server then convert it to json 
//Create function to update the data 
const fetchData = async(id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        updateCard(data)
    } catch (error) {
        console.log(error)
    }
}

const updateCard = (pokemon) => {
    console.log(pokemon)

    //class "flex" is where the information is stored
    const flex = document.querySelector('.flex ')

    //create const where we access the content of the "template-card", this is used to capture the template
    const template = document.querySelector('#template-card').content

    //use clone when a loop is used in order to avoid errors, ex. arrys
    const clone = template.cloneNode(true)

    //create a fragment for the template 
    const fragment = document.createDocumentFragment()

    //use the selector to access the class that we're trying to change, modify the src attribute
    clone.querySelector('.card-body-image').setAttribute('src', pokemon.sprites.dream_world.front_default)

    //use the fragment to save the specified piece of code 
    fragment.appendChild(clone)

    //take data from the fragment and pass it to the "felx" class
    flex.appendChild(fragment)
}