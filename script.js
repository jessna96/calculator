import {add, subtract, multiply, divide} from "./node_modules/ramda/es/index.js";
import {range, map} from "./node_modules/ramda/es/index.js";

const calcButtonContents = [['C', ' ', ' ', '/'], ['7', '8', '9', 'x'], ['4', '5', '6', '-'], ['1', '2', '3', '+'], [' ', '0', ' ', '=']];

const calcButtonOperators = ['/', 'x', '-', '+', '='];
const calcButtonNumbers = [' ', '0', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const calcButtonExtras = ['C', ' ', ' '];

const operatorToFunction = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
}

const calcState = 0;

const calc = (operator, nr1, nr2) => operatorToFunction[operator](nr1, nr2);

const renderDisplay = (input) => {
    document.querySelector('.calc_display').innerHTML = input;
}

const render = () => {
    document.querySelector('#app').innerHTML = getHTML();
}

const calcDisplay = () => `<div class="calc_display"><div class="calc_display_result">result</div></div>`;
const calcButtons = () => {
    const buttonList = map((item) => {
        const content = item === 10 ? 'clear' :
            (item === 11 ? 0 :
                (item === 12 ? '=' : item));
        return `<div class="calc_btn"><div class="calc_btn_content">${content}</div></div>`
    }, range(1, 13));
    return `<div class="calc_button_container">${buttonList.join('')}</div>`;
}

const singleBtnHtml = (content, btnClass) => `<button class="calc_btn ${btnClass}"><div class="calc_btn_content">${content}</div></button>`;

const calcButtons2 = () => {
    const buttonList = calcButtonContents.map((row) =>
        row.map((singleBtnCont) => singleBtnHtml(singleBtnCont)).join(''));
    return `<div class="calc_button_container">${buttonList.join('')}</div>`;
}

const btnListToHtml = (btnList, btnClass) => {
    return btnList.map((btnContent) => `${singleBtnHtml(btnContent, btnClass)}`).join('');
}

const btnOperators = () => {
    return `<div class="btn_operators">${btnListToHtml(calcButtonOperators, 'btn_operator')}</div>`;
}

const btnNrsExtras = () => {
    return `<div class="btn_nrs_extras">
            <div class="btn_extras">${btnListToHtml(calcButtonExtras, 'btn_extras')}</div>
            <div class="btn_nrs">${btnListToHtml(calcButtonNumbers, 'btn_numbers')}</div>
            </div>`;
}

const calcButtons3 = () => `<div class="calc_button_container">${btnNrsExtras()}${btnOperators()}</div>`;


const calcBody = () => `<div class="calc_body">
            ${calcDisplay()}
            ${calcButtons3()}
            </div`;

const getHTML = () => {
    return `<div id="container">
            ${calcBody()}
        </div>`
}

render();