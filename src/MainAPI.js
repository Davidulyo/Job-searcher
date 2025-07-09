import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";

const db = getFirestore();

export const getTotalResumes = async() => {
    let ar;

    const colRef = collection(db, 'totalResumes');
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach(doc => {
        ar = (doc.data());
    })

    return ar.resumes;
}

export const getTotalVacancies = async() => {

    let ar;
    const colRef = collection(db, 'totalVacancies');
    
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach(doc => {
        ar = (doc.data());
    })

    return ar.vacancies;
        

}

export const getUserInfo = async(token) => {

    let userInfo;

    const docRef = doc(db, 'totalUsers', `${token}`);

    const docsSnap = await getDoc(docRef);
        userInfo = docsSnap.data();

    return userInfo = {...userInfo, id: token};
        

}