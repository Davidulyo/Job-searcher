import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom';
import { getTotalVacancies, getUserInfo } from '../../MainAPI';
import FindResults from '../FindJobPage/components/FindResults/FindResults';
import * as Actions from '../../redux/ActionCreators'
import './CompanyPage.css'
import App from '../Game/src_memoryCard_v2/Game';

function CompanyPage() {

    const [companyVacs, setCompanyVacs] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [totalVacancies, setTotalVacancies] = useState(null);

    const totalVac = useSelector(state => state.totalVacancies);

    let { url } = useRouteMatch();
    const companyTitle = url.split('/company/')[1];
    const token = localStorage.getItem('TOKEN');
    const dispatch = useDispatch();

    useEffect(() => { 

        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
            }

            let arTV = await getTotalVacancies();
            dispatch(Actions.setTotalVacancies(arTV));
            setTotalVacancies(arTV);

            let res = arTV.filter(el => el.postedByCompany.companyOf == companyTitle);
            setCompanyInfo(res[0].postedByCompany);
            setCompanyVacs(res);
        }

        init();

    }, []);



    return companyInfo && <>

        <div className='back-for-company-card'>

        

            <div className='company-card'>

                <div className='company-card-short-info'>
                    <img src={`${companyInfo.companyLogoUrl}`} className='company-logo short-info-item' alt='logo'/>
                    <h3 className='short-info-item'>Main office: {companyInfo.companyOffice}</h3>
                    <h3 className='short-info-item'>Company size: {companyInfo.companySize}</h3>
                    <a target={'_blank'} href={`${companyInfo.companyUrl}`} className='short-info-item'>Website {companyInfo.companyOf}</a>
                    <h3 className='short-info-item'>Company email: {companyInfo.companyEmail}</h3>
                    <div className='short-info-item' style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <a target={'_blank'} href='https://www.facebook.com/'>
                            <img src="http://localhost:3000/pics/littleMarks/fbGrey.png" style={{width: '30px', height: '30px'}} className="img-footer"/>
                        </a>
                        <a target={'_blank'} href='https://www.linkedin.com/in/davidulyo/'>
                            <img src="http://localhost:3000/pics/littleMarks/inGrey.png" style={{width: '30px', height: '30px'}} className="img-footer"/>
                        </a>
                    </div>
                </div>        
                
                
                <div className='company-card-body'>
                    <div className='company-description'>
                        <h1 style={{margin: '5px 0'}}>{companyInfo.companyOf}</h1>
                        <p>{companyInfo.companyDescription}</p>
                    </div>

                    <hr style={{margin: '10px', backgroundColor: '#551A8B', height: '3px'}}/>

                    <div className='all-company-jobs'>
                       <h1> All vacancies in {companyInfo.companyOf}</h1>
                        {companyInfo.companyOf === 'Playtika' && <Link to={'/game'} className='header-link-item'>Our products</Link>}
                        {companyVacs && <FindResults searchResults={companyVacs}/>}
                    </div>
                </div>

            </div>

        </div>
    
    </>

}

export default CompanyPage
