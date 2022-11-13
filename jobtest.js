//Get JSON File

///Loading JSON without fetch method

import Jobs from './starter-code/data.json' assert {type:'json'};

// Jobs=JSON.parse(Jobs);

// console.log(Jobs);
// console.log(Jobs[0])


function getNetworkEl(){
    let myResult=document.getElementById('json_data');

    if (myResult){
        myResult.innerHTML=Jobs[0].requirements.content;
    }else{
        console.log(Jobs);
    }
    myResult.style.width="300px";
    myResult.style.height='auto';
    myResult.style.margin="100px auto";
}

getNetworkEl();

