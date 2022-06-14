import { Link } from "react-router-dom";

function MovieItem(props) {
    const { info } = props;

    return (
        <li className="movie_img movie-item">
            <div className='img-wrapper'>
                <Link to={'/movies/' + info.id}>
                    <img src={"https://image.tmdb.org/t/p/w370_and_h556_bestv2" + info.poster_path} />
                </Link>
            </div>
            <p>{info.title}</p>
        </li>
    );
}
export default MovieItem;