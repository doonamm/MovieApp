function ServiceItem (props) {
    const {id, time, content, price} = props;
    return(
        <li>
            <p><span>{time}</span></p>
            <p>{content}</p>
            <p>Price: <span>{price}</span></p>
        </li>
    )
}
export default ServiceItem;