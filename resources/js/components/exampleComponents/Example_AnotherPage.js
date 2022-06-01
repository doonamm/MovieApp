import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import stateToProps from '../../helper/stateToProps';

function Example_AnotherPage(props){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{

        if(props.login.isLogged === false){
            navigate('/');
        }

    }, []);//componentDidMount->vua duoc khoi tao

    return(
        <div className='page another'>
            this is Another Page<br/>
            <Link to="/">go to Main Page</Link>
        </div>
    );
}

export default connect(stateToProps('login'))(Example_AnotherPage);