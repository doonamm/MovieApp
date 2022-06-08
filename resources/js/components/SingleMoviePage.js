import {GiPlayButton} from 'react-icons/gi';
import {FaPlus} from 'react-icons/fa';
import  '../../style/SingleMoviePage.scss';
function GiaoDienPhim(props) {
    return(
        <div className="page giaodien_phim">
            <div className="container margin">
                <h2 className="name ">Moive Name</h2>
                <div className="tagproperties khoangcach">
                    <button> 13+ </button>
                    <button> 1h 20m</button>
                </div>
                <p className="description khoangcach">
                Harry Potter là tên của series tiểu thuyết phim huyền bí gồm bảy phần của nhà văn Anh Quốc J. K. Rowling. Bộ truyện viết về những cuộc phiêu lưu phù thủy của cậu bé Harry Potter cùng hai người bạn thân là Ronald Weasley và Hermione Granger, lấy bối cảnh tại Trường Phù thủy và Pháp sư Hogwarts nước Anh.
                </p>
                <div className="direction_button khoangcach">
                    <button><span className='btn_icon'><GiPlayButton/></span>Play</button>
                    <button><span className='btn_icon'><FaPlus/></span>Add to my list</button>
                </div>
                <div className='moredescription khoangcach'>
                    <p className='title'> More description</p>
                    <p>
                        Harry Potter là tên của series tiểu thuyết phim huyền bí gồm bảy phần của nhà văn Anh Quốc J. K. Rowling. Bộ truyện viết về những cuộc phiêu lưu phù thủy của cậu bé Harry Potter cùng hai người bạn thân là Ronald Weasley và Hermione Granger, lấy bối cảnh tại Trường Phù thủy và Pháp sư Hogwarts nước Anh.
                    </p>
                </div>
                <div className='controller khoangcach'>
                    <span>General</span>
                    <span> Similar Content</span>
                    <span>More Description</span>
                </div>
                <div className='controller_result khoangcach'>
                    <p className='title'>My list</p>
                    <div className='movie_list'>
                        <div>
                            <div className='movie'>
                                <img src="https://img.idesign.vn/2021/01/studio-ghibli-history-7.jpg"/>
                            </div>
                            <span>Movie name</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GiaoDienPhim;