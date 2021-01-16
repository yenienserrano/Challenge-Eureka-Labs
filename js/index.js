const heroes = document.getElementById('listaHeroes')
const paginacion = document.getElementById('paginacion')

var hoja = 0
var nombreBuscado = ''
var superheroId   = ''

document.addEventListener('DOMContentLoaded', e => {
    fetchHome()
    
})

const fetchHome = () => {
    if( nombreBuscado.length <= 0 ){
        fetchData()
    } else {
        fetchBuscador()
    }
}

const fetchData = async() => {
    const hash = '636d7bdf09a3641ad6ac81fd24b56923'
    const keyPublic = 'a6e1a342df7b7332ed2ff9b5116ed3b2'
    
    try {
        const result = await fetch( `https://gateway.marvel.com:443/v1/public/characters?limit=8&offset=${ hoja }&ts=1&apikey=${ keyPublic }&hash=${ hash }` )
        const data   = await result.json()
        const { results }   = await data.data
        res( results )
        pag()
    } catch (error) {
        console.log(error)
    }
}

const fetchBuscador = async() => {
    const hash = '636d7bdf09a3641ad6ac81fd24b56923'
    const keyPublic = 'a6e1a342df7b7332ed2ff9b5116ed3b2'
    try {
        const result = await fetch( `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${ nombreBuscado }&limit=8&ts=1&apikey=${ keyPublic }&hash=${ hash }` )
        const data   = await result.json()
        const resultsb = await data.data.results
        res( resultsb )
    } catch (error) {
        console.log(error)
    }
}


const res = results => {
    let hero = ''
    results.forEach( h => {
        hero += `
        <div class="col-sm-6 col-lg-3">
            <div class="cardHero animate__animated animate__fadeIn">
                <a href="./html/caracteristicas.html" onclick="superheroeId( ${ h.id } )"><img src="${ h.thumbnail.path }.${ h.thumbnail.extension }" class="imgCard" height="200" alt="${ h.name }"></a>
                <div class="card-body">
                    <h5 class="tituloCard"><a href="./html/caracteristicas.html" class="text-white" onclick="superheroeId( ${ h.id } )">${ h.name }</a></h5>
                    <a href="./html/caracteristicas.html" class="pCard" onclick="superheroeId( ${ h.id } )">VER DETALLE</a>
                </div>
            </div>
        </div>
        `
    });
    heroes.innerHTML = hero
} 

const pag = () => {
    let pag = `${ ( hoja < 8)
        ? 
        `
        <button onclick="pasarPaginas( 0 )" class="btn btn-link text-white botonPaginacion">${ ( (hoja / 8 ) < 0 ) ? 1 : ((hoja / 8) + 1)  }</button>
        <button onclick="pasarPaginas( 8 )" class="btn btn-link text-white botonPaginacion">${ ((hoja / 8) + 2) }</button>
        <button onclick="pasarPaginas( 16 )" class="btn btn-link text-white botonPaginacion">${ ((hoja / 8) + 3) }</button>
        <button onclick="pasarPaginas( 8 )" class="btn btn-link text-white botonPaginacion"><i class="fas fa-chevron-right"></i></button>
        ` 
        :
        `
        <button onclick="pasarPaginas( -8 )" class="btn btn-link text-white botonPaginacion"><i class="fas fa-chevron-left"></i></button>
        <button onclick="pasarPaginas( 0 )" class="btn btn-link text-white botonPaginacion">${ ( (hoja / 8 ) < 0 ) ? 1 : ((hoja / 8) + 1)  }</button>
        <button onclick="pasarPaginas( 8 )" class="btn btn-link text-white botonPaginacion">${ ((hoja / 8) + 2) }</button>
        <button onclick="pasarPaginas( 16 )" class="btn btn-link text-white botonPaginacion">${ ((hoja / 8) + 3) }</button>
        <button onclick="pasarPaginas( 8 )" class="btn btn-link text-white botonPaginacion"><i class="fas fa-chevron-right"></i></button>
        `
    } 
    `
    paginacion.innerHTML = pag
}


async function pasarPaginas( valor ){
    if( hoja < 7 && valor < 0 ){
        hoja = 0
        return await fetchData() 
    }
    hoja = hoja + valor
    return await fetchData() 
}

async function buscador(event, inputText){
    event.preventDefault()
    nombreBuscado = inputText.value
    fetchHome()
}

async function superheroeId( id ){
    localStorage.setItem('id', id)
}