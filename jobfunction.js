// import fetch from "node-fetch";
//Get JSON File
let myData1=loadJSON ('./starter-code/data.json');
let newResult=JSON.parse(myData1);


console.log(newResult);


// async function getData(){
//     const result= await import ('../starter-code/data.json');

//     try {
//         if (result.ok){
//             const rsData= await result.json();
//             console.log(rsData);

//             for (const rs of rsData){
//                 myData1.push(rs)
//             }
//             //myData1=rsData;
//         }

//     }catch(error){
//         console.log (error);
//     }

// }


// getData();


// // function loadGridItems(){
// //     console.log(myData1.keys());
// // }


// // //Loaded the item
// // loadGridItems();

// function getNetworkEl(){
//     let myResult=document.getElementById('json_data');

//     if (myResult){
//         myResult.innerHTML=myData1;
//     }else{
//         console.log(myResult);
//     }
//     myResult.style.width="300px";
//     myResult.style.height='auto';
//     myResult.style.margin="100px auto";
// }


// getNetworkEl();