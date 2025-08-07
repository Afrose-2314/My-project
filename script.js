const games = ["maths", "guess", "memory", "color", "unlock"];
let selectedGame = "";
let spinning = false;

function login() {
  const username = document.getElementById("username").value.trim();
  if (username !== "") {
    localStorage.setItem("username", username);
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("spinner-screen").style.display = "block";
  } else {
    alert("Please enter your name or email.");
  }
}

function startSpin() {
  if (spinning) return;
  spinning = true;
  const wheel = document.getElementById("wheel");
  const deg = 3600 + Math.floor(Math.random() * 360);
  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${deg}deg)`;

  const selectedIndex = Math.floor((deg % 360) / 72);
  selectedGame = games[selectedIndex];

  setTimeout(() => {
    document.getElementById("result").innerHTML = "Selected Game: " + selectedGame.toUpperCase();
    showInstructions(selectedGame);
    spinning = false;
  }, 5200);
}

function showInstructions(game) {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="
      position: fixed;
      top: 20%;
      left: 20%;
      width: 60%;
      padding: 30px;
      background: white;
      border: 2px solid #ccc;
      border-radius: 10px;
      z-index: 1000;
      animation: pop 0.5s ease;
    ">
      <h3>Instructions for ${game.toUpperCase()}</h3>
      <p>This is a quick instruction before starting the game.</p>
      <button onclick="startGame('${game}')">Start Game</button>
    </div>
  `;
  document.body.appendChild(popup);
}

function startGame(game) {
  window.location.href = `games/${game}.html`;
}
