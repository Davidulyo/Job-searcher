import { arrayUnion, collection, doc, getFirestore, updateDoc } from "firebase/firestore";

const db = getFirestore();

// for adding

export const helpAddNewVacancy = (e, user = profile.user, profile) => {
    console.log(profile);
    let position = e.target.position.value; let profLevel = e.target.profLevel.value;
    let salary = e.target.salary.value; let employmentType = e.target.employmentType.value;
    let workLocation = e.target.workLocation.value; let expYears = e.target.desiredExpYears.value;
    let language = e.target.language.value; 
    
    let companyDescription = e.target.companyDescription.value;
    console.log('companyDescription', companyDescription);
    let forWhichTasks = JSON.stringify(e.target.forWhichTasks.value); 
    let whoAreYouLooking = JSON.stringify(e.target.whoAreYouLooking.value); 
    let whatConditions = JSON.stringify(e.target.whatConditions.value); 

    // let whoAreYouLooking = e.target.whoAreYouLooking.value;
    // let whatConditions = e.target.whatConditions.value;

    return {
        blocks: {
            companyDescription: companyDescription,
            forWhichTasks: forWhichTasks,
            whoAreYouLooking: whoAreYouLooking,
            whatConditions: whatConditions,
        },
        whoPostedId: profile.id,
        whoPosted: user,
        offeredPosition: position,
        profLevel: profLevel,
        offeredSalary: `$${salary}`,
        desiredEmploymentType : employmentType,
        workLocation: workLocation,
        desiredExpYears: expYears,
        language: language,
        idVacancy: Math.floor(Math.random()*999999),
        applies: [],
        postedByCompany: {
            companyOf: profile.companyOf,
            companySize: profile.companySize,
            companyUrl: profile.companyUrl,
            companyOffice: profile.companyOffice,
            companyEmail: profile.companyEmail,
            companyDescription: profile.companyDescription,
            companyLogoUrl: profile.companyLogoUrl,
        }
    }
}

export const sendNewVacancy = (profile, newVacancy) => {
        console.log('error? ', newVacancy);
    const colRef = collection(db, 'totalUsers'); console.log(profile.id);
    const docRef = doc(colRef, `${profile.id}`) 

    return updateDoc(docRef, {
        vacancies: arrayUnion(newVacancy),
    })
}

export const sendInTotalVacancies = (newVacancy) => {
        
    const colRef = collection(db, 'totalVacancies');
    const docRef = doc(colRef, 'J4yrqBYvOn5I2sKgJmDg') //id doc of totalVacancies J4yrqBYvOn5I2sKgJmDg

    return updateDoc(docRef, {
        vacancies: arrayUnion(newVacancy),
    })
}

// for deleting

export const helpDeleteVacancy = (profile, pickedVacancy) => {
    const vacToDelete = profile.vacancies.find(el => el.idVacancy === pickedVacancy.idVacancy);
    return profile.vacancies.filter(vacancy => vacancy.idVacancy !== vacToDelete.idVacancy);
}

export const helpDeleteVacancyForTotal = (totalVac, pickedVacancy) => {
    const vacToDelete = totalVac.find(el => el.idVacancy === pickedVacancy.idVacancy);
    return totalVac.filter(vacancy => vacancy.idVacancy !== vacToDelete.idVacancy);
}

export const deleteVacancyFromUsersProfile = async(profile, updatedArrayVacancies) => {

    const colRef = collection(db, 'totalUsers');
    const docRef = doc(colRef, `${profile.id}`) // args: db, name of doc, id zgVjkAts9JgGqPoaaggt

    return await updateDoc(docRef, {
        vacancies: updatedArrayVacancies,
    })
}

export const deleteVacancyFromTotalVacancies = async(updatedArrayVacancies) => {

    const colRef = collection(db, 'totalVacancies');
    const docRef = doc(colRef, 'J4yrqBYvOn5I2sKgJmDg') // J4yrqBYvOn5I2sKgJmDg - id doc with totalVacancies || maybe to change id of doc to a variable
        
    return await updateDoc(docRef, {
        vacancies: updatedArrayVacancies,
    })
}