const activeer = document.getElementById("activeer")
const body = document.querySelector("body")
const prijsfoto = document.getElementById("prijsfoto")
const prijstext = document.getElementById("prijstext")
let code = document.getElementById("code")
let timertext = document.getElementById("timer");
let timeLeft = localStorage.getItem('timeLeft') || Infinity;
let infotext = document.getElementById("infotext")

let popup = document.getElementById("achtergrondpopup")

if (localStorage.getItem("isHidden") === "true") {
    activeer.classList.add("hidden");
    timertext.classList.remove("hidden")
    code.classList.remove("hidden")
    infotext.innerHTML = "Geef jouw code aan een medewerker"
    claim1.innerHTML = "Geclaimed"
}

claim1.addEventListener("click", ()=>{
    prijstext.innerHTML = "Haal jouw prijs op bij onze souvenirwinkel Efteldingen!";
    prijsfoto.src = "bestanden/derdeclaim.png";
    popup.classList.remove("hidden");
    body.style.overflow = "hidden";
    afsluitknop.classList.remove("hidden");
});

let afsluitknop = document.getElementById("kruis");

afsluitknop.addEventListener("click", ()=>{
    afsluitknop.classList.add("hidden");
    popup.classList.add("hidden");
    body.style.overflow = "scroll";
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


claim2.addEventListener("click", ()=>{
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < 4; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    prijstext.innerHTML = "Haal jouw prijs op bij onze receptie!"
    prijsfoto.src = "bestanden/tweedeclaim.png"
    popup.classList.remove("hidden")
    body.style.overflow = "hidden"
    code.innerHTML = result
    afsluitknop.classList.remove("hidden");
})

claim3.addEventListener("click", ()=>{
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < 4; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    prijstext.innerHTML = "Haal jouw prijs op bij één van onze restaurants!"
    prijsfoto.src = "bestanden/eersteclaim.png"
    popup.classList.remove("hidden")
    body.style.overflow = "hidden"
    code.innerHTML = result
    afsluitknop.classList.remove("hidden");
})




//reset points
//p = 0; localStorage.setItem("totalPoints", p)

let textpunten = document.getElementById("punten")
let totalepunten =  localStorage.getItem("totalPoints") || 0
let puntenprijs1 = document.getElementById("pp1")
let puntenprijs2 = document.getElementById("pp2")
let puntenprijs3 = document.getElementById("pp3")

textpunten.innerHTML = `Punten: ${totalepunten}`
puntenprijs1.innerHTML = `${totalepunten} - 30`
puntenprijs2.innerHTML = `${totalepunten} - 50`
puntenprijs3.innerHTML = `${totalepunten} - 75`

let lock1 = document.getElementById("lbtn1")
let lock2 = document.getElementById("lbtn2")
let lock3 = document.getElementById("lbtn3")

if (totalepunten >= 30){
lock1.classList.add("hidden")
puntenprijs1.classList.add("hidden")

}
if( totalepunten >= 50){
    lock2.classList.add("hidden")
    puntenprijs2.classList.add("hidden")
}
if (totalepunten >= 75){
    lock3.classList.add("hidden")
    puntenprijs3.classList.add("hidden")
}