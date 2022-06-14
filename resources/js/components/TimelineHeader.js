import TimelineService from "./TimelineService";
function TimelineHeader(props){
    const {title, content, service} = props;
    return(
        <header className="header">

            <h1>{title}</h1>
            <p>{content}</p>
            {/* <div className="stem-padding-top"></div> */}
            <TimelineService 
                service = {service}
            />
        </header>
    )
}
export default TimelineHeader;