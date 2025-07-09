import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getTotalVacancies, getUserInfo } from "../../../../MainAPI";
import * as Actions from '../../../../redux/ActionCreators';
import { deleteVacancyFromTotalVacancies, deleteVacancyFromUsersProfile, helpDeleteVacancy, helpDeleteVacancyForTotal } from "../../ProfilesAPI/E_Functions/E_Functions";


function FullVacancyCard({pickedVacancy}) { 

    const [isLoading, setIsLoading] = useState(false);
    const [MessageFromServer, setMessageFromServer] = useState('');

    const [profile, setProfile] = useState();
    const [totalVac, setTotalVac] = useState();

    // const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const token = localStorage.getItem('TOKEN');
    
    useEffect(() => {
        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
                setProfile(await getUserInfo(token))
            }

            let arTV = await getTotalVacancies();
            dispatch(Actions.setTotalVacancies(arTV));
            setTotalVac(arTV);
        }
        init();
            
    }, []);


    const deleteVacancy = () => {
        setIsLoading(true);

        const updatedArrayVacancies = helpDeleteVacancy(profile, pickedVacancy);
        const updatedArrayVacanciesForTotal = helpDeleteVacancyForTotal(totalVac, pickedVacancy);

        deleteVacancyFromUsersProfile(profile, updatedArrayVacancies) // 1 action in totalUser/vacancies and Redux
        .then(() => {
            dispatch(Actions.updateAfterDeletingFromVacancies(updatedArrayVacancies));
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setMessageFromServer(err.message)
        })
    ////////
        console.log('array we send',updatedArrayVacancies);
        deleteVacancyFromTotalVacancies(updatedArrayVacanciesForTotal) // 2 action in totalVacancies
        .then(() => {
            setIsLoading(false);
            setMessageFromServer('successfully deleted!')
        })
        .catch(err => {
            setIsLoading(false);
            setMessageFromServer(err.message)
        })
        
    }
        

    return <div className='full-vacancies-card'>
        
        <h2>{MessageFromServer}</h2> 
        {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
    
        <h1>Offered position: {pickedVacancy.offeredPosition}</h1>
        <h1>Offered salary: {pickedVacancy.offeredSalary}</h1>
        <h1>Desired years of expirience: {pickedVacancy.desiredExpYears}</h1>
        <h1>Desired prof. level: {pickedVacancy.profLevel}</h1>
        <h1>Work language: {pickedVacancy.language}</h1>
        <h1>Desired employment type: {pickedVacancy.DesiredEmploymentType}</h1>
        <h1>Work location: {pickedVacancy.workLocation}</h1> 



        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px'}}>
            <button className='profile-header-link' onClick={() => deleteVacancy()}>Delete</button>
            <button className='profile-header-link'>Edit</button>
        </div>
    
    </div>
}

export default FullVacancyCard;
