//num
let numBtn = document.getElementsByClassName("vwg-num"); // unsorted number buttons
let numCurrent = document.getElementById("vwg-current"); // current clicked number
let decimal = document.getElementById("decimalBtn"); // decimal button only
let numPrev = document.getElementById("vwg-historyText");
let numInp = new Array ("0"); // clicked numbers
let num = null;  // inputted number
let numToOperate = new Array();

//operators
let operate = document.getElementsByClassName("operator"); // all operators
let operatetors = new Array(); //clicked operators
let viewOps = new Array();

//backspace
let backspace = document.getElementById("vwg-backspace");
//clear
let clear = document.getElementById("vwg-clear");

//error trap for 0 in current screen
let clicked = 1;

//equal vars
let doOperation = document.getElementById("equalBtn");
let ans = null;

//unset func
function unset(){
  numInp = new Array ("0");
  num = null;
  operatetors = [];
  decimal.disabled = false;
  clicked = 1; 
  numToOperate = new Array();
  viewOps = new Array();
  ans = null;
}

//concat the numInp array
function concatNumInp(){
  num=numInp[0];
  for(let numIndex = 1 ; numIndex<numInp.length;numIndex++){
    num +=  numInp[numIndex];
  }
  
  // unset the numInp
  numInp = new Array();
  
}

//view numToOperate
function viewOperation(){
  for(index = 0 ; index < numToOperate.length ; index++){
    numCurrent.append(numToOperate[index]);
    numCurrent.append(viewOps[index]);
  }
}

function hist(){
  for(index = 0 ; index < numToOperate.length ; ++index){
    // indexB = index+1;
    numPrev.append(numToOperate[index]);
    if(viewOps[index] != undefined){
      numPrev.append(viewOps[index]);
    }
    
  }
}

//USE PEMDAS
function calc(){

  //do eval
  //concat all num with operator
  let toCalc = null;
  for(let index = 0 ; index < numToOperate.length ; index++){
    if(toCalc == null){
      toCalc=numToOperate[index];
    }
    else{
      toCalc += numToOperate[index];
    }
    if(numToOperate.length-1>index){
      toCalc += operatetors[index];
    }
    
  }
  ans = eval(toCalc);
}
 
//add event listners to each numbuttons
for( let index = 0; index < numBtn.length ; index++){
  numBtn[index].addEventListener("click",function(){
    //clear the 0 in the current screen
    if(clicked == 1){
      numCurrent.innerHTML = "";
      clicked++;  
      // delete the 0
      numInp.shift();
    }

    //save numbers as text
    numInp.push(numBtn[index].value).toString();    
    numCurrent.append(numBtn[index].value);
    console.log(numInp);
  });

}

decimal.addEventListener("click",function(){
  numInp.push(decimal.value).toString();
  numCurrent.append(decimal.value);
  //disable the decimal button
  decimal.disabled = true;
});

backspace.addEventListener("click",function(){
  //if there is no operation yet
  if(num == null){
    if(numInp.length !=0){
      //clear the Current input screen
      numCurrent.innerHTML = "";
      //delete the last element of array and append each element
      numInp.pop();
      //make sure to enable decimal button
      decimal.disabled = false;
      viewOperation();
      numInp.forEach(element => {
        numCurrent.append(element);
      });
    }
    //if there is only one element in numInp 
    else if(numInp.length==1 || numInp.length==0){
      numInp = new Array("0");
      clicked = 1;
      numInp.forEach(element => {
        numCurrent.innerHTML = element;
      });
    }
    
  }
  //if there is an operation
  else if(operatetors.length == 1){
    numCurrent.innerHTML = "";
    numInp.pop();
    decimal.disabled = false;
    viewOperation();
    numInp.forEach(element => {
      numCurrent.append(element);
    });
  }
  if(ans != null){
    numPrev.innerHTML = "Ans = " + ans;
    numCurrent.innerHTML = "0";
    //unset all
    unset();
  }
});

clear.addEventListener("click",function(){
  //clear the Current input screen and unset all
  numCurrent.innerHTML = "0";
  numPrev.innerHTML = "";
  unset();
});

//add event listeners to each operation
for(let index = 0; index< operate.length ; index++){
  operate[index].addEventListener("click",function(){
    //convert and send to Calculator class
    if(numInp.length != 0){
      concatNumInp();
      // push the num to the array and do operation
      numToOperate.push(num);
      num=null;
    }
    
    //get the operator
    if(numToOperate.length-1 == operatetors.length || numToOperate.length == operatetors.length){
      operatetors[numToOperate.length-1] = operate[index].value;
      viewOps[numToOperate.length-1] = operate[index].textContent;
      numCurrent.innerHTML = "";
      viewOperation();
    }
    //enable the decimal button
    decimal.disabled = false;
  });
}

doOperation.addEventListener("click",function(){
  if(numInp.length != 0){
    concatNumInp();
    // push the num to the array and do operation
    numToOperate.push(num);
  }

  // history
  //clear it first
  numPrev.innerHTML = "";
  hist();

  //use PEMDAS
  calc();
  numCurrent.innerHTML = ans;
  if(isNaN(ans)){
    alert("Invalid input! Try again");
    //unset all
    unset();
    numCurrent.innerHTML = "0";
    numPrev.innerHTML = "";
  }
  
});