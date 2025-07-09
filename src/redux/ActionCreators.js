import * as Types from './ActionTypes';

export const setTypeOfUser = (type) => {
    return {
        type: Types.SET_TYPE_USER,
        payload: {type},
    }
}

export const setProfile = (info) => {
    return {
        type: Types.SET_PROFILE,
        payload: {info},
    }
}

export const setSomeoneLogged = (answer) => {
    return {
        type: Types.SOMEONE_IN_SYSTEM,
        payload: {answer},
    }
}

export const logOut = () => {
    return {
        type: Types.LOG_OUT,
    }
}

export const updateResumes = (resume) => {
    return {
        type: Types.UPDATE_RESUMES,
        payload: {resume},
    }
}

export const updateVacancies = (vacancy) => {
    return {
        type: Types.UPDATE_VACANCIES,
        payload: {vacancy},
    }
}

export const pickId = (id) => {
    return {
        type: Types.PICK_ID,
        payload: {id},
    }
}

export const updateAfterDeletingFromVacancies = (newArray) => {
    return {
        type: Types.UPDATE_VACANCIES_AFTER_DELETE,
        payload: {newArray},
    }
}

export const updateAfterDeletingFromResumes = (newArray) => {
    return {
        type: Types.UPDATE_RESUMES_AFTER_DELETE,
        payload: {newArray},
    }
}

export const setTotalResumes = (totalResumes) => {
    return {
        type: Types.SET_TOTAL_RESUMES,
        payload: {totalResumes},
    }
}

export const setTotalVacancies = (totalVacancies) => {
    return {
        type: Types.SET_TOTAL_VACANCIES,
        payload: {totalVacancies},
    }
}

export const setSearchSettings = (settings) => {
    return {
        type: Types.SET_SEARCH_SETTINGS,
        payload: {settings},
    }
}