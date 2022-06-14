function ServiceItem (props) {
    const {id, time, content, price} = props;
    return(
        <li className="ServiceItem">
            <p className="packname"><span>{time}</span></p>
            <div className="detail">
                <p>{content}</p>
                <p>Price: <span>{price}</span></p>
            </div>
        </li>
    )
}
export default ServiceItem;