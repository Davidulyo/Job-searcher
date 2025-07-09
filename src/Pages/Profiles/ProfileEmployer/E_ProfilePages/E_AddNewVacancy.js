import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jobsList, { employmentType, languages, locations, profLevel } from "../../../../data/jobsList";
import { helpAddNewVacancy, sendInTotalVacancies, sendNewVacancy } from "../../ProfilesAPI/E_Functions/E_Functions";
import * as Actions from '../../../../redux/ActionCreators';

function E_AddNewVacancy() {

        const [isLoading, setIsLoading] = useState(false);
        const [messageFromServer, setMessageFromServer] = useState('');
    
        const profile = useSelector(state => state.profile);
        const dispatch = useDispatch();

        const addNewVacancy = (e) => {
            e.preventDefault();
            setIsLoading(true);

            const newVacancy = helpAddNewVacancy(e, profile.user, profile);
    
            sendNewVacancy(profile, newVacancy) // 1 action in totalUsers/vacancies and Redux
            .then(() => {
                dispatch(Actions.updateVacancies(newVacancy));
                setMessageFromServer('Successfuly add to your vacancies');
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setMessageFromServer('something went wrong :(');
                setMessageFromServer(err.message)
            })    
        /////////
            sendInTotalVacancies(newVacancy) // 2 action in totalVacancies
            .then(() => {
                setIsLoading(false);
                setMessageFromServer('Successfuly add to your vacancies');
            })        
            .catch(err => {
                setIsLoading(false);
                setMessageFromServer(err.message);
            })
        }
    
        return <div className="add-new-vacancy-subpage">
    
            {/* <h2 className='msg-server'>{messageFromServer}</h2> 
            {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>} */}
                {messageFromServer && <h2 className='msg-server'>{messageFromServer}</h2>} 
                {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}


            <form className="add-new-vacancy-form" name="addNewVacancyForm" onSubmit={(e) => addNewVacancy(e)}>
                <div className="form-left">
                    <label name='position' className="add-vacancy-form-label">Offered position *</label>
                    <select name="position" className="selector-position add-vacancy-form-item" required>
                        {jobsList.map((job, i) => {
                            return <option className="opt-item" key={i+11} value={`${job}`}>{job}</option>
                        })}
                    </select>
        
                    <label name='prof-level' className="add-vacancy-form-label" >Desired prof level *</label>
                    <select name="profLevel" className="selector-level add-vacancy-form-item" required>
                        {profLevel.map((level, i) => {
                            return <option className="opt-item" key={i+55} value={`${level}`}>{level}</option>
                        })}
                    </select>
        
                    <label name='salary' className="add-vacancy-form-label">Offered salary per month $ *</label>
                    <input type={'number'} step='100' name="salary" className="add-vacancy-form-item" required/>
        
                    <label name='employment-type' className="add-vacancy-form-label">Desired type of employment *</label>
                    <select name="employmentType" className="employment-type add-vacancy-form-item" required>
                        {employmentType.map((type, i) => {
                            return <option className="employment-type-item" key={i+22} value={`${type}`}>{type}</option>
                        })}
                    </select>
                    
                    <label name='workLocation' className="add-vacancy-form-label">Work location *</label>
                    <select name="workLocation" className="worker-location add-vacancy-form-item" required>
                        {locations.map((location, i) => {
                            return <option className="worker-location-item" key={i+66} value={`${location}`}>{location}</option>
                        })}
                    </select>
        
                    <label name='desiredExpYears' className="add-vacancy-form-label">Years of expirience *</label>
                    <input type={'number'} step='0.5' name="desiredExpYears" className="add-vacancy-form-item" required/>
        
                    <label name='language' className="add-vacancy-form-label">Language of work *</label>
                    <select name="language" className="worker-language add-vacancy-form-item" required>
                        {languages.map((lang, i) => {
                            return <option className="worker-language-item" key={i+66} value={`${lang}`}>{lang}</option>
                        })}
                    </select>
                    
                </div>

                <div className="form-right">
                    <label name='companyDescription' className="add-vacancy-form-label">What the company you are? *</label>
                    <textarea name="companyDescription" cols={'60'} rows='12' className="add-vacancy-form-textarea" required></textarea> 

                    <label name='forWhichTasks' className="add-vacancy-form-label">For which tasks? *</label>
                    <textarea name="forWhichTasks" cols={'60'} rows='12' className="add-vacancy-form-textarea" required></textarea>  

                    <label name='whoAreYouLooking' className="add-vacancy-form-label">What kind of professional are we looking for? *</label>
                    <textarea name="whoAreYouLooking" cols={'60'} rows='12' className="add-vacancy-form-textarea" required></textarea>

                    <label name='whatConditions' className="add-vacancy-form-label">What are the conditions and bonuses? *</label>
                    <textarea name="whatConditions" cols={'60'} rows='12' className="add-vacancy-form-textarea" required></textarea>
                </div>
                
        
                {/* {messageFromServer && <h2 className='msg-server'>{messageFromServer}</h2>}  */}
                {/* {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>} */}
                <input type={'submit'} name='submitter' className="submitter" value={'Send'}/>
            </form>
    
        
        </div>;
    }




export default E_AddNewVacancy;




