import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators';

function FindResults({searchResults}) {

    const dispatch = useDispatch();

    return <>
    
        {searchResults.map((el, i) => {
            return <div key={i+99} className='job-card'>

                <div className='job-card-left'>
                <Link to={`/vacs/${el.idVacancy}`} 
                    onClick={() => dispatch(Actions.pickId(el.idVacancy))}> 
                        <img src={`${el.postedByCompany.companyLogoUrl}`} alt='comp-logo' className='find-job-logo'/>
                </Link>
                </div>
                <hr/>
                <div className='job-card-right'>
                <Link to={`/vacs/${el.idVacancy}`} 
                    onClick={() => dispatch(Actions.pickId(el.idVacancy))}> 
                    <h2>{el.offeredPosition}</h2>
                </Link>
                    <h4>{el.workLocation}</h4>
                    <h4>{el.profLevel}</h4>
                    <h3>{el.desiredEmploymentType}</h3>
                </div>

            </div>
        })}

    </>
}

export default FindResults
