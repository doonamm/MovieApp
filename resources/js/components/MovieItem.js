function MovieItem(props) {
    const { info } = props;

    return (
        <li className="movie_img">
            <div className='img-wrapper'>
                <img src={"https://image.tmdb.org/t/p/w370_and_h556_bestv2" + info.poster_path} />
            </div>
            <p>{info.title}</p>
        </li>
    );
}
export default MovieItem;