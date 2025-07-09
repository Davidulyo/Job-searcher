import { arrayUnion, collection, doc, getFirestore, updateDoc } from "firebase/firestore";

// for adding
export const helpAddNewResume = (e, profile) => {
    
    let position = e.target.position.value; let profLevel = e.target.profLevel.value;
    let salary = e.target.salary.value; let employmentType = e.target.employmentType.value;
    let workerLocation = e.target.workerLocation.value; let expYears = e.target.expYears.value;
    let language = e.target.language.value; let aboutExp = e.target.tellAboutExp.value;
    let jobExpectations = e.target.jobExpectations.value;
    
    return {
        jobExpectations: jobExpectations,
        aboutExp: aboutExp,
        whoPosted: profile.user,
        whoPostedName: profile.name,
        desiredPosition: position,
        profLevel: profLevel,
        desiredSalary: `$${salary}`,
        desiredEmploymentType : employmentType,
        workerLocation: workerLocation,
        expYears: expYears,
        language: language,
        idResume: Math.floor(Math.random()*999999),
        offers: 0,
    }
}

export const sendInTotalResumes = async(newResume, db) => {

    const colRef = collection(db, 'totalResumes');
    const docRef = doc(colRef, 'oeNom3JSzp3R3yBhh0nn') // oeNom3JSzp3R3yBhh0nn - id doc with totalResumes

    return await updateDoc(docRef, {
        resumes: arrayUnion(newResume),
    })
}

export const sendNewResume = async(newResume, db, profile) => {

    const colRef = collection(db, 'totalUsers');
    const docRef = doc(colRef, `${profile.id}`) // args: db, name of doc, id zgVjkAts9JgGqPoaaggt

    return await updateDoc(docRef, {
        resumes: arrayUnion(newResume),
    })
}

// for deleting

export const helpDeleteResume = (profile, pickedResume) => {
    const resumeToDelete = profile.resumes.find(el => el.idResume === pickedResume.idResume);
    return profile.resumes.filter(resumes => resumes.idResume !== resumeToDelete.idResume);
}

export const deleteResumeFromUsersProfile = async(profile, updatedArrayResumes) => {

    const db = getFirestore();
    const colRef = collection(db, 'totalUsers');
    const docRef = doc(colRef, `${profile.id}`) // args: db, name of doc, id zgVjkAts9JgGqPoaaggt
        
    return await updateDoc(docRef, {
        resumes: updatedArrayResumes,
    })
}

export const deleteResumeFromTotalResumes = async(updatedArrayResumes) => {

    const db = getFirestore();
    const colRef = collection(db, 'totalResumes');
    const docRef = doc(colRef, 'oeNom3JSzp3R3yBhh0nn') // oeNom3JSzp3R3yBhh0nn - id doc with totalResumes
        
    return await updateDoc(docRef, {
        resumes: updatedArrayResumes,
    })
}

