import ReactPlayer from 'react-player/youtube';

const movie_url = 'https://www.youtube.com/watch?v=Eag3k9p4pr4';

function WatchMoviePage(props){

    return(
        <div className="page watch">
            <ReactPlayer url={movie_url}/>
        </div>
    );
}

export default WatchMoviePage;