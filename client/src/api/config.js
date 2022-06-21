const apiConfig ={
   originalimage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
   w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
   baseUrl:"https://api.themoviedb.org/3/",
   apiKey:"ee20f15bf0d041d9ec7cff10f60459c9"
}

export default apiConfig;