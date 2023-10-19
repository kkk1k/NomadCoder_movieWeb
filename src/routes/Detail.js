import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie([json.data.movie]);
    setLoading(false);
    console.log(movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>loading....</h1>
      ) : (
        movie.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <p>{movie.description_intro}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Detail;
