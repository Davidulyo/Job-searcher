import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();


// search page API
export const helpSearchResult = (e, totalVacancies) => {
    e.preventDefault();
    let jobTitle = e.target.searchSelectJob.value;
    let location = e.target.searchSelectLocation.value;
    // console.log(location, jobTitle);
    return totalVacancies.filter(el => (el.workLocation === location) && (el.offeredPosition === jobTitle));
}

export const firstSearchResult = (settings, totalVacancies) => {
    // console.log(totalVacancies);
    let jobTitle = settings.jobTitle;
    let location = settings.jobLocation;
    // console.log(location, jobTitle);
    return totalVacancies.filter(el => (el.workLocation === location) && (el.offeredPosition === jobTitle));
}

export const calcPartnersesVacancies = async() => {
    let ar = [];
    let partners = [];

    const colRef = collection(db, 'totalUsers');
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach(doc => {
        ar.push(doc.data());
    })

    let employers = ar.filter(el => el.typeUser === 'employer');

    for (let i = 0; i < employers.length; i++) {
        let info = {
            partner: employers[i].companyOf,
            numVac: employers[i].vacancies.length,
            logo: employers[i].companyLogoUrl,
        }
        partners.push(info);
    }

    return partners;
}

// handle the arrows


export const handleArrows = () => {
    // let btnPrev = document.getElementById('prev');
    // btnPrev.innerHTML = '';
    // btnPrev.insertAdjacentHTML('afterbegin', '<img class=prevArrow src="pics/littleMarks/arrow.png"/>')

    // let btnNext = document.getElementById('next');
    // btnNext.innerHTML = '';
    // btnNext.insertAdjacentHTML('afterbegin', '<img class=nextArrow src="pics/littleMarks/arrow.png"/>')

    let btnsPrev = document.querySelectorAll('#prev');
    for (let i = 0; i < btnsPrev.length; i++) {
        btnsPrev[i].innerHTML = '';
        btnsPrev[i].insertAdjacentHTML('afterbegin', '<img class=prevArrow src="pics/littleMarks/arrow.png"/>')
    }

    let btnsNext = document.querySelectorAll('#next');
    for (let i = 0; i < btnsNext.length; i++) {
        btnsNext[i].innerHTML = '';
        btnsNext[i].insertAdjacentHTML('afterbegin', '<img class=nextArrow src="pics/littleMarks/arrow.png"/>')
    }

}

export const blocksParser = (text) => {

    // console.log('first ', text);
    let ar = text.split("\\n");
    // console.log('splitted in ar ',ar);


    let res;

    // let format = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`;

    for (let i = 0; i < ar.length; i++) {
        if (ar[i] === undefined) {
            continue;
        } else{
            res += ar[i];
        }
    }

    // console.log('res =', res);

    let tags = <>
    
        {ar.map((el, i) => el !== '' && <li className="block-list-item" key={i+1}>{el}</li>)}
    
    </>
    return tags;
}



