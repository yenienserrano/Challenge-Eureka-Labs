const heroes = document.getElementById('heroes')

let id              = ''
let heroesFavorites = [] 
let heroesFav = []
let array           = localStorage.getItem( 'heroesFavoritos' ) 

heroesFavorites     = JSON.parse(array) || [{}]

document.addEventListener('DOMContentLoaded', e => {
    fetchCaracteristicas()
})

const fetchCaracteristicas = async() => {
    const hash      = '636d7bdf09a3641ad6ac81fd24b56923'
    const keyPublic = 'a6e1a342df7b7332ed2ff9b5116ed3b2'
          id        = localStorage.getItem('id') 
    
    try {

        for (let i = 0; i < heroesFavorites.length; i++) {
            console.log(1)
            const result  = await fetch( `https://gateway.marvel.com:443/v1/public/characters/${ heroesFavorites[i].id }?ts=1&apikey=${ keyPublic }&hash=${ hash }` )
            const data    = await result.json()
            const results = await data.data.results
            heroesFav.push( results )
        }

        res( heroesFav )
    } catch (error) {
        console.log(error)
    }
}

const res = resultadoHeroes => {
    let hero = ''
    resultadoHeroes.forEach( ([ h ]) => {
        console.log( h )
        hero += `
        <div class="col-sm-6 col-lg-3">
            <div class="card-hero animate__animated animate__fadeIn">
                <a href="./caracteristicas.html" onclick="superheroeId( ${ h.id } )"><img src="${ h.thumbnail.path }.${ h.thumbnail.extension }" class="img-card" height="200" alt="${ h.name }"></a>
                <div class="card-body">
                    <h5 class="title-card"><a href="./caracteristicas.html" class="text-white" onclick="superheroeId( ${ h.id } )">${ h.name }</a></h5>
                    <a href="./html/caracteristicas.html" class="p-card" onclick="superheroeId( ${ h.id } )">VER DETALLE</a>
                </div>
            </div>
        </div>
        `
    });
    heroes.innerHTML = hero
}

const superheroeId = async id => {
    localStorage.setItem('id', id)
}