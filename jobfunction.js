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

function loadGridItems(){
    console.log(myData);
}

const myData=getData();

//Loaded the item
loadGridItems();