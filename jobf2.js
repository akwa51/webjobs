
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
    });




    
});



function jobSearch (searchStr='',strLocation='',strContract=''){

    let arrStr=[];
    searchStr=searchStr.toLowerCase().trim();
    strLocation=strLocation.toLowerCase().trim();
    strContract=strContract.toLowerCase().trim();


    if (searchStr==='' && strLocation==='' && strContract===''){

    }
    for (let i=0;i<Jobb.length;i++){
        if(Jobb[i].contract==='Full Time' && Jobb[i].company==='Scoot'){
            arrStr.push(Jobs[i]);
        }
    }

    console.log(arrStr);
}