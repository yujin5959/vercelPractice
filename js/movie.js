const API_KEY = "9e0f3e60e007a43a5e0e683d121d04a8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w300";

fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=1`)
  .then((res) => {
    if (!res.ok) throw new Error("영화 목록을 불러오는데 실패했습니다.");
    return res.json();
  })
  .then((data) => {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";

    data.results.forEach((movie) => {
      const poster = movie.poster_path
        ? IMG_BASE_URL + movie.poster_path
        : "https://via.placeholder.com/300x450?text=No+Image";

      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
                <img src="${poster}" alt="${movie.title}" />
                <div class="movie-info">
                  <strong>${movie.title}</strong>
                  <div>평점: ${movie.vote_average}</div>
                  <div>개봉일: ${movie.release_date || "정보 없음"}</div>
                </div>
              `;
      movieList.appendChild(movieCard);
    });
  })
  .catch((err) => {
    alert(err.message);
  });
