
//Import JSON file here for DOM Manipulation
import Jobb from './starter-code/data.json' assert {type:'json'};
import {loadJobListings as loadGridItems} from './job.js';


//Get Local Settings State for site
const mainPage=document.querySelector('.brand');
const sToggle=document.querySelector('#mode_button');
const bigContainer=document.getElementById('mid_Container');
const modal=document.querySelector('#search_wrap');

sToggle.addEventListener('click',toggleSiteTheme);

//Modal form window event listener
window.addEventListener('click',outSideClick);


$(document).ready(function(){
    // Hide Grid Items Not meant to be loaded 
    $('.unload').hide();

    //Add Event Listener for search Input field for Opacity
    $('#search_text').keyup((e)=>{
        if($('#search_text').val().trim()!==''){
            e.target.style.opacity='1';
        }else{
            e.target.style.opacity='0.5';
        }
    });

    //Add Event Listener for mobile search Input field for Opacity
    $('#mobile_text').keyup((e)=>{
        if($('#mobile_text').val().trim()!==''){
            e.target.style.opacity='1';
        }else{
            e.target.style.opacity='0.5';
        }
    });

    //Add Event Listener for location Input field for Opacity
    $('#location_text').keyup((e)=>{
        if($('#location_text').val().trim()!==''){
            e.target.style.opacity='1';
        }else{
            e.target.style.opacity='0.5';
        }
    });

    //Dark Mode Switch hover State
    $('.swbackgrd').hover(()=>{
        $('.switch1').toggleClass('mode_state');
    });

    $('#mobile_search').on('click',()=>{
        $('#mobile_text').focus();
    });


    $('#mobile_text').focus(()=>{
        $(this).attr('placeholder', 'Filter by title...');
    });


    $('#sgfilter').on('click',()=>{
        $('#search_wrap').show();
        $('#mobile_text').attr('placeholder', 'Enter job desc...');
    });


    $('#search_filter').on('click',()=>{
        $('#search_text').focus();
    });

    $('#location_filter').on('click',()=>{
        $('#location_text').focus();
    });

    $('#btn_jobs').addClass('more_jobs bold_font_70 font_16_2');


    //when Load More Button is Clicked
    $('#btn_jobs').on('click',()=>{
         $('.unload').toggle();

        if ($('#btn_jobs').text() === 'Load More'){
            $('#btn_jobs').html('Load Less');
        }else{
            $('#btn_jobs').html('Load More')
        }
        // $('#btn_jobs').text($('#btn_jobs').text()==='Load More'?'Load Less':'Load More');
    });

    $('#search_bg').on('click',()=>{
        //verify on items selected if okay to for search
        let sSearch=$('#mobile_text').val().trim().toLowerCase();
        displayJobListing(sSearch);
    });

    $('#btnSearch').on('click',()=>{
        let sSearch='';
        let sLocation='';
        let sContract=false;

        sLocation=$('#location_text').val().trim().toLowerCase();
        sContract=$('#full_part').prop('checked');

        //verify on items selected if okay to for search
        if (!$('#mobile_search').is(":hidden")){
           sSearch=$('#mobile_text').val().trim().toLowerCase();

           $('#search_wrap').hide();
           $('#mobile_text').attr('placeholder', 'Filter by title...');
           $('#full_part').prop('checked',false);
           $('#location_text').val('');
        }else{
            sSearch=$('#search_text').val().trim().toLowerCase();
        }


        displayJobListing(sSearch,sLocation,sContract);
    });

    /// Hide Selected Job Detail and Footer Form
    $('.spec_show').hide();
    $('.specd').hide();

    //When Job Speciality is Selected 
    $('.jobSpecialty').on('click',(e)=>{
     //Load Job Spec details
        loadJobSpecs(e.target.id);
    });
  
});

//create new error message
errMessageCreate();

