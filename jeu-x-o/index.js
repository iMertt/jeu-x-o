var playerTurn, moves, isGameOver, span, restartButton;
//Variable qui indique le tour du joueur ("x" ou "o").
playerTurn = "x";
//Variable suivant le nombre de mouvements joués.
moves = 0;
//Variable vérifiant si le jeu est terminé ou non.
isGameOver = false;
//NodeList contenant les éléments <span> du HTML.
span = document.getElementsByTagName("span");
//Contenu HTML utilisé pour recommencer le jeu.
restartButton =
  '<button onclick="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

// Fonction appelée lorsque le joueur clique sur une cellule. Elle met à jour le symbole du joueur et le nombre de mouvements.
function play(y) {
  if (y.dataset.player == "none" && window.isGameOver == false) {
    y.innerHTML = playerTurn;
    y.dataset.player = playerTurn;
    moves++;
    if (playerTurn == "x") {
      playerTurn = "o";
    } else if (playerTurn == "o") {
      playerTurn = "x";
    }
  }

  /* Types gagnants */

  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);

  /* Pas de gagnant */

  if (moves == 9 && isGameOver == false) {
    draw();
  }
}
//  Fonction vérifiant si un joueur a gagné sur certaines cellules.
function checkWinner(a, b, c) {
  a--;
  b--;
  c--;
  if (
    span[a].dataset.player === span[b].dataset.player &&
    span[b].dataset.player === span[c].dataset.player &&
    span[a].dataset.player === span[c].dataset.player &&
    (span[a].dataset.player === "x" || span[a].dataset.player === "o") &&
    isGameOver == false
  ) {
    span[a].parentNode.className += " activeBox";
    span[b].parentNode.className += " activeBox";
    span[c].parentNode.className += " activeBox";
    gameOver(a);
  }
}
//Fonction qui réinitialise le jeu et affiche un retour interactif dans le tableau de jeu.
function playAgain() {
  document
    .getElementsByClassName("alert")[0]
    .parentNode.removeChild(document.getElementsByClassName("alert")[0]);
  resetGame();
  window.isGameOver = false;
  for (var k = 0; k < span.length; k++) {
    span[k].parentNode.className = span[k].parentNode.className.replace(
      "activeBox",
      ""
    );
  }
}
//Fonction qui réinitialise le tableau de jeu et le nombre de mouvements.
function resetGame() {
  for (i = 0; i < span.length; i++) {
    span[i].dataset.player = "none";
    span[i].innerHTML = "&nbsp;";
  }
  playerTurn = "x";
}
//Fonction indiquant qu'un joueur a gagné et que le jeu est terminé.
function gameOver(a) {
  var gameOverAlertElement =
    "<b>JEU TERMINÉ </b><br><br> Joueur " +
    span[a].dataset.player.toUpperCase() +
    " a gagné !!! <br><br>" +
    restartButton;
  var div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = gameOverAlertElement;
  document.getElementsByTagName("body")[0].appendChild(div);
  window.isGameOver = true;
  moves = 0;
}
//Fonction indiquant qu'il y a une égalité dans le jeu.
function draw() {
  var drawAlertElement = "<b>NUL!!!</b><br><br>" + restartButton;
  var div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = drawAlertElement;
  document.getElementsByTagName("body")[0].appendChild(div);
  window.isGameOver = true;
  moves = 0;
}
