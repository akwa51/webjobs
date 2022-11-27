
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

        console.log(specId);

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
    let arrSp=getSpecRecord (spId)
    if (arrSp.length>0){
        console.log(arrSp);
        //create container for company header
        //create logo container
        //create company site container
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