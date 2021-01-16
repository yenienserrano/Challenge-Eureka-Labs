const heroes = document.getElementById('hero')
const botonFav = document.getElementById('botonFav')

var id = localStorage.getItem('id')
var heroesFavoritos = [] 
var array = localStorage.getItem( 'heroesFavoritos' ) 
var agregado = 1

heroesFavoritos = JSON.parse(array) || []

document.addEventListener('DOMContentLoaded', e => {
    fetchCaracteristicas()
})

const fetchCaracteristicas = async() => {
    const hash = '636d7bdf09a3641ad6ac81fd24b56923'
    const keyPublic = 'a6e1a342df7b7332ed2ff9b5116ed3b2'
    
    try {
        const result = await fetch( `https://gateway.marvel.com:443/v1/public/characters/${ id }?ts=1&apikey=${ keyPublic }&hash=${ hash }` )
        const data   = await result.json()
        const  results   = await data.data.results
        enfav()
        res( results )
    } catch (error) {
        console.log(error)
    }
}

const res = result => {
    let hero = ''
    
    result.forEach( h => {
        hero += `
        <div class="col-md-5">
            <img  src="${ h.thumbnail.path }.${ h.thumbnail.extension }" class="cardImgDetalle animate__animated animate__fadeInLeft" alt=${ h.name } />
        </div>
        <div class="col-md-7">
            <div class="card-body animate__animated animate__fadeIn">
                <h5 class="card-title"> ${ h.name } </h5>
                <p class="card-text"> ${ ( h.description.length <= 0)? 'No hay descripcion' : h.description  } </p>
                <p class="card-text"> Comics en los que aparece: ${ h.comics.available } </p>
                <p class="card-text"> Series en los que aparece: ${ h.series.available } </p>
                <p class="card-text"> Historias en los que aparece: ${ h.stories.available } </p>
            </div>
        </div>
        `
    });
    heroes.innerHTML = hero
}

const enfav = () => {
    for( var i = 0; i < heroesFavoritos.length; i++ ){
        if( heroesFavoritos[i].id === +id ){
            agregado = 2
            botonFav.classList.add('botonFavoritosAgregado')
            botonFav.classList.remove('botonFavoritos')
            return
        }
            botonFav.classList.remove('botonFavoritosAgregado')
            botonFav.classList.add('botonFavoritos')
         
    }
}

function agregarFav() {

    for( var i = 0; i < heroesFavoritos.length; i++ ){
        if( heroesFavoritos[i].id === +id ){
            botonFav.classList.remove('botonFavoritosAgregado')
            botonFav.classList.add('botonFavoritos')
            heroesFavoritos.splice( i, i + 1)
            localStorage.setItem( 'heroesFavoritos', JSON.stringify( heroesFavoritos ) )
            return
        }
    }
    botonFav.classList.add('botonFavoritosAgregado')
    botonFav.classList.remove('botonFavoritos')
    heroesFavoritos.push({
            id: parseInt(id)
    })
    localStorage.setItem( 'heroesFavoritos', JSON.stringify( heroesFavoritos ) )
    return 
}


