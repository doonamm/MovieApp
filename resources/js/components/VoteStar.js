import { useEffect, useState } from 'react';
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import '../../style/VoteStar.scss';

function VoteStar(props){
    const rate = props.rate || 5;
    const maxStar = props.maxStar || 5;
    const [starList, setStarList] = useState([]);
    useEffect(()=>{
        const list = [];
        for(let i=1; i<=maxStar; i++){
            if(rate < i - 0.5){
                list.push(<BsStar key={i}/>);
            }
            else if(rate < i){
                list.push(<BsStarHalf key={i}/>);
            }
            else{
                list.push(<BsStarFill key={i}/>);
            }
        }
        setStarList(list);
    }, []);


    return(
        <div className="votestar">
            {starList}
        </div>
    );
}
export default VoteStar;