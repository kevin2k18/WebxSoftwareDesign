let StartBtn = document.getElementById("startBtn");
let modal = document.getElementById("modal");
let closeBtn = document.getElementById("closeBtn");
let Qoption = document.getElementsByClassName("jrt-option");
let selctOpt = document.getElementsByClassName("jrt-radSelect");
let questionNum = document.getElementById("questionNum");
let question = document.getElementById("question");
let options = document.getElementsByClassName("opt");
let prev = document.getElementById("prevBtn");
let next = document.getElementById("nextBtn");
let presntQ = 0;
let presntQNum = 1;
let quiz;


function viewQuestandOp(){
    if(presntQ<0){
        presntQ = 0;
        presntQNum = 1;
    }

    if(presntQ>=5){
        presntQ = 4;
        presntQNum = 5;
        next.innerHTML="Done";
        alert("Your response has been submitted.");
    }

    questionNum.innerHTML = "Question Number " + presntQNum;
    
    for(let index = 0 ; index < 5 ;index++ ){
        if(presntQ == index){
            question.innerHTML = quiz.QandOpt[index].question;
            for(let Optindex = 0 ; Optindex < 4; Optindex++){
                options[Optindex].innerHTML = quiz.QandOpt[index].options[Optindex];
            }
        }
    }
}

prev.addEventListener("click",()=>{
    presntQ--;
    presntQNum--;
    viewQuestandOp();
    for(let Opindex = 0 ; Opindex < selctOpt.length ; Opindex++){
        selctOpt[Opindex].style.backgroundColor = "white";
    }
});
next.addEventListener("click",()=>{
    presntQ++;
    presntQNum++;
    viewQuestandOp();
    for(let Opindex = 0 ; Opindex < selctOpt.length ; Opindex++){
        selctOpt[Opindex].style.backgroundColor = "white";
    }
});

StartBtn.addEventListener("click",()=>{
    modal.style.visibility = "visible";
    
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let Quizjson = this.responseText;
            let response = JSON.parse(Quizjson);
            quiz = response;
            viewQuestandOp();            
        }
    };

    xmlHttp.open("GET","../json/quiz.json",true);
    xmlHttp.send();
});


closeBtn.addEventListener("click", ()=>{
    modal.style.visibility = "hidden"; 
});

// radio buttons
for(let index = 0; index < Qoption.length ; index++ ) {
    Qoption[index].addEventListener("click",()=>{
        //reset all colors
        for(let Opindex = 0 ; Opindex < selctOpt.length ; Opindex++){
            selctOpt[Opindex].style.backgroundColor = "white";
        }
        selctOpt[index].style.backgroundColor = "#0d7dfa";
    });
}