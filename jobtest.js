//Get JSON File
//const url="starter-code/data.json";
const url='data.json';

function getData(){
    fetch(url)
	.then(res=>res.json())
	.then(dat=>{
	  console.log(data);
	})
    .catch((error)=>{
        console.log (error);
    })
}

getData();

//function loadGridItems(){
//    console.log(myData);
//}

//const myData=getData();

//Loaded the item
//loadGridItems();