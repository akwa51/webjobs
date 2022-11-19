//Get JSON File

///Loading JSON without fetch method

import Jobs from './starter-code/data.json' assert {type:'json'};


//Function to Load Job Grid Items
export const loadJobListings=((Jobls=Jobs)=>{

    ///Get Main Grid container
    const main=document.getElementById('job_List');
    main.classList.add('mid_Grid')
    const count=Jobls.length;


    for (let i=0;i<count;i++){

        //Create job Item Main Container
        let grid_Item =document.createElement('div');
        grid_Item.setAttribute('id','grid'+Jobls[i].id);
        grid_Item.classList.add('jobItem');
   
        //append the each Item to main Grid Container
        main.appendChild(grid_Item);

        //create Logo Background Container
        let logoBackg=document.createElement('div');
        // let coLogo=Jobs[i].company.toLocaleLowerCase();
        
        let backColor=getLogoBackColor(Jobls[i].company.toLocaleLowerCase()); 

        logoBackg.classList.add('logoBag',backColor);
        grid_Item.appendChild(logoBackg);


        //create Logo container
        let myUrl='./starter-code/assets/logos/'+backColor+'.svg';
        let myLogo=document.createElement('div');
        myLogo.style.background='url('+ myUrl +') no-repeat';
        logoBackg.appendChild(myLogo);
        myLogo.classList.add(backColor+'_Size');

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
        
        let sTime=document.createElement('div');
        sTime.innerHTML=Jobls[i].postedAt.trim();
        sTime.classList.add('font_16_2','font_40','font-color-gray','sTime');

        let sPoint=document.createElement('div');
        sPoint.classList.add('sPoint');

        let sType=document.createElement('div');
        sType.classList.add('font_16_2','font_40','font-color-gray','sType');
        sType.innerHTML=Jobls[i].contract;

        jobStatus.appendChild(sTime);
        jobStatus.appendChild(sPoint);
        jobStatus.appendChild(sType);
        jobBag.appendChild(jobStatus);

        //Job Specialty
        let jobSpecialty=document.createElement('div');
        jobSpecialty.setAttribute('id',Jobls[i].id);
        jobSpecialty.classList.add('jobSpecialty','font-color-2','bold_font_70');
        jobSpecialty.innerHTML=Jobls[i].position;
        jobBag.appendChild(jobSpecialty);


        //Company Name
        let company=document.createElement('div');
        company.classList.add('jobCompany','font_size_16','font-color-gray','font_40');
        company.innerHTML=Jobls[i].company;
        jobBag.appendChild(company);

        //Job Location
        let jobLocation=document.createElement('div');
        jobLocation.classList.add('joblocation','bold_font_70')
        jobLocation.innerHTML=Jobls[i].location;
        jobBag.appendChild(jobLocation);


        if (i>=12){
            grid_Item.classList.add('unload');
        }
    }

});

// export function loadJobListings(){

//     ///Get Main Grid container
//     const main=document.getElementById('job_List');
//     main.classList.add('mid_Grid')
//     const count=Jobs.length;


//     for (let i=0;i<count;i++){

//         //Create job Item Main Container
//         let grid_Item =document.createElement('div');
//         grid_Item.setAttribute('id','grid'+Jobs[i].id);
//         grid_Item.classList.add('jobItem');
   
//         //append the each Item to main Grid Container
//         main.appendChild(grid_Item);

//         //create Logo Background Container
//         let logoBackg=document.createElement('div');
//         // let coLogo=Jobs[i].company.toLocaleLowerCase();
        
//         let backColor=getLogoBackColor(Jobs[i].company.toLocaleLowerCase()); 

//         logoBackg.classList.add('logoBag',backColor);
//         grid_Item.appendChild(logoBackg);


//         //create Logo container
//         let myUrl='./starter-code/assets/logos/'+backColor+'.svg';
//         let myLogo=document.createElement('div');
//         myLogo.style.background='url('+ myUrl +') no-repeat';
//         logoBackg.appendChild(myLogo);
//         myLogo.classList.add(backColor+'_Size');

//         //Create Job sub Item Container
//         let mySubItem=document.createElement('div');
//         mySubItem.classList.add('jobSubItem');
//         grid_Item.appendChild(mySubItem);


//         //create Job advert container
//         let jobBag=document.createElement('div');
//         jobBag.classList.add('jobBag');
//         mySubItem.appendChild(jobBag);

//         //create Job advert items
//         //Job Posting Status
//         let jobStatus=document.createElement('div');
//         jobStatus.classList.add('jobStatus');
        
//         let sTime=document.createElement('div');
//         sTime.innerHTML=Jobs[i].postedAt.trim();
//         sTime.classList.add('font_16_2','font_40','font-color-gray','sTime');

//         let sPoint=document.createElement('div');
//         sPoint.classList.add('sPoint');

//         let sType=document.createElement('div');
//         sType.classList.add('font_16_2','font_40','font-color-gray','sType');
//         sType.innerHTML=Jobs[i].contract;

//         jobStatus.appendChild(sTime);
//         jobStatus.appendChild(sPoint);
//         jobStatus.appendChild(sType);
//         jobBag.appendChild(jobStatus);

//         //Job Specialty
//         let jobSpecialty=document.createElement('div');
//         jobSpecialty.setAttribute('id',Jobs[i].id);
//         jobSpecialty.classList.add('jobSpecialty','font-color-2','bold_font_70');
//         jobSpecialty.innerHTML=Jobs[i].position;
//         jobBag.appendChild(jobSpecialty);


//         //Company Name
//         let company=document.createElement('div');
//         company.classList.add('jobCompany','font_size_16','font-color-gray','font_40');
//         company.innerHTML=Jobs[i].company;
//         jobBag.appendChild(company);

//         //Job Location
//         let jobLocation=document.createElement('div');
//         jobLocation.classList.add('joblocation','bold_font_70')
//         jobLocation.innerHTML=Jobs[i].location;
//         jobBag.appendChild(jobLocation);
//     }
// }

loadJobListings();


function getLogoBackColor(cName){
    switch (cName) {
        case 'scoot':
            return 'scoot';
            break;

        case 'blogr':
            return 'blogr';
            break;

        case 'vector':
            return 'vector';
            break; 

        case 'office lite':
            return 'officelite';
            break;  

        case 'pod':
                return 'pod';
                break;  

        case 'creative':
                return 'creative';
                break;  
            
        case 'pomodoro':
                return 'pomodoro';
                break;   

        case 'maker':
                return 'maker';
                break;  

        case 'coffeeroasters':
                return 'coffeeroasters';
                break; 
    
        case 'mastercraft':
            return 'mastercraft';
            break; 

        case 'crowdfund':
            return 'crowdfund';
            break; 

        case 'typemaster':
            return 'typemaster';
            break;                  
    }
}


function jobSearchFilter (searchStr='',strLocation='',strContract=''){

    let arrStr=[];
    for (let i=0;i<Jobs.length;i++){
        if(Jobs[i].contract==='Full Time' && Jobs[i].company==='Scoot'){
            arrStr.push(Jobs[i]);
        }
    }

    // console.log(arrStr);
}

// jobSearchFilter();




