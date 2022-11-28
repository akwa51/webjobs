
//Import JSON file here for DOM Manipulation
import Jobb from './starter-code/data.json' assert {type:'json'};
import {loadJobListings as loadGridItems} from './job.js';


$(document).ready(function(){
    // Hide Grid Items Not meant to be loaded 
    $('.unload').hide();
    // $('.erMessage').hide();

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

    $('#btnSearch').on('click',()=>{
        //verify on items selected if okay to for search
        let sSearch=$('#search_text').val().trim().toLowerCase();
        let sLocation=$('#location_text').val().trim().toLowerCase();
        let sContract=$('#full_part').prop('checked')

        $('.mid_Grid').empty();

        $('#btn_jobs').hide();

        // document.getElementById('eMsg').classList.remove('eShow');
        // document.getElementById('eMsg').classList.add('eHide');
        

        if (sSearch!=='' || sLocation!=='' || sContract==true){   
           
            let newArr=jobSearch(sSearch,sLocation,sContract);

            if (newArr){
                loadGridItems(newArr);

            }else{
      
                //display message that No Records Exist

                // document.getElementById('eMsg').classList.remove('eHide');
                // document.getElementById('eMsg').classList.add('eShow');
            }

        }else{

            //Load Original Grid Items
            loadGridItems();
            $('.unload').hide();
            $('#btn_jobs').show()
        }
    });

    /// Hide Selected Job Detail and Footer Form
    $('.spec_show').hide();
    $('.specd').hide();

    //When Job Speciality is Selected 
    $('.jobSpecialty').on('click',(e)=>{
        $('.mid_Grid').hide();
        $('#newjob').hide();
        $('#search_container').hide();

    // let specId=$('.jobSpecialty').attr('id');
        let specId=e.target.id;
        // console.log(specId);

        $('.spec_show').show();

     //Load Job Spec details
        loadJobSpecs(specId);

    });
  
});


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
    // console.log(arrStr);
    return arrStr;
}


// Load Job details form
function loadJobSpecs(spId){
    //fetch record based on given ID
    let arrSp=getSpecRecord (spId);

    // console.log(arrSp);

    if (arrSp){
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
        let hcompbtn=document.createElement('div');
        let hcompinfo=document.createElement('div');
        hcompinfo.classList.add('hcompi','font-color-violet','bold_font_70','font_size_16');
        hcompinfo.innerHTML='Company Site';
        hcompbtn.classList.add('hcompdbtn');
        hcompbtn.appendChild(hcompinfo);        
        compdSiteBag.appendChild(hcompbtn);



        //add classes to align them
    }

}


//get Job Specs by ID provided
function getSpecRecord (el){
    for (let i=0;i<Jobb.length;i++){
        if(Jobb[i].id==el){
            return Jobb[i];
            break;
        }
    }
    return [];
}