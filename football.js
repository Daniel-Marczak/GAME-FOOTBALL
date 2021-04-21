// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// }, false);

////////////////////////////////////////////////// CLASS DOT ///////////////////////////////////////////////////////////
class Dot {
  isCorner = false;
  isGoal = false;
  isNextToCorner = true;
  isEdge = true;
  isEnabled = true;
  line = 0;
  number = 0;
  top = true;
  topRight = true;
  right = true;
  bottomRight = true;
  bottom = true;
  bottomLeft = true;
  left = true;
  topLeft = true;

  constructor(isCorner, isGoal, isNextToCorner, isEdge, isEnabled, line, number, top, topRight, right, bottomRight,
              bottom, bottomLeft, left, topLeft
  ) {
    this.isCorner = isCorner;
    this.isGoal = isGoal;
    this.isNextToCorner = isNextToCorner;
    this.isEdge = isEdge;
    this.isEnabled = isEnabled;
    this.line = line;
    this.number = number;
    this.top = top;
    this.topRight = topRight;
    this.right = right;
    this.bottomRight = bottomRight;
    this.bottom = bottom;
    this.bottomLeft = bottomLeft;
    this.left = left;
    this.topLeft = topLeft;
  }
}

//////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
const footballField = document.querySelector(".football-field");
let width = 8;
let lines = 10;
let currentDotId;
let currentDotElement;
let nextDotElement;
let previousDotElement;
let moveLineElementId;
let cntL = 0;
let cntW = 0;

/////////////////////////////////////// FOOTBALL FIELD GENERATOR START /////////////////////////////////////////////////
footballFieldGenerator(width, lines);

function createGoalGateDivContainerAndGoalGateDiv(lineCounter) {
  const goalGateContainerDiv = document.createElement("div");
  goalGateContainerDiv.classList.add("goal-gate-container");
  const goalGateDiv = document.createElement("div");
  goalGateDiv.classList.add("goal-gate-div-home");
  if (lineCounter > 0) {
    goalGateDiv.classList.add("goal-gate-div-away");
  }
  goalGateContainerDiv.appendChild(goalGateDiv);
  footballField.appendChild(goalGateContainerDiv);
}

