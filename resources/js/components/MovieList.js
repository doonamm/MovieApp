import MovieItem from "./MovieItem";
import '../../style/MovieList.scss'
function MovieList(props) {
    const list = props.list || [];

    return (
        <ul className='movie_list'>
            {
                list.map(movie => <MovieItem key={movie.id} info={movie} />)
            }
        </ul>
    );
}

export default MovieList;