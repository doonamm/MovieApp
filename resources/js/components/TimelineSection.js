import {
    FaRegArrowAltCircleUp
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';

function TimelineSection(props){

    const {list, milestoneRefs} = props;

    function scrollTo(e) {
        const posY = document.documentElement.scrollTop + e.currentTarget.getBoundingClientRect().top;
        window.scrollTo({ top: posY, behavior: 'smooth' });
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return(
        <section className="timeline">
                {
                    list.map((milestone, i) => {
                        return (
                            <article ref={ref => milestoneRefs.current[i] = ref} className="milestone" key={i}>
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
                        <p onClick={scrollToTop} className="icon"><i><FaRegArrowAltCircleUp /></i></p>
                    </div>
                </article>
            </section>
    );
}
export default TimelineSection;