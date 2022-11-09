// import fetch from "node-fetch";
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


function loadGridItems(){
    console.log(myData);
}


//Loaded the item
loadGridItems();