import '../../style/timeline.css';
import { useEffect, useRef } from 'react';
import {
    FaFacebook, 
    FaGlobeAsia, 
    FaGoogle, 
    FaHeart, 
    FaLinkedin, 
    FaMicrosoft, 
    FaUmbrellaBeach,
    FaArrowAltCircleUp,
    FaAngular,
    FaInstagramSquare,
    FaTwitter,
    FaYoutube,
    FaRegArrowAltCircleUp
} from 'react-icons/fa';

const milestones = [
    {
        icon: <FaGoogle/>,
        title: 'Google',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaFacebook/>,
        title: 'Facebook',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaLinkedin/>,
        title: 'Linkedin',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaMicrosoft/>,
        title: 'Microsoft',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaGlobeAsia/>,
        title: 'GlobeAsia',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaHeart/>,
        title: 'Love',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaAngular/>,
        title: 'Angular',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    },
    {
        icon: <FaUmbrellaBeach/>,
        title: 'Umbrella',
        timeDetail: 'Written yesterday at 06:27 pm',
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus, sed ratione doloremque reprehenderit saepe hic nam sint, architecto quibusdam commodi nemo voluptate velit sequi error, asperiores autem obcaecati. Commodi."
    }
];

function HomePage(props){

    const milestoneRefs = useRef([]);

    useEffect(()=>{
        document.addEventListener('scroll', scrolling);
        document.addEventListener('resize', scrolling);

        return ()=>{
            document.removeEventListener('scroll', scrolling);
            document.removeEventListener('resize', scrolling);
        };
    });

    function scrolling(){
        const {scrollTop, offsetHeight} = document.documentElement;
        milestoneRefs.current.forEach(el => {
            if(el.offsetTop <= scrollTop + offsetHeight*66/100){
                el.classList.add('show');
                if(el.offsetTop >= scrollTop + offsetHeight*20/100
                    && el.offsetTop <= scrollTop + offsetHeight*60/100)
                    el.classList.add('main');
                else    
                    el.classList.remove('main');
            }
            else{
                el.classList.remove('show');
            }
        })
    }

    function scrollTo(e){
        const posY = document.documentElement.scrollTop + e.currentTarget.getBoundingClientRect().top;
        window.scrollTo({top: posY, behavior: 'smooth'});
    }

    function scrollToTop(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return(
        <div className='page timelime'>
            <div className="stem"></div>
            <header className="header">
                <h1>My timeline</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis neque asperiores, perferendis cumque,
                    assumenda iusto quia quisquam dolorem laborum libero omnis nesciunt reprehenderit veniam doloribus enim?
                    Eaque laboriosam facilis rerum?
                    Quidem, perferendis eveniet, ullam a dicta iure porro incidunt, nihil voluptatem maxime vero nisi quia
                    doloribus illum maiores tempore dolorum provident! Pariatur at modi, tenetur laudantium dolorum quidem
                    tempore accusamus.</p>
                <p id="fact">Fact: I luv you pak pak</p>
                <div className="stem-padding-top"></div>
            </header>
            <section className="timeline">
                {
                    milestones.map((milestone, i) => {
                        return(
                            <article ref={ref => milestoneRefs.current[i] = ref} className="milestone">
                                <div className="mark">
                                    <p className="icon"><i onClick={scrollTo}>{milestone.icon}</i></p>
                                    <div className="stem-padding"></div>
                                </div>
                                <div className="content">
                                    <p className="details">{milestone.timeDetail}</p>
                                    <h2 className="title">{milestone.title}</h2>
                                    <p>{milestone.content}</p>
                                </div>
                            </article>
                        )
                    })
                }
                <article ref={ref => milestoneRefs.current[milestoneRefs.current.length] = ref} className="milestone end">
                    <div className="mark">
                        <p onClick={scrollToTop} className="icon"><i><FaRegArrowAltCircleUp/></i></p>
                    </div>
                </article>
            </section>
            <footer>
                <p>Made by Nam dep trai vip pro</p>
                <ul class="contacts">
                    <caption>Contacts:</caption>
                    <li><a href="/"><FaFacebook/></a></li>
                    <li><a href="/"><FaInstagramSquare/></a></li>
                    <li><a href="/"><FaYoutube/></a></li>
                    <li><a href="/"><FaTwitter/></a></li>
                </ul>
            </footer>
        </div>
    )
}

export default HomePage;