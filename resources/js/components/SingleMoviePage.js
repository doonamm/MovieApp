import {GiPlayButton} from 'react-icons/gi';
import  '../../style/SingleMoviePage.scss';

import {FaPlus} from 'react-icons/fa';
import PeopleList from './PeopleList';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from './MovieList';
import CommentList from './CommentList';
import VoteStar from './VoteStar';
import { instance } from '../helper/instance';
import {useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import stateToProps from '../helper/stateToProps';
import swal from 'sweetalert';
import EditMoviePopup from './EditMoviePopup';

function SingleMoviePage(props) {
    const {id} = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [casts, setCasts] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [movieCmtCount, setMovieCmtCount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [rcmMovies, setRcmMovies] = useState([]);
    const [inputCmt, setInputCmt] = useState('');
    const [loading, setLoading] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        loadMovie();
        loadCasts();
        loadComments();
    }, []);

    function loadMovie(){
        setLoading(true);
        instance.get('/movies/' + id)
        .then(res => {
            if(res.success){
                setMovieInfo(res.data);
                setMovieCmtCount(res.data.comment_count);
                console.log(res.data.comment_count);
            }
        })
        .catch(console.log)
        .finally(()=>setLoading(false));
    }

    function loadCasts(){
        instance.get(`/movies/${id}/casts`)
        .then(res => {
            if(res.success){
                setCasts(res.data);
            }
        })
        .catch(console.log)
    }

    function loadComments(){
        instance.get(`/movies/${id}/comments`)
        .then(res => {
            if(res.success){
                setCommentList(res.data);
            }
        })
        .catch(console.log);
    }
    
    function showMore_comment() {
        setCommentList([...commentList, ...commentListData]);
    }

    function showMore_movie() {
        rcmMovies([...rcmMovies, ...movieListData]);
    }

    function handleCreateComment(e){
        const comment = inputCmt.trim();

        if(comment){
            instance.post(`/movies/${id}/comments`, {
                'content': comment
            })
            .then(res => {
                if(res.success){
                    setCommentList([res.data, ...commentList]);
                    setMovieCmtCount(movieCmtCount + 1);
                }
            })
            .catch(console.log)
            .finally(()=>setInputCmt(''));
        }
    }

    const {
        id: movieId,
        adult,
        title,
        tagline,
        overview,
        poster_path,
        backdrop_path,
        vote_average,
        runtime,
        release_date,
        vote_count,
        comment_count,
        status,
        language,
        popularity,
    } = movieInfo;

    function convertRuntime(time){
        if(time < 60){
            return time + 'm';
        }
        const m = time%60;

        time -= m;

        return time/60 + 'h ' + m + 'm';
    }

    const runtimeStr = convertRuntime(runtime);

    function deleteMovie(){
        swal('Delete movie', `Delete movie "${title}"`, 'warning').then((accept)=>{
            if(accept){
                instance.delete(`/movies/${id}`)
                .then(res => {
                    if(res.success){
                        navigate('/movies');
                        swal('Delete movie', `Delete success!"`, 'success');
                    }
                })
                .catch(console.log);
            }
        });
    }

    return (
        <div className="page single-movie">
            <div className="container wrap-center">
                {
                    props.user.role === 'admin'
                    &&
                    <div className='admin-btn-container'>
                        <button onClick={deleteMovie} className='admin-btn delete'>Delete</button>
                        <button onClick={()=>setOpenEditForm(!openEditForm)} className='admin-btn edit'>Edit</button>
                    </div>
                }
                {openEditForm && <EditMoviePopup setOpen={setOpenEditForm} data={movieInfo}/>}
                <div className='top_container' style={{
                        "background": `linear-gradient(#0718227e,#0C222F), url(${backdrop_path})`
                    }}>
                    <div className='left_container'>
                        <div className='film-info'>
                            <div className='poster img-wrapper'>
                                <img src={poster_path}/>
                            </div>
                            <div className='attribute'>
                                <h2 className="name">{title}</h2>
                                <p className='tagline'>{tagline}</p>

                                <div className='vote'>
                                    <VoteStar rate={vote_average}/>
                                    <p>/ <span>{vote_count} votes</span></p>
                                </div>
                                <div className="tagproperties khoangcach">
                                    <button>{adult ? 'Adult' : 'For All'}</button>
                                    <button>{runtimeStr}</button>
                                </div>
                                <div className="direction_button khoangcach">
                                    <button onClick={()=>navigate(`/movies/${id}/watch`)} className='play'><span className='btn_icon'><GiPlayButton/></span>Play</button>
                                    <button className='add'><span className='btn_icon'><FaPlus/></span>Add to my list</button>
                                </div>
                            </div>
                        </div>
                        <div className='description khoangcach'>
                            <p className="description khoangcach">
                                {showMore ? overview :`${overview?.substring(0,250)}`}
                                <button className='btn_readmore' onClick={() => setShowMore(!showMore)}>{showMore ? "Read less" : "...Read more"}</button>
                            </p>
                            
                        </div>
                    </div>
                    <div className='right_container'>
                        <h3>Actor</h3>
                        <PeopleList list={casts}/>
                        {/* <h3>Producer</h3>
                        <PeopleList list={directorList}/> */}
                        <h3>Release Date</h3>
                        <div className='release_year'>
                            <p>{release_date}</p>
                        </div>
                        <div className='tag'>
                            <p>Status: <span> {status}</span></p>
                            <p>Language: <span>{language}</span></p>
                        </div>
                    </div>
                </div>
                <div className='bottom_container'>
                    <div className='controller khoangcach'>
                        <div className='comment'>
                            <h2>Comments</h2>
                            <div className='comment_body khoangcach'>
                                <div className='left_comment img-wrapper'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl4TT6qkBfVlorfV_X3LM1Z7ChtoxnEOaTdA&usqp=CAU'/>
                                </div>
                                <div className='right_comment'>
                                    <p className='name'>Rose</p>
                                    <div className='write_comment'>
                                        <textarea value={inputCmt} onChange={(e)=>setInputCmt(e.target.value)} placeholder='Write your comment right here'></textarea>
                                        <button onClick={handleCreateComment}>Gửi</button>
                                    </div>
                                </div>
                            </div>
                            <CommentList movieId={movieId} list={commentList}/>
                            {movieCmtCount > commentList.length && (
                                <button className="btn btn-primary" onClick={showMore_comment}>
                                    <span>Show more</span>
                                </button>
                            )}
                        </div>
                        <div> 
                            <h2>Similar Movies</h2>
                            <div className='similar_movie khoangcach'>
                                <MovieList  list={rcmMovies}/>
                            </div>
                            <a className="btn btn-primary" onClick={showMore_movie}>
                                <span>Show more</span>
                            </a>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}
export default connect(stateToProps('user'))(SingleMoviePage);