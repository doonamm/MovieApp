function TimelineHeader(props){
    const {title, content} = props;
    return(
        <header className="header">
            <h1>{title}</h1>
            <p>{content}</p>
            <div className="stem-padding-top"></div>
        </header>
    )
}
export default TimelineHeader;