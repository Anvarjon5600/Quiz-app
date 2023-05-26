'use strict'


import { questions } from "./date.js";
let quizContainer = document.querySelector(".questions-container")
let form;
let inputs;
let offset = 0;
let right;
let results = []
let minutContent = document.querySelector('.minut')
let secundContent = document.querySelector('.second')
let min = 5;
let secund = 0;

document.querySelector('.start-btn').addEventListener('click', (e) => {
  e.target.classList.add('none')
  document.querySelector('.test-box').classList.remove('none')
  let start = () => {
    if (min === 0 && secund === 0) {
      clearInterval(intervalId)
      document.querySelector('.test-box').classList.add('none')
      const trues = results.filter(item => item.ans === true).length;
      const falsy = results.filter(item => item.ans === false).length
      if (results.length === 0) resultText.textContent = `Siz savollarga javob bermadiz Hamma savolga javob bering`
      else if (trues === results.length) { resultText.textContent = `Sizda ${trues} togri javob` }
      else if (falsy === results.length) {
        resultText.textContent = `Sizda ${falsy} notogri javob bor
      ` }
      else { resultText.textContent = `Sizda ${trues} togri javob va ${falsy} notogri javob bor` }
      modal.classList.add("modal-top")
      return;
    } else {
      if (secund === 0) {
        --min
        secund = 60
      }
      --secund
    }

    if (min - 1 < 0) {
      minutContent.textContent = `00:`
    } else if (min < 10) {
      minutContent.textContent = `0${min}:`;
    } else minutContent.textContent = min;

    if (min < 0) {
      secundContent.textContent = '00';
    } else if (secund < 10) {
      secundContent.textContent = `0${secund}`;
    } else secundContent.textContent = secund;
  }
  let intervalId = setInterval(start, 1000);
})

questions.map((item, index) => {
  form = `
    <form  class="quiz-form">
    <h1> ${index + 1}-Savol. ${item.question}</h1>
        <label value="${item.variants[0]}" for="${item.name}">
            <input value="${item.variants[0]}" type="radio" name="${item.name}" />
            <span>${item.variants[0]}</span>
        </label>
         <label value="${item.variants[1]}" for="${item.name}">
           <input value="${item.variants[1]}" type="radio" name="${item.name}" />
           <span>${item.variants[1]}</span>
         </label>
         <label value="${item.variants[2]}" for="${item.name}">
           <input value="${item.variants[2]}" type="radio" name="${item.name}" />
           <span>${item.variants[2]}</span>
         </label>
         <label value="${item.variants[3]}" for="${item.name}">
           <input value="${item.variants[3]}" type="radio" name="${item.name}" />
           <span>${item.variants[3]}</span>
         </label>
         <label value="${item.variants[4]}" for="${item.name}">
           <input value="${item.variants[4]}" type="radio" name="${item.name}" />
           <span>${item.variants[4]}</span>
         </label>

    </form >
    `
  quizContainer.insertAdjacentHTML("beforeend", form);
  inputs = document.getElementsByName(`${item.name}`);
  for (let inp of inputs) {
    inp.addEventListener("change", function (e) {
      right = e.target.value === item.rightAnswer
      let obj = { ans: right, id: index + 1 }

      let some = results.some(item => item.id === obj.id)
      if (some) {
        let index = results.findIndex(item => item.id === obj.id)
        results[index] = { ans: right, id: index + 1 }
      } else results.push(obj);
      if (results.length === 10) {
        nextBtn.textContent = 'End'
      }
    })
  }
})

let modal = document.querySelector(".modal")
let resultText = document.querySelector(".result")
let endBtn = document.getElementById("end");

endBtn.addEventListener("click", function () {
  document.querySelector('.test-box').classList.add('none')
  const trues = results.filter(item => item.ans === true).length;
  const falsy = results.filter(item => item.ans === false).length
  if (results.length === 0) resultText.textContent = `Siz savollarga javob bermadiz Hamma savolga javob bering`
  else if (trues === results.length) { resultText.textContent = `Sizda ${trues} togri javob` }
  else if (falsy === results.length) {
    resultText.textContent = `Sizda ${falsy} notogri javob bor
  ` }
  else { resultText.textContent = `Sizda ${trues} togri javob va ${falsy} notogri javob bor` }
  modal.classList.add("modal-top")
})


let xBtn = document.querySelector(".x")
xBtn.addEventListener("click", () => {
  modal.classList.remove("modal-top")
})

let nextBtn = document.querySelector(".next")
let prevBtn = document.querySelector(".prev")

nextBtn.addEventListener("click", function () {
  if (nextBtn.textContent = 'Next') {
    offset += 480
    if (offset > 4320) { offset = 4320 }
    quizContainer.style.left = -offset + "px"
  }
  if (results.length == 10) {
    document.querySelector('.test-box').classList.add('none')
    const trues = results.filter(item => item.ans === true).length;
    const falsy = results.filter(item => item.ans === false).length
    if (results.length === 0) resultText.textContent = `Siz savollarga javob bermadiz Hamma savolga javob bering`
    else if (trues === results.length) { resultText.textContent = `Sizda ${trues} togri javob` }
    else if (falsy === results.length) {
      resultText.textContent = `Sizda ${falsy} notogri javob bor
    ` }
    else { resultText.textContent = `Sizda ${trues} togri javob va ${falsy} notogri javob bor` }
    modal.classList.add("modal-top")
  }
})

prevBtn.addEventListener("click", function () {
  offset -= 480
  if (offset < 0) { offset = 0 }
  quizContainer.style.left = -offset + "px"
})