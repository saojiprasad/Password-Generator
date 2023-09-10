const inputSlider=document.querySelector('input[type=range]');
const lengthDisplay=document.querySelector('[data-length]');
const passwordDisplay=document.querySelector("input[data-passworddisplay]");
const copyBtn=document.querySelector('[data-copyBtn]');
const copyMsg=document.querySelector('[data-copyMsg]');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
// const lowercase = documemt.querySelector('#lowercase');
const numbers= document.querySelector('#numbers')
const symbols= document.querySelector('#symbols')
const indicator=document.querySelector('[data-indicator]');
const generatorBtn=document.querySelector('.generateBtn');
const allCheckBox=document.querySelectorAll('input[type=checkbox');

let password="";
let passwordLength=10;
let checkCount=0;


const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
// Lets check what is happening in web site
// copycontent
//generate Password
//4)  set Indicator change color for strong and weak password

//the password is creating randomly so we need a password generator fucntion
//but there are many types in generating password like uppercase lower numbers and symbols
//so we need four functions for that 
//calculate strength fucntion also needed 


//set Password
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerHTML=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"

}
handleSlider()

function setIndicator(color){
    indicator.style.backgroundColor= color;
    //DONE
    // indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}
setIndicator("#ccc");

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function generatelowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateupperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateRandomSymbol(){
    const randNum=getRandomInteger(0,symbol.length);
    return symbol.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercase.checked) hasUpper=true;
    if(lowercase.checked) hasLower=true;
    if(numbers.checked) hasNum=true;
    if(symbols.checked) hasSym=true;

    if(hasUpper && hasLower &&(hasNum || hasSym)&&passwordLength>=9){
        console.log("PRASAD 1");
        setIndicator("#0f0");
    }
    else if((hasLower||hasUpper) && (hasNum || hasSym) && (passwordLength>=6)){
        console.log("PRASAD 1");
        setIndicator("#ff0");
    }
    else{
        console.log("PRASAD 1");
        setIndicator("#f00");
    }
}
//write text wala operation is asyn thats why we need promise
async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
        }

        catch(e){
            copyMsg.innerText="failed";
        }
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
     
    
    
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    //special Condition Hai Bhai
      if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
      }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});


inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

// let generatorBtn = document.querySelector("#generateBtn");
generatorBtn.addEventListener('click',()=>{
     //none of the checkbox is selected
     if(checkCount<=0) return;

     if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
     }

     //Lets find NEW PASSWORD
     
    //  Remove Old Password
     password="";
    
     //lets put the stuff mentioned by checkboxes

    //  if(uppercase.checked){
    //     password+=generateupperCase();
    //  }
    //  if(lowercase.checked){
    //     password+=generatelowerCase();
    //  }
    //  if(numbers.checked){
    //     password+=getRandomNumber();
    //  }
    //  if(symbol.checked){
    //     password+=generateRandomSymbol();
    //  }

     let funArr=[];
     if(uppercase.checked){
        funArr.push(generateupperCase);
     }

     if(lowercase.checked){
        funArr.push(generatelowerCase);
     }

     if(numbers.checked){
        funArr.push(getRandomNumber);
     }

     if(symbols.checked){
        funArr.push(generateRandomSymbol);
     }

     //compulsory addition
     for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
     }
     //remaining ADDition
     for(let i=0;i<passwordLength-funArr.length;i++){
        let randIndex=getRandomInteger(0,funArr.length);
        password+=funArr[randIndex]();

     }
     //shuffle the PASSWORD

     password=shufflePassword(Array.from(password));

     //SHOW in UI

     passwordDisplay.value=password;

     //calculate the length 
     calcStrength();

});




