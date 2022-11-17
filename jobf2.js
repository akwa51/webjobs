
//Import JSON file here for DOM Manipulation
import Jobb from './starter-code/data.json' assert {type:'json'};
import {loadJobListings as loadGridItems} from './job.js';


$(document).ready(function(){
    // Hide Grid Items Not meant to be loaded 
    $('.unload').hide();

    $('#search_filter').on('click',()=>{
        $('#search_text').focus();
    });

    $('#location_filter').on('click',()=>{
        $('#location_text').focus();
    });

    $('#btn_jobs').addClass('more_jobs bold_font_70 font_16_2');

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

        if (sSearch!=='' || sLocation!=='' || sContract==true){
        // if (sContract){    
            $('#btn_jobs').hide();
            let newArr=jobSearch(sSearch,sLocation,sContract);

            if (newArr){
                loadGridItems(newArr);
            }else{
                //return empty string
            }

        }else{
            loadGridItems();
            $('.unload').hide();
            $('#btn_jobs').show()
        }
    });
  
});



function jobSearch (searchStr='',strLocation='',strContract=false){

    let arrStr=[];
   
    for (let i=0;i<Jobb.length;i++){

        if (searchStr!=='' && strLocation!=='' && strContract===true){
            if(Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr && Jobb[i].location.toLowerCase()===strLocation && Jobb[i].contract==='Full Time'){
                    arrStr.push(Jobb[i]);
            }
        }else if(searchStr!=='' && strLocation!=='' && strContract===false){
            if(Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr && Jobb[i].location.toLowerCase()===strLocation){
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
            if(Jobb[i].position.toLowerCase().includes(searchStr) || Jobb[i].company.toLowerCase()===searchStr && Jobb[i].contract==='Full Time'){
                arrStr.push(Jobb[i]);
             }
        }else if(searchStr==='' && strLocation!=='' && strContract===true){
            if(Jobb[i].location.toLowerCase()===strLocation && Jobb[i].contract==='Full Time'){
                arrStr.push(Jobb[i]);
            }
        }
    }

    console.log(arrStr);

    return arrStr;
}