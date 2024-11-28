const apiKey = '57559817'
const searchInput = document.getElementById('search-input')
const resultsDiv = document.getElementById('results')

async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
    console.log('respons', response)
    const data = await response.json()
    console.log('data', data)
    if (data.Response === 'True') {
      displayResults(data.Search)
    } else {
      resultsDiv.innerHTML = `<p>No results found for "${query}"</p>`
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`
  }
}

function displayResults(movies) {
  resultsDiv.innerHTML = movies
    .map(
      (movie) => `
    <div class="card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title} (${movie.Year})</h3>
      <p>Type: ${movie.Type}</p>
    </div>
  `
    )
    .join('')
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim()
  if (query.length > 2) {
    fetchMovies(query)
  } else {
    resultsDiv.innerHTML = 'Not enough'
  }
})
