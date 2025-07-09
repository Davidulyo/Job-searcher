import { useDispatch, useSelector } from "react-redux";
import FullVacancyCard from "../../ProfileEmployer/VacancyCard/FullVacancyCard";
import ShortVacancyCard from "../../ProfileEmployer/VacancyCard/ShortVacancyCard";
import * as Actions from '../../../../redux/ActionCreators';
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../../MainAPI";

function E_MyVacancies() {
 
    
    const idVacancy = useSelector(state => state.pickedId);
    const profile = useSelector(state => state.profile);
    const pickedVacancy = profile.vacancies.find(el => el.idVacancy === idVacancy);
    
    //////////////
    const dispatch = useDispatch();
    
    // const [profileLocal, setProfileLocal] = useState(profile);
    // const [pickedVacancy, setPickedVacancy] = useState();
    const token = localStorage.getItem('TOKEN');
    
    useEffect(() => {
        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
                // setProfileLocal(await getUserInfo(token))
            }
        }
        init();
    }, []);
    
    // const pickedVacancy = profile.vacancies.find(el => el.idVacancy === idVacancy);
    // let res = arTV.find(el => el.idVacancy == id);
    
    return <div className="my-vacancy-section">
    
        <div className="short-vacancies-part">
            <h1>My vacancies:</h1>
            {profile && profile.vacancies.map((el, i) => <ShortVacancyCard key={i+22} vacancy={el} />)}
        </div>

        {pickedVacancy && <FullVacancyCard pickedVacancy={pickedVacancy}/>}

    </div>;
}

export default E_MyVacancies;
