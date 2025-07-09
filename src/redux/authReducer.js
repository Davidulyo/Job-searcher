import * as Types from './ActionTypes';

const init = {
    profile: {},
    selectorRegType: '',
    someoneLogged: false,
    pickedId: null,
    searchSettings: null,
    totalResumes: [],
    totalVacancies: [],
    
}

export const authReducer = (state = init, {type, payload}) =>{
    // console.log(state, 'AND', type);
    switch(type) {
        case Types.SET_TYPE_USER : return {...state, selectorRegType: payload.type};
        case Types.SET_PROFILE : return {...state, profile: payload.info};  
        case Types.SOMEONE_IN_SYSTEM : return {...state, someoneLogged: payload.answer, selectorRegType: ''};
        // case Types.LOG_OUT : return {...state, someoneLogged: false, profile: {}, selectorRegType: ''};
        case Types.LOG_OUT : return {profile: {}, someoneLogged: false, selectorRegType: '', searchSettings: '', pickedId: null,};
        case Types.UPDATE_RESUMES : return {...state, profile: {...state.profile, resumes: [...state.profile.resumes]}};
        case Types.UPDATE_VACANCIES : return {...state, profile: {...state.profile, vacancies: [...state.profile.vacancies]}};
        case Types.UPDATE_VACANCIES_AFTER_DELETE : return {...state, profile: {...state.profile, vacancies: payload.newArray}};
        case Types.UPDATE_RESUMES_AFTER_DELETE : return {...state, profile: {...state.profile, resumes: payload.newArray}};
        case Types.PICK_ID : return {...state, pickedId: payload.id};
        case Types.SET_TOTAL_RESUMES : return {...state, totalResumes: payload.totalResumes};
        case Types.SET_TOTAL_VACANCIES : return {...state, totalVacancies: payload.totalVacancies};
        case Types.SET_SEARCH_SETTINGS : return {...state, searchSettings: payload.settings};
        default: return state;
    }
}