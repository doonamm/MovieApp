import TimelineService from "./TimelineService";
function TimelineHeader(props){
    const {title, content, service} = props;
    return(
        <header className="header">

            <h1 className="chilltogether">{title}</h1>
            <p>{content}</p>
            {/* <div className="stem-padding-top"></div> */}
            <div className="header-bottom">
                <div className="left">
                    <h2 className="servicepack-title">Service Packs</h2>
                    <TimelineService 
                        service = {service}
                    />
                </div>
                <div className="right img-wrapper">
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-animated-christmas-movies-1566924084.jpg"/>
                    <p>Chill Together</p>
                </div>
            </div>
        </header>
    )
}
export default TimelineHeader;