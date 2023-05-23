
let complete1 = localStorage.getItem("raadselcomplete1")
const slot1 = document.getElementById("slotjeicon1")

if (complete1 == 1) {
    slot1.classList.add("hiding")
}

let complete2 = localStorage.getItem("raadselcomplete2")
const slot2 = document.getElementById("slotjeicon2")

if (complete2 == 1) {
    slot2.classList.add("hiding")
}

let complete3 = localStorage.getItem("raadselcomplete3")
const slot3 = document.getElementById("slotjeicon3")

if (complete3 == 1) {
    slot3.classList.add("hiding")
}


