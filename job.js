//Get JSON File

///Loading JSON without fetch method

import Jobs from './starter-code/data.json' assert {type:'json'};

// Jobs=JSON.parse(Jobs);

// console.log(Jobs);
// console.log(Jobs[0])


// function getNetworkEl(){
//     let myResult=document.getElementById('json_data');

//     if (myResult){
//         myResult.innerHTML=Jobs[0].requirements.content;
//     }else{
//         console.log(Jobs);
//     }
//     myResult.style.width="300px";
//     myResult.style.height='auto';
//     myResult.style.margin="100px auto";
// }

// getNetworkEl();

//Function to Load Job Grid Items
function loadJobListings(){

    ///Get Main Grid container
    const main=document.getElementById('job_List');
    const count=Jobs.length;


    for (let i=0;i<1;i++){

        //Create job Item Main Container
        let grid_Item =document.createElement('div');
        grid_Item.setAttribute('id',Jobs[i].id);
        grid_Item.classList.add('jobItem');

        //append the each Item to main Grid Container
        main.appendChild(grid_Item);

        //create Logo Background Container
        let logoBackg=document.createElement('div');
        let coLogo=Jobs[i].company.toLocaleLowerCase();
        let backColor=getLogoBackColor(coLogo);   
        logoBackg.classList.add('logoBag',backColor);
        grid_Item.appendChild(logoBackg);


        //create Logo container
        let myUrl='./starter-code/assets/logos/'+coLogo+'.svg';
        let myLogo=document.createElement('div');
        myLogo.style.background='url('+ myUrl +') no-repeat';
        logoBackg.appendChild(myLogo);
        myLogo.classList.add(coLogo+'_Size');

        //Create Job sub Item Container
        let mySubItem=document.createElement('div');
        mySubItem.classList.add('jobSubItem');
        grid_Item.appendChild(mySubItem);


        //create Job advert container
        let jobBag=document.createElement('div');
        jobBag.classList.add('jobBag');
        mySubItem.appendChild(jobBag);

        //create Job advert items
        //Job Posting Status
        let jobStatus=document.createElement('div');
        jobStatus.classList.add('jobStatus');
        
        let sTime=document.createElement('span');
        sTime.innerHTML=Jobs[i].postedAt;
        sTime.classList.add('font_16_2','font_40','font-color-gray','sTime');

        let sPoint=document.createElement('div');
        sPoint.classList.add('sPoint');

        let sType=document.createElement('span');
        sType.classList.add('font_16_2','font_40','font-color-gray','sType');
        sType.innerHTML=Jobs[i].contract;

        jobStatus.appendChild(sTime);
        jobStatus.appendChild(sPoint);
        jobStatus.appendChild(sType);
        jobBag.appendChild(jobStatus);

        //Job Specialty
        let jobSpecialty=document.createElement('div');
        jobSpecialty.setAttribute('id','p'+Jobs[i].id);
        jobSpecialty.classList.add('jobSpecialty','font-color-2','bold_font_70');
        jobSpecialty.innerHTML=Jobs[i].position;
        jobBag.appendChild(jobSpecialty);


        //Company Name
        let company=document.createElement('div');
        jobBag.appendChild(company);

    }

}

loadJobListings();

function getLogoBackColor(cName){
    switch (cName) {
        case 'scoot':
            return 'scoot';
            break;
        // case 
            
    }

}

// function getLogoSize(cName){
//     switch (cName) {
//         case 'scoot':
//             return 'scoot';
//             break;
//         // case 
            
//     }

// }