//Function to filter out Job Listings based on selected options
function jobSearch (searchStr='',strLocation='',strContract=false){

    let arrStr=[];
   
    for (let i=0;i<Jobb.length;i++){

        if (searchStr!=='' && strLocation!=='' && strContract===true){
            if((Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr) && Jobb[i].location.toLowerCase()===strLocation && Jobb[i].contract==='Full Time'){
                    arrStr.push(Jobb[i]);
            }
        }else if(searchStr!=='' && strLocation!=='' && strContract===false){
            if((Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr) && Jobb[i].location.toLowerCase()===strLocation){
                arrStr.push(Jobb[i]);
            }
        }else if(searchStr!=='' && strLocation==='' && strContract===false){
            if(Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr){
                arrStr.push(Jobb[i]);
            }
        }else if(searchStr==='' && strLocation!=='' && strContract===false){
            if(Jobb[i].location.toLowerCase()===strLocation){
                arrStr.push(Jobb[i]);
            }
        }else if(searchStr==='' && strLocation==='' && strContract===true){
            if(Jobb[i].contract==='Full Time'){
                arrStr.push(Jobb[i]);
            }
        }else if(searchStr!=='' && strLocation==='' && strContract===true){
            if((Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr) && Jobb[i].contract==='Full Time'){
                arrStr.push(Jobb[i]);
             }
        }else if(searchStr==='' && strLocation!=='' && strContract===true){
            if(Jobb[i].location.toLowerCase()===strLocation && Jobb[i].contract==='Full Time'){
                arrStr.push(Jobb[i]);
            }
        }
    }
    return arrStr;
}

function displayJobListing(sSearch='',sLocation='',sContract=false){

    //verify on items selected if okay to for search
    $('.mid_Grid').empty();
    $('#btn_jobs').hide();
    $('#eMsg').hide();

    if (sSearch!=='' || sLocation!=='' || sContract==true){   
       
        let newArr=jobSearch(sSearch,sLocation,sContract);

        if (newArr.length>0){
            loadGridItems(newArr);

        }else{
  
            //display message that No Records Exist
            $('#eMsg').show();
        }

    }else{

        //Load Original Grid Items
        loadGridItems();
        $('.unload').hide();
        $('#btn_jobs').show()
    }
}


