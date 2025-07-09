import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getTotalVacancies, getUserInfo } from "../../MainAPI";
import CompanyShortInfo from "./components/CompanyShortInfo/CompanyShortInfo";
import InfoList from "./components/InfoList/InfoList";
import JoinUs from "./components/JoinUs/JoinUs";
import VacancyHeader from "./components/VacancyHeader/VacancyHeader";
import * as Actions from '../../redux/ActionCreators'
import './VacancyPage.css';


function Vacancypage() {

    const [vacancy, setVacancy] = useState();
    const [totalVacancies, setTotalVacancies] = useState();

    const totalVac = useSelector(state => state.totalVacancies);
    const dispatch = useDispatch();
    
    let { url } = useRouteMatch();
    const id = url.split('/vacs/')[1];
    const token = localStorage.getItem('TOKEN');

    
    useEffect(() => {

        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
            }

            let arTV = await getTotalVacancies();
            dispatch(Actions.setTotalVacancies(arTV));
            setTotalVacancies(arTV);
            
            let res = arTV.find(el => el.idVacancy == id);
            setVacancy(res);
        }
            if(totalVac.length > 0) {
                let res = totalVac.find(el => el.idVacancy == id);
                setVacancy(res);
            } else{
                init();
            }

    }, []);

    return <div className="vacancy-page">
    
        {vacancy && <VacancyHeader vacancy={vacancy}/>}

        <div className="vacancy-page-body">
            {vacancy && <InfoList vacancy={vacancy}/>}

            <div className="vacancy-page-right">
                {vacancy && <CompanyShortInfo vacancy={vacancy}/>}
                {vacancy && <JoinUs/>}
            </div>

        </div>
    
    </div>
}

export default Vacancypage;
