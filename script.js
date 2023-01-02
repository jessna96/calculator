import {add, subtract, multiply, divide} from "./node_modules/ramda/es/index.js";
import {always} from "./node_modules/ramda/es/index.js";

const operatorToFunction = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '/': divide
}

const calcState = {
    firstNr: null,
    secondNr: null,
    operator: null,
    result: null
};

const calcStateToDisplayText = () => `${calcState.result ?? ((calcState.secondNr ?? calcState.firstNr) ?? '0')}`;

const onclickNumber = (symbol) => {
    return () => {
        calcState.result = null;
        !calcState.operator ?
            (calcState.firstNr ? calcState.firstNr += symbol : calcState.firstNr = symbol) :
            (calcState.secondNr ? calcState.secondNr += symbol : calcState.secondNr = symbol);
        renderDisplay();
    }
}


const onclickOperator = (symbol) => {
    return () => {
        if (clickableCondOperator()) {
            if (calcState.result) {
                calcState.firstNr = calcState.result;
            }
            calcState.operator = symbol;
            calcState.result = null;
            renderDisplay();
        }
    }
}

const clickableCondOperator = () => {
    return (calcState.firstNr || calcState.result) && !calcState.operator;
}

const onclickEqual = () => {
    return () => {
        if (clickableCondEqual()) {
            calcState.result = calc(calcState.operator, calcState.firstNr, calcState.secondNr);
        }
        calcState.firstNr = null;
        calcState.secondNr = null;
        calcState.operator = null;
        renderDisplay();
    }
}

const clickableCondEqual = () => {
    return calcState.firstNr !== '' && calcState.secondNr !== '';
}

const onclickClear = () => {
    return () => {
        calcState.firstNr = null;
        calcState.secondNr = null;
        calcState.operator = null;
        calcState.result = null;
        renderDisplay();
    }
}

const calculatorButtons = [
    {
        content: '',
        id: 'btn_',
        class: 'number',
        onClick: always,
    },
    {
        content: '0',
        id: 'btn_0',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '',
        id: 'btn_',
        class: 'number',
        onClick: always,
    },
    {
        content: '1',
        id: 'btn_1',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '2',
        id: 'btn_2',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '3',
        id: 'btn_3',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '4',
        id: 'btn_4',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '5',
        id: 'btn_5',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '6',
        id: 'btn_6',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '7',
        id: 'btn_7',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '8',
        id: 'btn_8',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '9',
        id: 'btn_9',
        class: 'number',
        onClick: onclickNumber,
    },
    {
        content: '+',
        id: 'btn_+',
        class: 'operator',
        onClick: onclickOperator,
    },
    {
        content: '-',
        id: 'btn_-',
        class: 'operator',
        onClick: onclickOperator,
    },
    {
        content: 'x',
        id: 'btn_x',
        class: 'operator',
        onClick: onclickOperator,
    },
    {
        content: '/',
        id: 'btn_/',
        class: 'operator',
        onClick: onclickOperator,

    },
    {
        content: '=',
        id: 'btn_=',
        class: 'operator',
        onClick: onclickEqual,
    },
    {
        content: 'C',
        id: 'btn_C',
        class: 'extras',
        onClick: onclickClear,
    },
    {
        content: '',
        id: 'btn_',
        class: 'extras',
        onClick: always,
    },
    {
        content: '',
        id: 'btn_',
        class: 'extras',
        onClick: always,
    },
]

const calcButtonOperators = calculatorButtons.filter(item => item.class.includes('operator'));
const calcButtonNumbers = calculatorButtons.filter(item => item.class.includes('number'));
const calcButtonExtras = calculatorButtons.filter(item => item.class.includes('extras'));

const calc = (operator, nr1, nr2) => operatorToFunction[operator](nr1, nr2);

const renderDisplay = () => document.querySelector('.calc_display').innerHTML = calcStateToDisplayText();

const render = () => {
    document.querySelector('#app').innerHTML = getHTML();
    const buttons = document.querySelectorAll('.calc_btn');
    buttons.forEach((btn) => {
        const selectedBtn = calculatorButtons.find((item) => item.id === btn.id);
        btn.addEventListener('click', selectedBtn.onClick(selectedBtn.content));
        // btn.addEventListener('click', (event) => {
        //     const selectedBtn = calculatorButtons.find((item) => item.id === btn.id);
        //     selectedBtn.onClick(selectedBtn.content);
        // });
    });
}

const calcDisplay = () => `<div class="calc_display"><div class="calc_display_result">0</div></div>`;
const singleBtnHtml = (content, btnClass) => `<button id="btn_${content}" class="calc_btn ${btnClass}"><div class="calc_btn_content">${content}</div></button>`;

const btnListToHtml = (btnList, btnClass) => {
    return btnList.map((btnContent) => `${singleBtnHtml(btnContent.content, btnClass, btnContent.onClick)}`).join('');
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

const calcButtons = () => `<div class="calc_button_container">${btnNrsExtras()}${btnOperators()}</div>`;

const calcBody = () => `<div class="calc_body">
            ${calcDisplay()}
            ${calcButtons()}
            </div`;

const getHTML = () => {
    return `<div id="container">
            ${calcBody()}
        </div>`
}

render();