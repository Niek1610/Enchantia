const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexaString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexaString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (`
    <div class="wrapper ${isAi && "ai"}">
      <div class="chat">
      <div class="profile"></div>
        <div class="message" id=${uniqueId}> ${value} </div>
      </div>
    </div>

    `)
}

const submit = async (e) => {
  e.preventDefault();

  
  const data = new FormData(form);

  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  const uniqueId = generateId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  let raadselvoorbot = localStorage.getItem("raadselbot")
  let antwoordvoorbot = localStorage.getItem("antwoordvoorbot") 

  // Hij moet fetchen naar de server. de server staat op Render.com. 
  // in de logs op render.com staat dat hij wel een antwoord binnenkrijgt.
  //het terugsturen lukt vgm niet. 

  const response = await fetch("https://server2-ig1g.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
      raadselvoorbot,
      antwoordvoorbot,
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Er is een fout opgetreden";
    alert(err);
  }
};

let raadselbot = localStorage.getItem("raadselbot")

window.addEventListener("load", ()=> {
  const uniqueId = generateId();
  chatContainer.innerHTML += chatStripe(true, `Raadsel: ${raadselbot}`, uniqueId);
  const messageDiv = document.getElementById(uniqueId);

} );

form.addEventListener("submit", submit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    submit(e);
  }
});

