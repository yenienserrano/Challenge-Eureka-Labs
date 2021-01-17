const heroes = document.getElementById('listHeroes')
const pagination = document.getElementById('pagination')

var page = 0
var nameSearch = ''
var superheroId   = ''

document.addEventListener('DOMContentLoaded', e => {
    fetchHome()
    
})

const fetchHome = () => {
    if( nameSearch.length <= 0 ){
        fetchData()
    } else {
        fetchSearch()
    }
}

const fetchData = async() => {
    const hash = '636d7bdf09a3641ad6ac81fd24b56923'
    const keyPublic = 'a6e1a342df7b7332ed2ff9b5116ed3b2'
    
    try {
        const result = await fetch( `https://gateway.marvel.com:443/v1/public/characters?limit=8&offset=${ page }&ts=1&apikey=${ keyPublic }&hash=${ hash }` )
        const data   = await result.json()
        const { results }   = await data.data
        res( results )
        pag()
    } catch (error) {
        console.log(error)
    }
}

const fetchSearch = async() => {
    const hash = '636d7bdf09a3641ad6ac81fd24b56923'
    const keyPublic = 'a6e1a342df7b7332ed2ff9b5116ed3b2'
    try {
        const result = await fetch( `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${ nameSearch }&limit=8&ts=1&apikey=${ keyPublic }&hash=${ hash }` )
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
                    <h5 class="titleCard"><a href="./html/caracteristicas.html" class="text-white" onclick="superheroeId( ${ h.id } )">${ h.name }</a></h5>
                    <a href="./html/caracteristicas.html" class="pCard" onclick="superheroeId( ${ h.id } )">VER DETALLE</a>
                </div>
            </div>
        </div>
        `
    });
    heroes.innerHTML = hero
} 

const pag = () => {
    let pag = `${ ( page < 8)
        ? 
        `
        <button onclick="nextPage( 0 )" class="btn btn-link text-white buttonPagination">${ ( (page / 8 ) < 0 ) ? 1 : ((page / 8) + 1)  }</button>
        <button onclick="nextPage( 8 )" class="btn btn-link text-white buttonPagination">${ ((page / 8) + 2) }</button>
        <button onclick="nextPage( 16 )" class="btn btn-link text-white buttonPagination">${ ((page / 8) + 3) }</button>
        <button onclick="nextPage( 8 )" class="btn btn-link text-white buttonPagination"><i class="fas fa-chevron-right"></i></button>
        ` 
        :
        `
        <button onclick="nextPage( -8 )" class="btn btn-link text-white buttonPagination"><i class="fas fa-chevron-left"></i></button>
        <button onclick="nextPage( 0 )" class="btn btn-link text-white buttonPagination">${ ( (page / 8 ) < 0 ) ? 1 : ((page / 8) + 1)  }</button>
        <button onclick="nextPage( 8 )" class="btn btn-link text-white buttonPagination">${ ((page / 8) + 2) }</button>
        <button onclick="nextPage( 16 )" class="btn btn-link text-white buttonPagination">${ ((page / 8) + 3) }</button>
        <button onclick="nextPage( 8 )" class="btn btn-link text-white buttonPagination"><i class="fas fa-chevron-right"></i></button>
        `
    } 
    `
    pagination.innerHTML = pag
}


async function nextPage( valor ){
    if( page < 7 && valor < 0 ){
        page = 0
        return await fetchData() 
    }
    page = page + valor
    return await fetchData() 
}

async function search(event, inputText){
    event.preventDefault()
    nameSearch = inputText.value
    fetchHome()
}

async function superheroeId( id ){
    localStorage.setItem('id', id)
}