function MovieItem(props){
    const {info} = props;
    return(
        <li className="movie_img">
            <div className='img-wrapper'>
                <img src={info.image}/>
            </div>
            <p>{info.name}</p>
        </li>
    );
}
export default MovieItem;