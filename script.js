import {add, subtract, multiply, divide} from "./node_modules/ramda/es/index.js";
import {range, map} from "./node_modules/ramda/es/index.js";


const operatorToWord = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
}

const calc = (operator, nr1, nr2) => {
    return operatorToWord[operator](nr1, nr2);
}

const render = () => {
    document.querySelector('#app').innerHTML = getHTML();
}

const calc_display = () => `<div class="calc_display">result</div>`;
const calc_buttons = () => {
    const buttonList = map((item) => {
        const content = item === 10 ? 'clear' :
                        (item === 11 ? 0 :
                        (item === 12 ? '=' : item));
        return `<div class="calc_btn">${content}</div>`
    }, range(1, 13));
    return `<div class="calc_button_container">${buttonList.join('')}</div>`;
}

const calcBody = () => `<div class="calc_body">
            ${calc_display()}
            ${calc_buttons()}
            </div`;

const getHTML = () => {
    return `<div id="container">
            ${calcBody()}
        </div>`
}

render();