// Load Job details form
export function loadJobSpecs(spId){
    //fetch record based on given ID
    let arrSp=getSpecRecord (spId);

    if (arrSp){

        $('.mid_Grid').hide();
        $('#newjob').hide();
        $('#search_container').hide();
        $('#mobile_search').hide();

        // console.log($('#mobile_text').val());

    // let specId=$('.jobSpecialty').attr('id');
        $('.spec_show').empty();
        $('.spec_show').show();


        //create header container for job advert 
        //create container for company header
        const jobDetail=document.querySelector('#e_detail');
        let jobDHeadBag=document.createElement('div');
        jobDHeadBag.classList.add('edheadbag', 'font_16_2','font-color-2');
        jobDetail.appendChild(jobDHeadBag);

        //create company logo background container
        let cLogoBag=document.createElement('div');
        cLogoBag.classList.add('cdblogo');
        cLogoBag.style.backgroundColor=arrSp.logoBackground;
        jobDHeadBag.appendChild(cLogoBag);
        
        //create small logo container with Img
        let simgBag=document.createElement('div');
        let myImg=document.createElement('img');
        let myUrl=arrSp.logo.substr(0,1)+'/starter-code/'+arrSp.logo.substr(2);
        let logoTag=arrSp.company.toLowerCase().replace(' ','');
        myImg.src=myUrl;
        myImg.classList.add(logoTag+'_dimg');
        simgBag.appendChild(myImg);
        cLogoBag.appendChild(simgBag);
        simgBag.classList.add(logoTag+'_dsize');
        
        //create company site container
        let compdSiteBag=document.createElement('div');
        compdSiteBag.classList.add('compheadbag');
        jobDHeadBag.appendChild(compdSiteBag);

        //create small header company website bag
        let scompSiteBag=document.createElement('div');
        let hcompName=document.createElement('div');
        let hcompSite=document.createElement('div');

        scompSiteBag.classList.add('scomphbag');
        hcompName.classList.add('hcompnbag','bold_font_70','font_size_24','font-color-2');
        hcompName.innerHTML=arrSp.company;

        hcompSite.classList.add('hcompdsite','font_40','font_size_16','font-color-gray');
        hcompSite.innerHTML=logoTag+'.com';

        scompSiteBag.appendChild(hcompName);
        scompSiteBag.appendChild(hcompSite);
        compdSiteBag.appendChild(scompSiteBag);

        //Header Company Site Button
        let hcompbtn=document.createElement('button');
        hcompbtn.innerHTML='Company Site';
        hcompbtn.classList.add('hcompdbtn','font-color-spcompany','bold_font_70','font_size_16');
        compdSiteBag.appendChild(hcompbtn);

        //create Initial Job Advert as seen , and add click Button to Apply
        //create and append main job specs container
        let mainJobSpecBag=document.createElement('div');
        mainJobSpecBag.classList.add('mainjobcdetail');
        jobDetail.appendChild(mainJobSpecBag);

        //create the Job Advert container, button and contents
        let spJobAdvertContainer=document.createElement('div');
        spJobAdvertContainer.classList.add('jobadvcontainer');
        mainJobSpecBag.appendChild(spJobAdvertContainer);

        let spJobAdvertBag=document.createElement('div');
        spJobAdvertBag.classList.add('spjobadbag');
        spJobAdvertContainer.appendChild(spJobAdvertBag);

        //create Job Advert Status container here
        let spdJobStatus=document.createElement('div');
        spdJobStatus.classList.add('jobStatus');

        let spTime=document.createElement('div');
        spTime.innerHTML=arrSp.postedAt.trim();
        spTime.classList.add('font_16_2','font_40','font-color-gray','sTime');

        let spdPoint=document.createElement('div');
        spdPoint.classList.add('sPoint');

        let spPartFulltime=document.createElement('div');
        spPartFulltime.innerHTML=arrSp.contract;
        spPartFulltime.classList.add('font_16_2','font_40','font-color-gray','sType');

        spdJobStatus.appendChild(spTime);
        spdJobStatus.appendChild(spdPoint);
        spdJobStatus.appendChild(spPartFulltime);
        spJobAdvertBag.appendChild(spdJobStatus);
        
        ///Job Speciality being Advertised
        let spjobSpeciality=document.createElement('div');
        spjobSpeciality.classList.add('spjobSpecialty','font-color-2','bold_font_70');
        spjobSpeciality.innerHTML=arrSp.position;
        spJobAdvertBag.appendChild(spjobSpeciality);


        let spJoblocation=document.createElement('div');
        spJoblocation.classList.add('spjoblocation','bold_font_70')
        spJoblocation.innerHTML=arrSp.location;
        spJobAdvertBag.appendChild(spJoblocation);

        let spjobApplybtn=document.createElement('button');
        spjobApplybtn.classList.add('spbtnapply','font_size_16','font-color-white','bold_font_70');
        spjobApplybtn.innerHTML='Apply Now'
        spJobAdvertContainer.appendChild(spjobApplybtn);


        // Load Initial Job Description 
         let spdJobDesBag=document.createElement('div');
         spdJobDesBag.classList.add('spdjbesBag');
         mainJobSpecBag.appendChild(spdJobDesBag);

         let spjobDescription=document.createElement('p');
         spjobDescription.innerHTML=arrSp.description;
         spjobDescription.classList.add('spjbescribe','font-color-spmain','font_40','normal_font');
         spdJobDesBag.appendChild(spjobDescription);

         //Add Job Requirement Label
         let spReqHeader=document.createElement('div');
         spReqHeader.innerHTML='Requirements';
         spReqHeader.classList.add('spReqLabel','font_size_20','font-color-2','bold_font_70');
         mainJobSpecBag.appendChild(spReqHeader);

        //Load Main Job Requirements
        let spjobReqContainer=document.createElement('div');
        let spjobRequirements=document.createElement('p');
        spjobReqContainer.classList.add('spjreqdiv');

        spjobReqContainer.appendChild(spjobRequirements);
        mainJobSpecBag.appendChild(spjobReqContainer);

        spjobRequirements.innerHTML=arrSp.requirements['content'].trim();
        spjobRequirements.classList.add('spjbReqContents','font-color-spmain','font_40','normal_font');

        //Load Requirement List Items
        let cList=arrSp.requirements.items.length;
        if (cList>0){

            //Load Requirement List Items
            let spreqListContainer=document.createElement('div');
            spreqListContainer.classList.add('spreqlstBag');
            mainJobSpecBag.appendChild(spreqListContainer);

            //create a List Container Element
            for (let j=0; j<cList;j++){
                
                //create parent list bag
                let spdlistSachet=document.createElement('div');
                spdlistSachet.classList.add('splistBag');

                //create respective list items and append
                let esPoint=document.createElement('div');
                esPoint.classList.add('splistSachet');
                spdlistSachet.appendChild(esPoint);

                let spMreqList=document.createElement('div');
                spMreqList.classList.add('spreqMItem','font-color-spmain','font_40','normal_font');
                spMreqList.innerHTML=arrSp.requirements.items[j];
                spdlistSachet.appendChild(spMreqList);
                spreqListContainer.appendChild(spdlistSachet);
            }
        }

        //Load What You'll Do_ Label First
        let spTaskLabel=document.createElement('div');
        spTaskLabel.innerHTML='What You Will Do';
        spTaskLabel.classList.add('sptaskMLabel','font_size_20','font-color-2','bold_font_70');
        mainJobSpecBag.appendChild(spTaskLabel);

        //Load Seek Job Description
        let spjobSeekerContainer=document.createElement('div');
        let spjobSeekerRequirements=document.createElement('p');
        spjobSeekerContainer.classList.add('spjreqdiv');

        spjobSeekerContainer.appendChild(spjobSeekerRequirements);
        mainJobSpecBag.appendChild(spjobSeekerContainer);

        spjobSeekerRequirements.innerHTML=arrSp.role.content
        spjobSeekerRequirements.classList.add('spjbReqContents','font-color-spmain','font_40','normal_font');


        //Load Seek Job Items
        let rList=arrSp.role.items.length;
        if (rList>0){

            //Load Requirement List Items
            let spjobSeekContainer=document.createElement('div');
            spjobSeekContainer.classList.add('spseeklstBag');
            mainJobSpecBag.appendChild(spjobSeekContainer);


             //create a List Container Element
             for (let j=0; j<rList;j++){
                
                //create parent list bag
                let spjslistSachet=document.createElement('div');
                spjslistSachet.classList.add('splistBag');

                //create respective list items and append
                let olsPoint=document.createElement('div');
                olsPoint.classList.add('jseekItem','font-color-violet','bold_font_70','normal_font');
                olsPoint.innerHTML=j+1;
                spjslistSachet.appendChild(olsPoint);

                let spjobMSeekList=document.createElement('div');
                spjobMSeekList.classList.add('spreqMItem','font-color-spmain','font_40','normal_font');
                spjobMSeekList.innerHTML=arrSp.role.items[j];
                spjslistSachet.appendChild(spjobMSeekList);
                spjobSeekContainer.appendChild(spjslistSachet);
             }  
        }

        //Make the footer Visible
        $('.fspRole').addClass('font-color-2 bold_font_70 font_size_20');
        $('.fspRole').html(arrSp.position);
      

        // Set the position of footer & Display
        let myPl=$('.spec_show').height()+100;
        
        $('.specd').css('top', myPl);
        $('.specd').show();
    }
}


