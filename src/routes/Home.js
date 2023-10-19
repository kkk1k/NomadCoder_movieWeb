import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&language=ko-KR&page=1"
      )
    ).json();

    setMovie(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movie);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
        <span>loading...</span></div>
      ) : (
        <div className={styles.movies}>
        {movie.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            medium_cover_image={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
          />
        ))}
        </div>
      )}
    </div>
  );
}

export default Home;