/////////////////////////////////////// FOOTBALL FIELD GENERATOR FUNCTION///////////////////////////////////////////////
function footballFieldGenerator(width, lines) {
  createGoalGateDivContainerAndGoalGateDiv(cntL);

  for (let i = 0; i < lines + 1; i++) {
    const footballFieldLine = document.createElement("div");
    footballFieldLine.className = "football-field-line";
    if (i === 0) {
      footballFieldLine.className = "football-field-line-home";
    }
    if (i === lines) {
      footballFieldLine.className = "football-field-line-away";
    }

    for (let j = 0; j < width; j++) {
      ///////////////////////////////////////////// LEFT DOT ///////////////////////////////////////////////////////////
      if (j === 0) {
        const dotDivLeft = document.createElement("div");
        let leftDot = new Dot(false,false, false, true, true, cntL, cntW,
          false, true, true, true, false, false, false, false
        );

        if (cntL === 0 && cntW === 0 || cntL === lines && cntW === 0) {
          leftDot.topRight = false;
          leftDot.right = false;
          leftDot.bottomRight = false;
        }
        if (width === 2 && leftDot.line === 0 && leftDot.number === 0) {
          leftDot.isGoal = true;
        }
        if (cntL === 1 && cntW === 0 || cntL === lines - 1 && cntW === 0) {
          leftDot.isNextToCorner = true;
        }
        if(cntL === 0 && cntW === 0 || cntL === lines && cntW === 0){
          leftDot.isCorner = true;
        }
        dotDivLeft.classList.add("dot-div", `id-${cntL}${cntW}`);
        let storageInput = document.createElement("input");
        storageInput.className = "hidden";
        storageInput.value = JSON.stringify(leftDot);
        dotDivLeft.appendChild(storageInput);
        footballFieldLine.appendChild(dotDivLeft);
      }
      /////////////////////////////////////////////// CENTER DOT ///////////////////////////////////////////////////////
      if (j > 0 && j < width) {
        const dotDivCenter = document.createElement("div");
        let centerDot = new Dot(false, false, false, false, true, cntL, cntW,
          true, true, true, true, true, true, true, true
        );

        if (cntL === 0) {
          centerDot.isEdge = true;
          centerDot.left = false;
          centerDot.topLeft = false;
          centerDot.top = false;
          centerDot.topRight = false;
          centerDot.right = false;
        }
        if (cntL === lines) {
          centerDot.isEdge = true;
          centerDot.left = false;
          centerDot.bottomLeft = false;
          centerDot.bottom = false;
          centerDot.bottomRight = false;
          centerDot.right = false;
        }
        setGoalDots(lines, centerDot);
        if (cntL === 0 && cntW === 1 || cntL === 0 && cntW === (width - 1) ||
          cntL === lines && cntW === 1 || cntL === lines && cntW === (width - 1)) {
          centerDot.isNextToCorner = true;
        }
        dotDivCenter.classList.add("dot-div", `id-${cntL}${cntW}`);
        let storageInput = document.createElement("input");
        storageInput.className = "hidden";
        storageInput.value = JSON.stringify(centerDot);
        dotDivCenter.appendChild(storageInput);
        if (cntL === (lines / 2) && cntW === (width / 2)) {
          dotDivCenter.classList.add("dot-div-current");
          currentDotId = dotDivCenter.classList[1].split("-")[1];
          currentDotElement = dotDivCenter;
          previousDotElement = dotDivCenter;
          let disabledStartDot = JSON.parse(currentDotElement.querySelector("input").value);
          disabledStartDot.isEnabled = false;
          previousDotElement.querySelector("input").value = JSON.stringify(disabledStartDot);
        }
        footballFieldLine.appendChild(dotDivCenter);
      }

      /////////////////////////////////////////////// HORIZONTAL LINE //////////////////////////////////////////////////
      const horizontalLineDiv = document.createElement("div");
      horizontalLineDiv.classList.add("horizontal-line-div-hidden", `id-${cntL}${cntW}${cntL}${cntW + 1}`, `id-${cntL}${cntW + 1}${cntL}${cntW}`);
      footballFieldLine.appendChild(horizontalLineDiv);
      if(cntL === 0 && cntW !== 3 && cntW !== 4 || cntL === lines && cntW !== 3 && cntW !== 4){
        horizontalLineDiv.style.backgroundColor = "rgb(83, 154, 87)";
      }
      ///////////////////////////////////////////////// RIGHT DOT //////////////////////////////////////////////////////
      if (j === (width - 1)) {
        cntW++
        const dotDivRight = document.createElement("div");
        let rightDot = new Dot(false, false, false, true, true, cntL, cntW,
          false, false, false, false, false, true, true, true
        );

        if (cntL === 0 && cntW === width || cntL === lines && cntW === width) {
          rightDot.bottomLeft = false;
          rightDot.left = false;
          rightDot.topLeft = false;
        }
        if (cntL === 1 && cntW === width || cntL === (lines - 1) && cntW === width) {
          rightDot.isNextToCorner = true;
        }
        if(cntL === 0 && cntW === width || cntL === lines && cntW === width){
          rightDot.isCorner = true;
        }
        dotDivRight.classList.add("dot-div", `id-${cntL}${width}`);
        let storageInput = document.createElement("input");
        storageInput.className = "hidden";
        storageInput.value = JSON.stringify(rightDot);
        dotDivRight.appendChild(storageInput);
        footballFieldLine.appendChild(dotDivRight);
      }
      cntW++;
    }
    cntW = 0;
    ///////////////////////////////////////// VERTICAL & DIAGONAL LINES/////////////////////////////////////////////////
    if (i < lines) {
      const diagonalDivContainer = document.createElement("div");
      diagonalDivContainer.className = "diagonal-div-container";
      for (let i = 0; i < width; i++) {
        const verticalLineDiv = document.createElement("div");
        verticalLineDiv.classList.add("vertical-line-div-hidden", `id-${cntL}${cntW}${cntL + 1}${cntW}`, `id-${cntL + 1}${cntW}${cntL}${cntW}`);
        diagonalDivContainer.appendChild(verticalLineDiv);
        if (i < width) {
          const diagonalDiv = document.createElement("div");
          diagonalDiv.className = "diagonal-div";
          const lineDivDiagonalTB = document.createElement("div");
          lineDivDiagonalTB.classList.add("line-div-diagonal-tb-hidden", `id-${cntL}${cntW}${cntL + 1}${cntW + 1}`, `id-${cntL + 1}${cntW + 1}${cntL}${cntW}`);
          const lineDivDiagonalBT = document.createElement("div");
          lineDivDiagonalBT.classList.add("line-div-diagonal-bt-hidden", `id-${cntL + 1}${cntW}${cntL}${cntW + 1}`, `id-${cntL}${cntW + 1}${cntL + 1}${cntW}`);
          diagonalDiv.appendChild(lineDivDiagonalTB);
          diagonalDiv.appendChild(lineDivDiagonalBT);
          diagonalDivContainer.appendChild(diagonalDiv);
        }
        if (i === width - 1) {
          const verticalLineDiv = document.createElement("div");
          verticalLineDiv.classList.add("vertical-line-div-hidden", `id-${cntL}${cntW + 1}${cntL + 1}${cntW + 1}`, `id-${cntL + 1}${cntW + 1}${cntL}${cntW + 1}`);
          diagonalDivContainer.appendChild(verticalLineDiv);
          diagonalDivContainer.appendChild(verticalLineDiv);
          verticalLineDiv.style.backgroundColor = "rgb(83, 154, 87)";
        }
        if(i === 0){
          verticalLineDiv.style.backgroundColor = "rgb(83, 154, 87)";
        }
        cntW++;
      }
      footballFieldLine.appendChild(diagonalDivContainer);
    }
    footballField.appendChild(footballFieldLine);
    cntL++;
    cntW = 0;
  }
  createGoalGateDivContainerAndGoalGateDiv(cntL);
}


