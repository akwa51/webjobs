import fetch from "node-fetch";
//Get JSON File

async function getData(){
    const result= await fetch('./starter-code/data');

    try {
        if (result.ok){
            const rsData= await result.json();
            return JSON.parse(rsData);
        }

    }catch(error){
        console.log (error);
    }

}

const myData=getData();



// const myJSON=require(./starter-code/assets/)


// Load Items from JSON file and Append to Grid

// const myJobRecords=JSON.parse();

function loadGridItems(){
    console.log(myData);
}

//Loaded the item
loadGridItems();