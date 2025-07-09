import * as Actions from '../../redux/ActionCreators';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './Select.css'

function Select() {

    const dispatch = useDispatch();


    return <div className='select-page'>

        <h1>What are you looking for?</h1>
        <div className='select-page-divs'>
            <Link to={`/registration-worker`} className='selector-link'>
                <button className='selector-squad' value='worker' 
                // onClick={(e) => {console.log(e.target.value); dispatch(Actions.setTypeOfUser(e.target.value))}} 
                >Job</button>
            </Link>

            <Link to={'/registration-employer'} className='selector-link'>
                <button className='selector-squad' value='employer' 
                // onClick={(e) => {console.log(e.target.value); dispatch(Actions.setTypeOfUser(e.target.value))}} 
                >Workers</button>
            </Link>
        </div>

    </div>;
}

export default Select;