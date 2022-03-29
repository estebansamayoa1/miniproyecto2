import { throttle } from 'throttle-debounce'
import { renderGrid } from '@giphy/js-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

// create a GiphyFetch with your api key
// apply for a new Web SDK key. Use a separate key for every platform (Android, iOS, Web)
const gf = new GiphyFetch(wRxWEThjaTTrsDuk9R0pkj23o5Jxi0mE)
// create a fetch gifs function that takes an offset
// this will allow the grid to paginate as the user scrolls
const fetchGifs = (offset: number) => {
    // use whatever end point you want,
    // but be sure to pass offset to paginate correctly
    return gf.trending({ offset, limit: 25 })
}

// Creating a grid with window resizing and remove-ability
const makeGrid = (targetEl: HTMLElement) => {
    const render = () => {
        // here is the @giphy/js-components import
        return renderGrid(
            {
                width: innerWidth,
                fetchGifs,
                columns: width < 500 ? 2 : 3,
                gutter: 6,
            },
            targetEl
        )
    }
    const resizeRender = throttle(500, render)
    window.addEventListener('resize', resizeRender, false)
    const remove = render()
    return { 
        remove: () => {
            remove()
            window.removeEventListener('resize', resizeRender, false)
        },
    }
}

// Instantiate
const grid = makeGrid(document.querySelector('.gifgrid'))