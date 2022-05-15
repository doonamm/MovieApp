import {Link} from 'react-router-dom';

function Example_AnotherPage(props){
    return(
        <div className='page another'>
            this is Another Page<br/>
            <Link to="/">go to Main Page</Link>
        </div>
    );
}

export default Example_AnotherPage;