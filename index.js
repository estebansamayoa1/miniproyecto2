const grid = document.getElementById('gifgrid')
let currentOffset = 0
let limit = 10

function trending() {
  fetchGifs('trending','')
}

function search() {
    const searchItem = document.getElementById('searchItem').value
    if (searchItem) {
      grid.textContent = ''
      fetchGifs('search',`q=${searchItem}`)
    }
}

function loadMore(){
  currentOffset += limit
  const searchItem = document.getElementById('searchItem').value
  if (searchItem) {
    fetchGifs('search',`q=${searchItem}&offset=${currentOffset}`)
  } else {
    fetchGifs('trending',`offset=${currentOffset}`)
  }
}

function fetchGifs(endpoint, query){
  const apiKey = 'wRxWEThjaTTrsDuk9R0pkj23o5Jxi0mE'
  console.log(`query -> https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}&limit=${limit}&${query}`)
  fetch(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}&limit=${limit}&${query}`)
  .then(response => response.json())
  .then(json => {
    json.data
      .map(gif => gif.images.fixed_height.url)
      .forEach(url => {
        let img = document.createElement('img')
        img.src = url
        grid.appendChild(img)
      })
  })
  .catch(error => grid.appendChild = error)
}
