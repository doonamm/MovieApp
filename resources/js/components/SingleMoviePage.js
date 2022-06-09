import {GiPlayButton} from 'react-icons/gi';
import {FaPlus} from 'react-icons/fa';
import  '../../style/SingleMoviePage.scss';
import PeopleItem from './PeopleItem';
import { map } from 'lodash';
import PeopleList from './PeopleList';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

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
const movieList = [
    {
        id: 1,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 2,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 3,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 4,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 5,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 6,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 7,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 8,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 9,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 10,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 11,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    },
    {
        id: 12,
        image: "https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg",
        name: "Jennie"
    }
]

function GiaoDienPhim(props) {
    const {id} = useParams();

    useEffect(()=>{

    }, []);

    function fetchData(){
        axios.get('http://localhost:8000/api/movies/' + id, {
            headers: {
                Authorization: "Bearer "
            }
        });
    }

    return(
        <div className="page giaodien_phim">
            <div className="container margin">
                <div className='top_container'>
                    <div className='left_container'>
                    <h2 className="name ">Moive Name</h2>
                        <div className="tagproperties khoangcach">
                            <button> 1h 20m</button>
                        </div>
                        <p className="description khoangcach">
                        Harry Potter là tên của series tiểu thuyết phim huyền bí gồm bảy phần của nhà văn Anh Quốc J. K. Rowling. Bộ truyện viết về những cuộc phiêu lưu phù thủy của cậu bé Harry Potter cùng hai người bạn thân là Ronald Weasley và Hermione Granger, lấy bối cảnh tại Trường Phù thủy và Pháp sư Hogwarts nước Anh.
                        </p>
                        <div className="direction_button khoangcach">
                            <button><span className='btn_icon'><GiPlayButton/></span>Play</button>
                            <button><span className='btn_icon'><FaPlus/></span>Add to my list</button>
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
                        <div>
                            <p>Comments</p>
                        </div>
                        <div> 
                            <p>Similar Content</p>
                            <div className='similar_movie khoangcach'>
                                <MovieList list={movieList}/>
                            </div>
                        </div>
                    </div>    
                </div> 
            </div>
        </div>
    );
}
export default GiaoDienPhim;