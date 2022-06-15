import { Link } from "react-router-dom";

function MovieItem(props) {
    const { info } = props;

    return (
        <li className="movie_img movie-item">
            <div className='img-wrapper'>
                <Link to={'/movies/' + info.id}>
                    <img src={info.poster_path} />
                </Link>
            </div>
            <p>{info.title}</p>
        </li>
    );
}
export default MovieItem;