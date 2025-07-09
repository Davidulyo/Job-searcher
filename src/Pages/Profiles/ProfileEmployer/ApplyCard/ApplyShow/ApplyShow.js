import { useState } from 'react'
import CoverLetter from './CoverLetter/CoverLetter';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Actions from '../../../../../redux/ActionCreators';
import './ApplyShow.css'

function ApplyShow({info}) {

    let { url } = useRouteMatch();
    console.log(url);


    const [coverLetter, setCoverLetter] = useState();
    const dispatch = useDispatch();


    const showCoverLetter = (el) => {
        setCoverLetter(el);
        dispatch(Actions.pickId(el));
    }

    return <>
    
        <div className='applied-show'>
            {info.map((el, i) => {
                return <div key={i+102} className='apply'>
                    <div className='apply-line'>
                        <h4>{el.desiredPosition}</h4>
                        <h4>{el.whoPostedName}</h4>
                        {/* <h4>{el.whoPosted}</h4> */}
                        <h4>{el.desiredSalary}</h4>
                        <h4>{el.workerLocation}</h4>
                        {/* <button onClick={() => showCoverLetter(el.coverLetter)}>{'<'}</button> */}
                        <Link to={`${url}/apply-${el.idResume}`} onClick={() => showCoverLetter(el)} className='profile-header-link line'>{'View'}</Link>
                    </div>


                </div>
            })}
            {/* {coverLetter && <CoverLetter coverLetter={coverLetter}/>} */}
        </div>
    
    </>
}

export default ApplyShow;