//////////////////////////////////////////////// FOOTBALL LOGIC ////////////////////////////////////////////////////////

let hasTheMatchStarted = false;
const goalGateHome = document.querySelector(".goal-gate-div-home");
const goalGateAway = document.querySelector(".goal-gate-div-away");
const dot = document.querySelectorAll(".dot-div");
const settingsContainerDiv = document.querySelector(".settings-container-div");
const teamNameInputs = document.querySelectorAll(".team-name-input");
const homeTeamContainerDiv = document.querySelector(".home-team-container-div");
const awayTeamContainerDiv = document.querySelector(".away-team-container-div");
const settingsTimerInput = document.querySelector(".settings-timer-input");
const backwardCheckbox = document.querySelector(".allow-backward-checkbox");
const turnInfoCheckbox = document.querySelector(".current-player-info-checkbox");
const moveBackwardsBtn = document.querySelector(".move-backwards-btn");
const startTheMatchBtn = document.querySelector(".start-the-match-btn");
let teamTimerInterval;
let homeTeamName = "";
let awayTeamName = "";
let moveCounter = 0;
let moveArray = [];
let moveBackwardCounter = 0;
let currentTeam = document.querySelector(".home-team-container-div");
let previousTeam = document.querySelector(".away-team-container-div");

startTheMatchBtn.addEventListener("click", startTheMatch);
goalGateHome.addEventListener("click", setGoal);
goalGateAway.addEventListener("click", setGoal);
dot.forEach(el => el.addEventListener("click", setMove));

teamNameInputs[0].addEventListener("change", function () {
  homeTeamName = homeTeamContainerDiv.querySelector(".team-name-input").value;
});

teamNameInputs[1].addEventListener("change", function () {
  awayTeamName = awayTeamContainerDiv.querySelector(".team-name-input").value;
});

moveBackwardsBtn.addEventListener("click", function (){
  if (moveBackwardCounter > 0){
    moveBackwards();
    moveBackwardCounter--;
  }
});

