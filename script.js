let randomNumber = 0;
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", play);
const userNumber = document.getElementById("user-input");
userNumber.addEventListener("click", ()=>{userNumber.value = "";});
const resultArea = document.getElementById("result-area");
const ticket = document.getElementById("ticket");
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", reset);
const answer = document.getElementById("answer");
const historyArea = document.getElementById("history");
const ticketArea = document.querySelectorAll(".box");
let remainingTicket = 3;
let history = [];

// css관련
let resultImg = document.querySelector(".result-img");

// 랜덤 숫자 생성
function randomNum(){
  randomNumber = Math.floor(Math.random()*100)+1;
  console.log(randomNumber);
  answer.textContent = `뽑힌 숫자 : ${randomNumber}`;
}
randomNum();

// 실행
function play(){
  const userValue = userNumber.value;

  // 유효성 검사
  if(userValue>100 || userValue<1){
    resultImg.src = "./src/sign_warning.png";
    resultArea.textContent = "1~100사이 숫자를 입력하세요";
    return;
  }
  if(history.includes(userValue)){
    resultImg.src = "./src/sign_warning.png";
    resultArea.textContent = "중복 숫자입니다.. 바보입니까??"
    return;
  }
  
  remainingTicket--;
  ticket.textContent = `남은 티켓 : ${remainingTicket}`;
  history.push(userValue);
  historyArea.textContent = `도전한 숫자 : ${history}`;

  // 티켓 효과
  ticketArea[remainingTicket].classList.add("hidden");

  // 메인 로직
  if(userValue>randomNumber){
    resultImg.src = "./src/sign_Arrow_down.png";
    resultArea.textContent = "DOWN!! 다시 도전하세요!!";
  }else if(userValue<randomNumber){
    resultImg.src = "./src/sign_Arrow.png";
    resultArea.textContent = "UP!! 다시 도전하세요!!";
  }else{
    resultImg.src = "./src/result_trip.png";
    resultArea.textContent = "축하드립니다!! 당첨 입니다!!";
    submitButton.disabled = true;
    submitButton.classList.add('btn-disabled');
    document.body.style.backgroundImage = "linear-gradient(rgba(160, 160, 160, 0.486), rgba(0, 0, 0, 0.548)), url('./src/bg_result_travel.jpg')";
    return;
  }

  // 게임 오버
  if(remainingTicket<1){
    resultImg.src = "./src/result_study.png";
    resultArea.textContent = "실패!! 일이나 하자...";
    submitButton.disabled = true;
    submitButton.classList.add('btn-disabled');
    document.body.style.backgroundImage = "linear-gradient(rgba(160, 160, 160, 0.486), rgba(0, 0, 0, 0.548)), url('./src/bg_result_working.jpg')";
  }
}

// 리셋
function reset(){
  randomNum();
  submitButton.disabled = false;
  resultImg.src = "./src/start_game.png";
  submitButton.classList.remove('btn-disabled');
  resultArea.textContent = "복권 제출 해서 결과를 확인하세요";
  userNumber.value = "";
  history = [];
  historyArea.textContent = ``;
  remainingTicket = 3;
  ticket.textContent = `남은 티켓 : ${remainingTicket}`;
  document.body.style.backgroundImage = "linear-gradient(rgba(160, 160, 160, 0.486), rgba(0, 0, 0, 0.548)), url('./src/bg_start_game.jpg')";
  for (let i=0; i<3; i++) ticketArea[i].classList.remove('hidden');
}