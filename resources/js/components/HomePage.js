import '../../style/timeline.css';
import { useEffect, useRef } from 'react';
import TimelineHeader from './TimelineHeader';
import TimelineSection from './TimelineSection';
import {FiDownloadCloud} from 'react-icons/fi';
import {MdMovieFilter} from 'react-icons/md';
import '../../style/HomePage.scss';
import {
    FaGlobeAsia,
    FaHeart,
    FaFacebook, 
    FaTwitter, 
    FaMailBulk
} from 'react-icons/fa';
import {TbMoodKid} from 'react-icons/tb';
import TimelineService from './TimelineService';
const milestones = [
    {
        icon: <MdMovieFilter />,
        title: 'Enjoy on your TV.',
        content: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
    },
    {
        icon: <FiDownloadCloud />,
        title: 'Download your shows to watch offline.',
        content: "Save your favorites easily and always have something to watch."
    },
    
    {
        icon: <FaGlobeAsia />,
        title: 'Watch everywhere.',
        content: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
    },
    {
        icon: <TbMoodKid />,
        title: 'Create profiles for kids.',
        content: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
    },
    
];
const service = [
   
    {
        id: 1,
        time: "1 MONTH",
        content: "Watch movies for 30 days in Full HD 4K",
        price: "45000"
    },
    
    {
        id: 2,
        time: "3 MONTHS",
        content: "Watch movies for 90 days in Full HD 4K",
        price: "70000"
    },
    
    {
        id: 3,
        time: "6 MONTHS",
        content: "Watch movies for 180 days in Full HD 4K",
        price: "95000"
    },
    {
        id: 4,
        time: "1 YEAR",
        content: "Watch movies for 360 days in Full HD 4K",
        price: "130000"
    },
];
function HomePage(props) {
    const content = `One of the leading reputable websites in Vietnam with an extremely rich and diverse movie store. Watch movies without ads, high quality, user-friendly interface <3`;
    const milestoneRefs = useRef([]);

    useEffect(() => {
        document.addEventListener('scroll', scrolling);
        document.addEventListener('resize', scrolling);

        return () => {
            document.removeEventListener('scroll', scrolling);
            document.removeEventListener('resize', scrolling);
        };
    });

    function scrolling() {
        const { scrollTop, offsetHeight } = document.documentElement;
        milestoneRefs.current.forEach(el => {
            if (el.offsetTop <= scrollTop + offsetHeight * 66 / 100) {
                el.classList.add('show');
                if (el.offsetTop >= scrollTop + offsetHeight * 20 / 100
                    && el.offsetTop <= scrollTop + offsetHeight * 60 / 100)
                    el.classList.add('main');
                else
                    el.classList.remove('main');
            }
            else {
                el.classList.remove('show');
            }
        })
    }

    
    
    return (
        <div className='page timeline'>
            <div className="stem"></div>
            
            <TimelineHeader 
                title="Chill Together"
                content = {content}
                service = {service}
            />
            
            <TimelineSection 
                list = {milestones}
                milestoneRefs = {milestoneRefs}

            />
            
            <footer>
                <div className='part1'>
                    <p className='title'>Made by</p>
                    <div className='membername'>
                        <p>Kiến Nam</p>
                        <p>Quang Nhật</p>
                        <p>Anh Thư</p>
                    </div>
                </div>
                <div className='part2'>
                    <p className='title'>Social</p>
                    <div className='social-btn'>
                        <p><FaFacebook/><span>Facebook</span></p>
                        <p><FaTwitter/><span>Twitter</span></p>
                        <p><FaMailBulk/><span>Email</span></p>
                    </div>
                </div>
                <div className='part3'>
                    <p className='title'>Service</p>
                    <div className='service-footer'>
                        <p>Help</p>
                        <p>Terms of Use</p>
                        <p>Contact Us</p>
                    </div>
                </div>
                {/* <ul className="contacts">
                    <caption>Contacts:</caption>
                    <li><a href="/"><FaFacebook /></a></li>
                    <li><a href="/"><FaInstagramSquare /></a></li>
                    <li><a href="/"><FaYoutube /></a></li>
                    <li><a href="/"><FaTwitter /></a></li>
                </ul> */}
            </footer>
        </div>
    )
}

export default HomePage;