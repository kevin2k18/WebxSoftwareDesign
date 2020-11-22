let popupBtn = document.getElementById("kav-popupBtn");
let modal = document.getElementById("kav-modal");
let closeBtn = document.getElementById("kav-closeBtn");
popupBtn.addEventListener("click",()=>{
    modal.style.opacity = 1;
    modal.style.visibility = "visible";
});
closeBtn.addEventListener("click",()=>{
    modal.style.opacity = 0;
    modal.style.visibility = "hidden";    
});
