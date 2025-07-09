import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";


export const helpRegistrationEmployer = (e, typeUser) => {

    const auth = getAuth();
    const db = getFirestore();
    const colRef = collection(db, 'totalUsers');

    let email = e.target.email.value.trim(); 
    let name = e.target.name.value.trim(); 
    let password = e.target.password.value.trim(); 
    let companyOf = e.target.company.value.trim(); 
    let companySize = e.target.companySize.value.trim();
    let companyOffice = e.target.companyOffice.value.trim();
    let companyUrl = e.target.companyUrl.value.trim();
    let companyLogoUrl = e.target.companyLogoUrl.value.trim();
    let companyEmail = e.target.companyEmail.value.trim();
    let companyDescription = e.target.companyDescription.value.trim();

    return {
        userToReg: {
            user: email,
            name: name,
            typeUser: typeUser,
            companyOf: companyOf, // first - send info, and if its good - then register
            vacancies: [],
            companySize: companySize,
            companyUrl: companyUrl,
            companyOffice: companyOffice,
            companyEmail: companyEmail,
            companyDescription: companyDescription,
            companyLogoUrl: companyLogoUrl,
        },
        password: password,
        fb: {
            auth: auth,
            colRef: colRef,
        }
    }
}

export const helpRegistrationWorker = (e, typeUser) => {

    const auth = getAuth();
    const db = getFirestore();
    const colRef = collection(db, 'totalUsers');

    let email = e.target.email.value.trim(); 
    let profession = e.target.profession.value.trim(); 
    let name = e.target.name.value.trim();
    let password = e.target.password.value.trim();

    return {
        userToReg: {
            user: email,
            name: name,
            typeUser: typeUser,
            profession: profession,
            resumes: [],
        },
        password: password,
        fb: {
            auth: auth,
            colRef: colRef,
        },
    }
    
}

export const helpLogin = (e, typeUser) => {

    let email = e.target.email.value; 
    let password = e.target.password.value;
    let infoOfUserThatLoggedIn = null;

    const db = getFirestore();
    const auth = getAuth();
    const colRef = collection(db, 'totalUsers');
    const q = query(colRef, where('user', '==', `${email}`));


    return {
        fb: {
            auth: auth,
            colRef: colRef,
            q: q,
        },
        userToCheck: {
            email: email,
            password: password,
            infoOfUserThatLoggedIn,
        }
    }

}