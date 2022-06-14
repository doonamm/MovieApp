import '../../style/timeline.css';
import { useEffect, useRef } from 'react';
import TimelineHeader from './TimelineHeader';
import TimelineSection from './TimelineSection';
import {FiDownloadCloud} from 'react-icons/fi';
import {MdMovieFilter} from 'react-icons/md'
import {
    FaGlobeAsia,
    FaHeart,
} from 'react-icons/fa';
import {TbMoodKid} from 'react-icons/tb'
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
// const service = [
    
// ];
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
        <div className='page timelime'>
            <div className="stem"></div>
            
            <TimelineHeader 
            title="Chill Together"
            content = {content}
            />
            {/* <TimelineService/> */}
            <TimelineSection 
                list = {milestones}
                milestoneRefs = {milestoneRefs}

            />
            
            <footer>
                <p>Made by Kiến Nam, Quang Nhật, Anh Thư</p>
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