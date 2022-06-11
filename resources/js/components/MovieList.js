import MovieItem from "./MovieItem";
import '../../style/MovieList.scss';
function MovieList(props) {
    const list = props.list || [];

    return (
        <div>
            <ul className='movie_list'>
                {
                    list.map(movie => <MovieItem key={movie.id} info={movie} />)
                }
            </ul>
        </div>
    );
}

export default MovieList;