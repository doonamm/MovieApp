import ServiceItem from "./ServiceItem";
function TimelineService(props) {
    const {service} = props;
    return (
        <ul className="TimelineService">
            {
            service.map(
                item => <ServiceItem 
                key={item.id} 
                time={item.time}
                content={item.content}
                price={item.price}
                />)
                
            }
        </ul>
    );
}
export default TimelineService;