import {GiPlayButton} from 'react-icons/gi';
import {FaPlus} from 'react-icons/fa';
import  '../../style/SingleMoviePage.scss';
import PeopleItem from './PeopleItem';
import { map } from 'lodash';
import PeopleList from './PeopleList';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import CommentList from './CommentList';
import VoteStar from './VoteStar';
const actorList = [
    {
        id: 1,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 2,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 3,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 4,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 5,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 6,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
];
const directorList = [
    {
        id: 1,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 2,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    },
    {
        id: 3,
        image: "https://media.thieunien.vn/upload/hachi/2022/03/09/jennie-blackpink-chung-minh-dang-cap-dep-tu-trong-trung-qua-ong-kinh-cua-getty-images-1646790945-1.jpg",
        name: "Jennie"
    }
];
const movieListData = [
    {
        id: 1,
        poster_path: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        title: "Jennie"
    },
    {
        id: 2,
        poster_path: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        title: "Jennie"
    },
    {
        id: 3,
        poster_path: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        title: "Jennie"
    },
    {
        id: 4,
        poster_path: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        title: "Jennie"
    },
    {
        id: 5,
        poster_path: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        title: "Jennie"
    }
]
const commentListData = [
        {
            id: 1,
            image: "http://pm1.narvii.com/7627/321d255098da6653d71f1ffb2c71693256d5bb34r1-540-673v2_uhq.jpg",
            name: "Lisa"
        },
        {
            id: 2,
            image: "https://bazaarvietnam.vn/wp-content/uploads/2022/03/BZ-jennie-chanel-fall-2022-paris-fashion-week-outfit-2.jpg",
            name: "Jennie"
        },
        {
            id: 3,
            image: "https://i.pinimg.com/736x/ee/35/b6/ee35b6ec2885f01ad7ff37105981cfca.jpg",
            name: "Jisoo"
        },
        {
            id: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMNJ50VYP-rJvoIsYCA4g8aJHN3sVCx8zt5r-K_yv_0UtX3JIo00eKiYgGtJA2yxHr3XI&usqp=CAU",
            name: "Rose"
        },
        {
            id: 5,
            image: "https://i.pinimg.com/736x/ee/35/b6/ee35b6ec2885f01ad7ff37105981cfca.jpg",
            name: "Jisoo"
        },
        {
            id: 6,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMNJ50VYP-rJvoIsYCA4g8aJHN3sVCx8zt5r-K_yv_0UtX3JIo00eKiYgGtJA2yxHr3XI&usqp=CAU",
            name: "Rose"
        },
];

function SingleMoviePage(props) {
    const [showMore, setShowMore] = useState(false);
    const [expanded_cmt, setExpanded_comt] = useState(false);
    const [commentList, setCommentList] = useState(commentListData);
    const [expanded_movie, setExpanded_movie] = useState(false);
    const [movieList, setMovieList] = useState(movieListData);
    const description = "Today I’d like to talk to you about Harry Potter which is one of my favourite films. It was a fiction film telling a story about people in the wizarding world. The central character was Harry Potter, who used to be an orphan in the normal world before discovering that he was a wizard. Afterwards, he went to a special school called Howard where he taught him necessary skills to succeed in the wizarding world. He also had to deal with challenges in terms of study, friendship, love and even the fight against dark power. Harry Potter was recommended as a masterpiece that made me feel curious about it. Moreover, I had read the original novel before, and I really can’t put it down. So I guess the film would be as attractive as the book. I think the most important reason why I enjoyed this film was that it made me feel adventurous. It was really a fantastic film.";
    
    function showMore_comment() {
        setCommentList([...commentList, ...commentListData]);

        if(!expanded_cmt){
            setExpanded(true);
        }
    }

    function showMore_movie() {
        setMovieList([...movieList, ...movieListData]);

        if(!expanded_movie){
            setExpanded_movie(true);
        }
    }

    return (
        <div className="page single-movie">
            <div className="container wrap-center">
                <div className='top_container'>
                    <div className='left_container'>
                        <div className='film-info'>
                            <div className='poster img-wrapper'>
                                <img src='https://mp-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=604800&url=https%3A%2F%2Fi0.wp.com%2Fimage.motphim.net%2Fposter%2Fblues-noi-dao-xanh-10051.jpg%3F1655043616'/>
                            </div>
                            <div className='attribute'>
                                <h2 className="name ">Chạy đến bên em</h2>
                                <VoteStar rate={4.9}/>
                                <div className="tagproperties khoangcach">
                                    <button> 13+ </button>
                                    <button> 1h 20m</button>
                                </div>
                            </div>
                        </div>
                        <div className='description khoangcach'>
                            <p>
                                Harry Potter là tên của series tiểu thuyết phim huyền bí gồm bảy phần của nhà văn Anh Quốc J. K. Rowling. Bộ truyện viết về những cuộc phiêu lưu phù thủy của cậu bé Harry Potter cùng hai người bạn thân là Ronald Weasley và Hermione Granger, lấy bối cảnh tại Trường Phù thủy và Pháp sư Hogwarts nước Anh.
                            </p>
                            <div className="direction_button khoangcach">
                                <button className='play'><span className='btn_icon'><GiPlayButton/></span>Play</button>
                                <button className='add'><span className='btn_icon'><FaPlus/></span>Add to my list</button>
                            </div>
                            <p className="description khoangcach">
                            
                                {showMore ? description :`${description.substring(0,250)}`}
                                <button className='btn_readmore' onClick={() => setShowMore(!showMore)}>{showMore ? "Read less" : "...Read more"}</button>
                            
                            </p>
                            
                        </div>
                    </div>
                    <div className='right_container'>
                        <h3>Actor</h3>
                        <PeopleList list={actorList}/>
                        <h3>Producer</h3>
                        <PeopleList list={directorList}/>
                        <h3>Release Year</h3>
                        <div className='release_year'>
                            <p>2002</p>
                        </div>
                        <h3>Prize</h3>
                        <div className='prize'>
                            <p>Oscar</p>
                        </div>
                    </div>
                </div>
                <div className='bottom_container'>
                    <div className='controller khoangcach'>
                        <div className='comment'>
                            <h2>Comments</h2>
                            <div className='comment_body'>
                                <div className='left_comment img-wrapper'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl4TT6qkBfVlorfV_X3LM1Z7ChtoxnEOaTdA&usqp=CAU'/>
                                </div>
                                <div className='right_comment'>
                                    <p className='name'>Rose</p>
                                    <div className='write_comment'>
                                        <textarea placeholder='Write your comment right here'></textarea>
                                        <button>Gửi</button>
                                    </div>
                                </div>
                            </div>
                            <CommentList list={commentList}/>
                            <a className="btn btn-primary" onClick={showMore_comment}>
                                {expanded_cmt ? "Show more" : <span>Show more</span>}
                            </a>
                            
                        </div>
                        <div> 
                            <h2>Similar Content</h2>
                            <div className='similar_movie khoangcach'>
                                <MovieList  list={movieList}/>
                            </div>
                            <a className="btn btn-primary" onClick={showMore_movie}>
                                {expanded_movie ? "Show more" : <span>Show more</span>}
                            </a>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SingleMoviePage;