
function PeopleItem(props){
    const {info} = props;
    return(
        <li className='actor-detail'>
            <div className='img-wrapper'>
                <img src={info.image}/>
            </div>
            <span>{info.name}</span>
        </li>
    )
}

export default PeopleItem;