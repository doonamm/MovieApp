import {Link} from 'react-router-dom';

function Example_MainPage(props){
    return(
        <div className='page main'>
            this is Main Page<br/>
            <Link to="/another">go to Another Page</Link>
        </div>
    );
}

export default Example_MainPage;