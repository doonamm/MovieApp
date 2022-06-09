import '../../style/PeopleList.scss';
import PeopleItem from "./PeopleItem";

function PeopleList(props){
    const {list} = props;
    return(
        <ul className='people_list'>
            {
                list.map(people => <PeopleItem key={people.id} info={people}/>)
            }
        </ul>
    );
}

export default PeopleList;