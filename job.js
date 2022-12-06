//Get JSON File
import Jobs from './starter-code/data.json' assert {type:'json'};
import {loadJobSpecs} from './jobf2.js';


//Function to Load Job Grid Items
export const loadJobListings=((Jobls=Jobs)=>{
    ///Get Main Grid container
    const main=document.getElementById('job_List');
    main.classList.add('mid_Grid')
    const count=Jobls.length;
    let msLen=0;


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

        //reduce Job Title font Size to accommodate Title Length
        if (jobSpecialty.getBoundingClientRect().width+32>=mySubItem.getBoundingClientRect().width){
            console.log(mySubItem.getBoundingClientRect().width);
            jobSpecialty.style.fontSize='19px';
        }
    
        jobSpecialty.addEventListener('click',(e)=>{loadJobSpecs(e.target.id)});
    
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

        //Hide Loaded Items beyond 12
        if (i>=12){
            grid_Item.classList.add('unload');
        }
    }
});


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






