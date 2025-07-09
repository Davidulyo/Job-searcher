import { useState } from 'react';
import ApplyShow from './ApplyShow/ApplyShow';
import * as Actions from '../../../../redux/ActionCreators';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './ApplyCard.css';


function ApplyCard({profile}) {

    const [info, setInfo] = useState();
    const dispatch = useDispatch();

    const showApplyHandler = (el) => {
        if(info && info === el.applies){
            setInfo(null)
        }else{
            setInfo(el.applies)
        }

    }

    return <>
    
        <div className="applies-part">

                {profile.vacancies.map((el, i) => {
                    return el.applies.length > 0 && <div key={i+101} className='vac'>
                        <div className='vac-header'>
                            <div className='just-box'>
                                <h1>{el.offeredPosition}</h1>
                                <h2 className='vac-num'>{el.applies.length}</h2>
                            </div>
                            <button onClick={() => showApplyHandler(el)} className='profile-header-link show-btn'>show</button>
                        {/* <Link to={`/apply-${el.idResume}`} onClick={() => showApplyHandler(el)}>{'<'}</Link> */}
                        </div>

                    </div>
                })}
                {info && <ApplyShow info={info}/>}




            </div>
    
    </>
}

export default ApplyCard