function startTheMatch() {
  if (homeTeamName.length === 0 || awayTeamName.length === 0){
    window.alert("ENTER THE NAMES OF THE TEAMS");
  } else if (+settingsTimerInput.value > 90) {
    window.alert("MAX TIME DURATION IS 90 MINUTES");
  } else if (+settingsTimerInput.value < 1) {
    window.alert("MIN TIME DURATION MUST BE SET FOR 1 MINUTE");
  } else {
    homeTeamContainerDiv.querySelector(".team-score").innerText = 0;
    awayTeamContainerDiv.querySelector(".team-score").innerText = 0;
    setHomeAndAwayTimersValues(settingsTimerInput);
    settingsContainerDiv.classList.add("hidden");
    setCurrentTeamColors(currentTeam,previousTeam);
    if (backwardCheckbox.checked) {
      moveBackwardsBtn.classList.remove("hidden");
    }
    teamNameInputs[0].readOnly = true;
    teamNameInputs[1].readOnly = true;
    hasTheMatchStarted = true;
  }
}

function setMove() {
  if(hasTheMatchStarted) {
    nextDotElement = this;
    let isNotEdgeMoveOrIsNextToCorner = checkIfCurrentAndNextDotIsEdgeOrNextToCorner(currentDotElement, nextDotElement);
    const clickedDotId = +this.classList[1].split("-")[1];
    let moveIndex = checkIfMoveIsAvailable(clickedDotId, currentDotElement)[0];
    let isMoveInRange = checkIfMoveIsAvailable(clickedDotId, currentDotElement)[1];
    let isMoveAvailable = checkIfMoveIsAvailable(clickedDotId, currentDotElement)[2];
    let currentDotInputBefore = JSON.parse(currentDotElement.querySelector("input").value);
    let nextDotInputBefore = JSON.parse(nextDotElement.querySelector("input").value);
    if (nextDotInputBefore.isEnabled === true && isMoveInRange && isNotEdgeMoveOrIsNextToCorner && isMoveAvailable) {
      console.log("MOVE SET");
      if (currentTeam !== previousTeam) {
        clearInterval(teamTimerInterval)
        teamTimerInterval = setInterval(function () {
          updateTeamTimer(currentTeam);
        }, 1000);
      }
      displayMoveLine(currentDotElement, nextDotElement, previousDotElement);
      moveArray.push([
        previousDotElement,
        JSON.parse(previousDotElement.querySelector("input").value),
        currentDotElement,
        JSON.parse(currentDotElement.querySelector("input").value),
        nextDotElement,
        JSON.parse(nextDotElement.querySelector("input").value),
        moveLineElementId
      ]);
      setBeginningPreviousAndCurrentDotElement(moveCounter);
      currentDotId = this.classList[1].split("-")[1];
      currentDotElement = this;
      nextDotInputBefore.isEnabled = false;
      let previousDotElementBefore = JSON.parse(previousDotElement.querySelector("input").value);
      setDotValues(moveIndex, currentDotInputBefore, currentDotElement, nextDotInputBefore, nextDotElement, previousDotElementBefore, previousDotElement);
      checkCurrentMoveStatus(currentDotElement, moveCounter);
      setForwardMoveColors(currentDotElement, previousDotElement);
      if (currentTeam !== previousTeam) {
        setCurrentTeamColors(currentTeam,previousTeam);
        if (turnInfoCheckbox.checked){
            setTimeout(function (){window.alert(`CURRENT PLAYER: "${currentTeam.querySelector("input").value}"`);},25)
        }
      }
      moveCounter++;
    } else {
      console.log("NOT AVAILABLE");
    }
  } else {
    window.alert("PRESS THE START BUTTON")
  }
}

