let popupBtn = document.getElementById("jrt-popupBtn");
let modal = document.getElementById("jrt-modal");
let closeBtn = document.getElementById("jrt-closeBtn");
popupBtn.addEventListener("click",()=>{
    modal.style.opacity = 1;
    modal.style.visibility = "visible";
});
closeBtn.addEventListener("click",()=>{
    modal.style.opacity = 0;
    modal.style.visibility = "hidden";    
});