//get Job Specs by ID provided
function getSpecRecord (el){
    for (let i=0;i<Jobb.length;i++){
        if(Jobb[i].id==el){
            return Jobb[i];
        }
    }
    return [];
}


// Site Color Mode Settings
//set theme and LocalStorage on Page Load
// /......................................................./ 
setThemeState();


function setThemeState() {
    //Confirm localStorage has a value for Site
    if (!(localStorage.checked===undefined)){
        //set theme state of site
        sToggle.checked=isTrue(localStorage.getItem('checked'));

        //set Page Theme State accordingly
        toggleSiteTheme();
    }
}

function toggleSiteTheme(){
      // Toggle theme based on state of checkbox
    if (sToggle.checked){
        mainPage.classList.replace('light','dark');
    }else{
        mainPage.classList.replace('dark','light');
    }
    //set value of 'checked' key in localStorage
    localStorage.setItem('checked',sToggle.checked);
}


function isTrue(value){
    return value ==="true";
}
//..................................................../


// //create Error Message Form and hide
// ...................................................../
function errMessageCreate(){
    let errTag=document.createElement('div');
    errTag.classList.add('errShow');
    errTag.setAttribute('id','eMsg');
    errTag.innerHTML='No Such Record Exists. Kindly Refine Search Criteria!';
    bigContainer.appendChild(errTag);
    errTag.style.display='none';
}

//Modal dialog clearance
function outSideClick(e){

    if (e.target==modal){
        modal.style.display='none'
        $('#mobile_text').attr('placeholder', 'Filter by title...');
        $('#full_part').prop('checked',false);
        $('#location_text').val('');
    }

}

// JS Media Query Functions
// ..........................................................................//

//@768px window Size make some changes
function tabletTextMode(winWidth){
    if (winWidth.matches){
        $('#search_text').attr('placeholder','Filter by title...');
        $('#lblfulltime').html('Full Time');
    }else{
         $('#search_text').attr('placeholder','Filter by title,company,expertise...');
         $('#lblfulltime').html('Full Time Only');
    }
}

let windowSize=window.matchMedia('(min-width:700px) and (max-width:768px)');
tabletTextMode(windowSize);
windowSize.addEventListener('change',tabletTextMode);


//@375px window Size make some changes
function mobileViewMode(mobileWidth){
    if(mobileWidth.matches){
        $('#search_filter').hide();
        $('#mobile_search').show();
    }else{
        $('#mobile_search').hide();
        $('#search_filter').show();
        $('#search_container').show();
    }
}
let mobSize=window.matchMedia('(min-width:280px) and (max-width:540px)');
mobileViewMode(mobSize);
mobSize.addEventListener('change',mobileViewMode);


//@320px window Size make some changes