function setGoal() {
  const goalDot = JSON.parse(currentDotElement.querySelector("input").value);
  if (goalDot.isGoal) {
    const goalDot = JSON.parse(currentDotElement.querySelector("input").value);
    updatePoints(currentTeam, moveCounter, "goal");
    currentDotElement.classList.remove("dot-div-previous");
    currentDotElement.classList.remove("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
    previousDotElement.classList.remove("dot-div-current");
    const currentTeamName = currentTeam.classList[0].split("-")[0];
    setCurrentTeamColors(currentTeam, previousTeam);
    if(goalDot.line === 0 && currentTeamName === "home" || goalDot.line === 0 && currentTeamName === "away"){
      currentTeam = homeTeamContainerDiv;
      previousTeam = awayTeamContainerDiv;
    }
    if(goalDot.line !== 0 && currentTeamName === "home" || goalDot.line !== 0 && currentTeamName === "away"){
      currentTeam = awayTeamContainerDiv;
      previousTeam = homeTeamContainerDiv;
    }
    setCurrentTeamColors(currentTeam,previousTeam);
  }
}

function setCurrentTeamColors(currentTeam, previousTeam){
  if (currentTeam.classList[0] === "home-team-container-div"){
    currentTeam.querySelector(".team-name-input").style.backgroundColor = "rgb(63, 122, 179)";
    previousTeam.querySelector(".team-name-input").style.backgroundColor = "rgb(230, 230, 230)";
  } else if ((currentTeam.classList[0] === "away-team-container-div")){
    previousTeam.querySelector(".team-name-input").style.backgroundColor = "rgb(230, 230, 230)";
    currentTeam.querySelector(".team-name-input").style.backgroundColor = "rgb(179, 63, 64)";
  }
}

function moveBackwards() {
  try {
    let lastMove = moveArray[moveArray.length - 1];
    let movePreviousDotElement = lastMove[0];
    let movePreviousDotElementValue = lastMove[1];
    let moveCurrentDotElement = lastMove[2];
    let moveCurrentDotElementValue = lastMove[3];
    let moveNextDotElement = lastMove[4];
    let moveNextDotElementValue = lastMove[5];
    setBackwardMoveColors(currentDotElement, previousDotElement);
    let moveLineElementVisibleClass = document.getElementsByClassName(lastMove[6])[0].classList[3];
    document.getElementsByClassName(lastMove[6])[0].classList.remove(moveLineElementVisibleClass);
    currentDotElement = moveCurrentDotElement;
    currentDotElement.querySelector("input").value = JSON.stringify(moveCurrentDotElementValue);
    currentDotId = currentDotElement.classList[1].split("-")[1];
    previousDotElement = movePreviousDotElement;
    previousDotElement.querySelector("input").value = JSON.stringify(movePreviousDotElementValue);
    moveNextDotElement.querySelector("input").value = JSON.stringify(moveNextDotElementValue);
    moveArray.pop();
    moveCounter--;
  } catch (e) {
    console.log("TOO MUCH");
  }
}

function setBackwardMoveColors(currentDotElement, previousDotElement) {
  const currentDot = JSON.parse(currentDotElement.querySelector("input").value);
  let availableMoves = checkNumberOfMoves(currentDotElement);
  if (currentDot.isEdge === false && currentDot.isNextToCorner === false && currentDot.isGoal === false && availableMoves === 6){
    currentDotElement.classList.remove("dot-div-current");
    currentDotElement.classList.add("dot-div-previous");
    previousDotElement.classList.add("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
  }
  if (currentDot.isEdge === false && currentDot.isNextToCorner === false && currentDot.isGoal === false && availableMoves < 6){
    currentDotElement.classList.remove("dot-div-current");
    currentDotElement.classList.add("dot-div-previous");
    previousDotElement.classList.add("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
  }
  if (currentDot.isEdge === true && availableMoves === 2){
    currentDotElement.classList.remove("dot-div-current");
    previousDotElement.classList.add("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
  }
  if (currentDot.isGoal === true && availableMoves === 4 || currentDot.isGoal === true && availableMoves === 5){
    currentDotElement.classList.remove("dot-div-current");
    previousDotElement.classList.add("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
  }
  if (currentDot.isGoal === true && availableMoves <= 3){
    currentDotElement.classList.remove("dot-div-current");
    currentDotElement.classList.add("dot-div-previous");
    previousDotElement.classList.add("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
  }
  if(availableMoves === 7 || currentDot.isCorner === true){
    currentDotElement.classList.remove("dot-div-current");
    currentDotElement.classList.remove("dot-div-previous");
    previousDotElement.classList.add("dot-div-current");
    previousDotElement.classList.remove("dot-div-previous");
  }
}

function setForwardMoveColors(currentDotElement, previousDotElement){
  let availableMoves = checkNumberOfMoves(currentDotElement);
  if (availableMoves === 7){
    currentDotElement.classList.add("dot-div-current");
    previousDotElement.classList.add("dot-div-previous");
  }
  if (availableMoves < 7){
    currentDotElement.classList.add("dot-div-current");
    currentDotElement.classList.remove("dot-div-previous");
    previousDotElement.classList.add("dot-div-previous");
  }
}

function checkNumberOfMoves(currentDotElement){
  let availableMoves = 8;
  const currentDot = JSON.parse(currentDotElement.querySelector("input").value);
  for (const [key, value] of Object.entries(currentDot)) {
    if (key !== 'isEnabled' && key !== 'isEdge' && key !== 'isNextToCorner' && key !== 'isCorner' && key !== 'isGoal' && value === false) {
      availableMoves--;
    }
  }
  return availableMoves;
}

function checkCurrentMoveStatus(currentDotElement, moveCounter) {
  let availableMoves = 8;
  const currentDot = JSON.parse(currentDotElement.querySelector("input").value);
  for (const [key, value] of Object.entries(currentDot)) {
    if (key !== 'isEnabled' && key !== 'isEdge' && key !== 'isNextToCorner' && key !== 'isCorner' && key !== 'isGoal' && value === false) {
      availableMoves--;
    }
  }
  if (currentDot.isGoal === true && availableMoves === 5) {
    availableMoves = 7;
  }
  if (availableMoves === 0) {
    updatePoints(currentTeam, moveCounter, "move");
  }
  if (currentTeam.getAttribute("class") === "home-team-container-div" && availableMoves < 7) {
    moveBackwardCounter++;
    previousTeam = document.querySelector(".home-team-container-div");
  }
  if (currentTeam.getAttribute("class") === "away-team-container-div" && availableMoves < 7) {
    moveBackwardCounter++;
    previousTeam = document.querySelector(".away-team-container-div");
  }
  if (currentTeam.getAttribute("class") === "home-team-container-div" && availableMoves === 7) {
    moveBackwardCounter = 0;
    previousTeam = document.querySelector(".home-team-container-div");
    currentTeam = document.querySelector(".away-team-container-div");
  } else if (currentTeam.getAttribute("class") === "away-team-container-div" && availableMoves === 7) {
    moveBackwardCounter = 0;
    previousTeam = document.querySelector(".away-team-container-div");
    currentTeam = document.querySelector(".home-team-container-div");
  }
}

function setHomeAndAwayTimersValues(settingsTimerInput) {
  let min = +settingsTimerInput.value;
  document.querySelectorAll(".timer-min").forEach(el => el.innerText = min / 2);
  document.querySelectorAll(".timer-sec").forEach(el => el.innerText = "00");
  if (min % 2 !== 0) {
    document.querySelectorAll(".timer-min").forEach(el => el.innerText = Math.floor(min / 2));
    document.querySelectorAll(".timer-sec").forEach(el => el.innerText = "30");
  }
}

function checkWhoWonTheMatch(homeTeam, awayTeam){
  clearInterval(teamTimerInterval);
  const homeTeamScore = homeTeam.querySelector(".team-score").innerText;
  const awayTeamScore = awayTeam.querySelector(".team-score").innerText;

  if(homeTeamScore > awayTeamScore){
    window.alert(`TIME IS UP! ${homeTeamName} WINS THE MATCH`);
  }
  if(homeTeamScore < awayTeamScore){
    window.alert(`TIME IS UP! ${awayTeamName} WINS THE MATCH`);
  }
  if (homeTeamScore === awayTeamScore){
    window.alert("TIME IS UP! THE MATCH ENDS IN A DRAW");
  }
  for (let i = moveCounter; i > 0; i--) {
    moveBackwards();
  }
  settingsContainerDiv.classList.remove("hidden");
  hasTheMatchStarted = false;
  teamNameInputs[0].readOnly = false;
  teamNameInputs[1].readOnly = false;
  teamNameInputs[0].value = "";
  teamNameInputs[1].value = "";
  teamNameInputs[0].removeAttribute("style");
  teamNameInputs[1].removeAttribute("style");
  homeTeamName = "";
  awayTeamName = "";
  moveBackwardsBtn.classList.add("hidden");

}

function updateTeamTimer(currentTeam) {
  let min = +currentTeam.querySelector(".timer-min").innerText;
  let sec = +currentTeam.querySelector(".timer-sec").innerText;
  if (min === 0 && sec === 0) {
    checkWhoWonTheMatch(homeTeamContainerDiv, awayTeamContainerDiv);
  } else {
    if (sec === 0) {
      currentTeam.querySelector(".timer-sec").innerText = "59";
      currentTeam.querySelector(".timer-min").innerText = min - 1;
    } else if (sec === 1) {
      currentTeam.querySelector(".timer-sec").innerText = "00";
    } else if (sec <= 10) {
      sec -= 1;
      currentTeam.querySelector(".timer-sec").innerText = "0" + sec;
    } else {
      currentTeam.querySelector(".timer-sec").innerText = sec - 1;
    }
  }
}

function addPoint(scoringTeam) {
  let currentPoints = +scoringTeam.querySelector(".team-score").innerText;
  currentPoints += 1;
  scoringTeam.querySelector(".team-score").innerText = currentPoints;
}

function updatePoints(currentTeam, moveCounter, cause) {
  clearInterval(teamTimerInterval);
  setTimeout(function () {
    if (cause === 'move') {
      moveCounter++;
      window.alert("NO MOVE AVAILABLE, THE RIVAL TEAM SCORES A POINT");
      if (currentTeam.getAttribute("class") === "away-team-container-div") {
        addPoint(homeTeamContainerDiv);
      } else {
        addPoint(awayTeamContainerDiv);
      }
    }
    if (cause === 'goal') {
      let currentDotLine = JSON.parse(currentDotElement.querySelector("input").value).line;
      if (currentTeam.getAttribute("class") === "away-team-container-div") {
        if (currentDotLine > 0) {
          window.alert("WELL DONE - AN OWN GOAL! THE RIVAL TEAM SCORES A POINT");
          addPoint(homeTeamContainerDiv);
        } else {
          window.alert("GOAL! YOUR TEAM SCORES A POINT");
          addPoint(awayTeamContainerDiv);
        }
      } else {
        if (currentDotLine === 0) {
          window.alert("WELL DONE! IT'S AN OWN GOAL! THE RIVAL TEAM SCORES A POINT");
          addPoint(awayTeamContainerDiv);
        } else {
          window.alert("GOAL! YOUR TEAM SCORES A POINT");
          addPoint(homeTeamContainerDiv);
        }
      }
    }
    for (let i = moveCounter; i > 0; i--) {
      moveBackwards();
    }
  }, 50);
}

function setGoalDots(lines, dot) {
  if (dot.line === 0 && dot.number === 3) {
    dot.isGoal = true;
    dot.right = true;
    dot.top = true;
  }
  if (dot.line === 0 && dot.number === 4) {
    dot.isEdge = false;
    dot.isGoal = true;
    dot.right = true;
    dot.left = true;
    dot.top = true;
  }
  if (dot.line === 0 && dot.number === 5) {
    dot.isGoal = true;
    dot.left = true;
    dot.top = true;
  }
  if (dot.line === lines && dot.number === 3) {
    dot.isGoal = true;
    dot.right = true;
    dot.bottom = true;
  }
  if (dot.line === lines && dot.number === 4) {
    dot.isEdge = false
    dot.isGoal = true;
    dot.right = true;
    dot.left = true;
    dot.bottom = true;
  }
  if (dot.line === lines && dot.number === 5) {
    dot.isGoal = true;
    dot.left = true;
    dot.bottom = true;
  }
}

function checkIfCurrentAndNextDotIsEdgeOrNextToCorner(currentDotElement, nextDotElement) {
  const isCurrentDotEdge = JSON.parse(currentDotElement.querySelector("input").value).isEdge;
  const isCurrentDotNextToCorner = JSON.parse(currentDotElement.querySelector("input").value).isNextToCorner;
  const isNextDotEdge = JSON.parse(nextDotElement.querySelector("input").value).isEdge;
  const isNextDotNextToCorner = JSON.parse(nextDotElement.querySelector("input").value).isNextToCorner;
  return !isCurrentDotEdge && !isNextDotEdge || !isCurrentDotEdge && isNextDotEdge ||
    isCurrentDotEdge && !isNextDotEdge || isCurrentDotNextToCorner && isNextDotNextToCorner;
}

function checkIfMoveIsAvailable(clickedDotId, currentDotElement) {
  let arrayOfMoves = [
    [+currentDotId - 11, JSON.parse(currentDotElement.querySelector("input").value).topLeft === true],
    [+currentDotId - 10, JSON.parse(currentDotElement.querySelector("input").value).top === true],
    [+currentDotId - 9, JSON.parse(currentDotElement.querySelector("input").value).topRight === true],
    [+currentDotId - 1, JSON.parse(currentDotElement.querySelector("input").value).left === true],
    [+currentDotId + 1, JSON.parse(currentDotElement.querySelector("input").value).right === true],
    [+currentDotId + 9, JSON.parse(currentDotElement.querySelector("input").value).bottomLeft === true],
    [+currentDotId + 10, JSON.parse(currentDotElement.querySelector("input").value).bottom === true],
    [+currentDotId + 11, JSON.parse(currentDotElement.querySelector("input").value).bottomRight === true]
  ];
  let moveIndex;
  let isMoveInRange = false;
  let isMoveAvailable = false;
  for (let i = 0; i < arrayOfMoves.length; i++) {
    if (clickedDotId === arrayOfMoves[i][0]) {
      moveIndex = i;
      isMoveInRange = true;
      isMoveAvailable = arrayOfMoves[i][1];
    }
  }
  return [moveIndex, isMoveInRange, isMoveAvailable];
}

function displayMoveLine(currentDotElement, nextDotElement) {
  let currentDotIdClass = currentDotElement.classList[1].split("-")[1];
  let nextDotIdClass = nextDotElement.classList[1].split("-")[1];
  let lineId = `id-${currentDotIdClass}${nextDotIdClass}`;
  let elementClassName = document.getElementsByClassName(lineId)[0].classList[0];
  document.getElementsByClassName(lineId)[0].classList.add(elementClassName.replace("-hidden", ""));
  moveLineElementId = lineId;
}

function setBeginningPreviousAndCurrentDotElement(moveCounter) {
  if (moveCounter > 0) {
    let previousDotElementBefore = JSON.parse(previousDotElement.querySelector("input").value);
    previousDotElementBefore.isEnabled = true;
    previousDotElement.querySelector("input").value = JSON.stringify(previousDotElementBefore);
    previousDotElement = currentDotElement;
  }
}

function setDotValues(moveIndex, currentDotInputBefore, currentDotElement, nextDotInputBefore, nextDotElement,
                      previousDotElementBefore, previousDotElement
) {
  switch (moveIndex) {
    case 0 :
      currentDotInputBefore.topLeft = false;
      nextDotInputBefore.bottomRight = false;
      previousDotElementBefore.topLeft = false;
      break;
    case 1 :
      currentDotInputBefore.top = false;
      nextDotInputBefore.bottom = false;
      previousDotElementBefore.top = false;
      break;
    case 2 :
      currentDotInputBefore.topRight = false;
      nextDotInputBefore.bottomLeft = false;
      previousDotElementBefore.topRight = false;
      break;
    case 3 :
      currentDotInputBefore.left = false;
      nextDotInputBefore.right = false;
      previousDotElementBefore.left = false;
      break;
    case 4 :
      currentDotInputBefore.right = false;
      nextDotInputBefore.left = false;
      previousDotElementBefore.right = false;
      break;
    case 5 :
      currentDotInputBefore.bottomLeft = false;
      nextDotInputBefore.topRight = false;
      previousDotElementBefore.bottomLeft = false;
      break;
    case 6 :
      currentDotInputBefore.bottom = false;
      nextDotInputBefore.top = false;
      previousDotElementBefore.bottom = false;
      break;
    case 7 :
      currentDotInputBefore.bottomRight = false;
      nextDotInputBefore.topLeft = false;
      previousDotElementBefore.bottomRight = false;
      break;
    default :
      console.log("SWITCH DEFAULT");
  }
  currentDotInputBefore.isEnabled = false;
  currentDotElement.querySelector("input").value = JSON.stringify(currentDotInputBefore);
  nextDotElement.querySelector("input").value = JSON.stringify(nextDotInputBefore);
  previousDotElement.querySelector("input").value = JSON.stringify(previousDotElementBefore);
}





















