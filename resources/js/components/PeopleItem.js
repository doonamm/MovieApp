
function PeopleItem(props){
    const {info} = props;
    return(
        <li className='actor-detail'>
            <div className='img-wrapper'>
                <img src={"https://image.tmdb.org/t/p/w370_and_h556_bestv2" + info.profile_path}/>
            </div>
            <span>{info.name}</span>
        </li>
    )
}

export default PeopleItem;