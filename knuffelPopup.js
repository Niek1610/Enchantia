const claim1 = document.getElementById("claim1")

const popup = document.getElementById("achtergrondpopup")

claim1.addEventListener("click", ()=>{
    popup.classList.remove("hidden");
    afsluitknop.classList.remove("hidden");

});

let afsluitknop = document.getElementById("kruis");

afsluitknop.addEventListener("click", () =>{
    afsluitknop.classList.add("hidden");
    popup.classList.add("hidden");
});


const activeer = document.getElementById("activeer")
const body = document.querySelector("body")
const prijsfoto = document.getElementById("prijsfoto")
const prijstext = document.getElementById("prijstext")
let code = document.getElementById("code")
let timertext = document.getElementById("timer");
let timeLeft = localStorage.getItem('timeLeft') || Infinity;
let infotext = document.getElementById("infotext")


if (localStorage.getItem("isHidden") === "true") {
    activeer.classList.add("hidden");
    timertext.classList.remove("hidden")
    code.classList.remove("hidden")
    infotext.innerHTML = "Geef jouw code aan een medewerker"
    claim1.innerHTML = "Kies"
}

claim1.addEventListener("click", ()=>{
    prijstext.innerHTML = "Haal jouw prijs op bij onze souvenirwinkel Efteldingen!";
    prijsfoto.src = "bestanden/dragonclear.png";
    popup.classList.remove("hidden");
    body.style.overflow = "hidden";
    afsluitknop.classList.remove("hidden");
});



let result1 = localStorage.getItem("result1");
code.innerHTML =  "Code: " + result1;

activeer.addEventListener("click", ()=> {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < 4; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    activeer.classList.add("hidden");
    localStorage.setItem("result1", result);
    localStorage.setItem("isHidden", "true");
    let result1 = localStorage.getItem("result1");
    timertext.classList.remove("hidden")
    code.classList.remove("hidden")
    code.innerHTML = "Code: " + result1;
    infotext.innerHTML = "Geef jouw code aan een medewerker"
    claim1.innerHTML = "Geclaimed"
    timeLeft = 600
});


const timer = setInterval(() => {
    if (timeLeft <= 0) {
        code.innerHTML = "Code is verlopen"
        timertext.classList.add("hidden")
    } else {
        let minutesLeft = Math.floor(timeLeft / 60);
        let secondsLeft = timeLeft % 60;
        timertext.innerHTML = minutesLeft + "m " + secondsLeft + "s";
        timeLeft--;
        localStorage.setItem('timeLeft', timeLeft);
    
    }
}, 1000);

let minutesLeft = Math.floor(timeLeft / 60);
let secondsLeft = timeLeft % 60;

timertext.innerHTML = minutesLeft + "m " + secondsLeft + "s";



