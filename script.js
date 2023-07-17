// DOM elements

const display1El = document.querySelector('.display1');
const display2El = document.querySelector('.display2');
const tempResultEl = document.querySelector('.temp-display');
const numberEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');


//initail variables 

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false; 

//event listeners

numberEl.forEach( number => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true;
        } else if(e.target.innerText === '.' && haveDot){
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;
    })
});

//dealing with the mathematical operation elements

operationEl.forEach( operation => {
    operation.addEventListener('click', (e) => {
        if(!dis2Num) result;
        haveDot = false;
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation){
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
});

//the clearVar function

function clearVar(name=''){
    dis1Num += dis2Num + '' + name + '';
    display1El.innerText = dis1Num;
    display2El.innerText = '';
    dis2Num = '';
    tempResultEl.innerText = result;
}; 

//a function called operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers

function mathOperation(){
    if(lastOperation === 'X'){
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
};
        

//more eventListeners

equalEl.addEventListener('click', (e) => {
    if(!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

clearAllEl.addEventListener('click', (e) => {
    display1El.innerText = '0';
    display2El.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = '';
    tempResultEl.innerText = '0';
});

clearLastEl.addEventListener('click', (e) => {
    display2El.innerText = '';
    dis2Num = '';
});

//adding keyboard support 

window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'  
        ) {
        clickButtonEl(e.key);
    } else if(
        e.key === '+' ||
        e.key === '-' ||
        e.key === '%' 
    ) {
        clickOperation(e.key);
    } else if(e.key === '*'){
        clickOperation('X');
    } else if (e.key === '=' || e.key == 'Enter'){
        clickEqual(e.key);
    }
});

function clickButtonEl(key){
    numberEl.forEach( button => {
        if(button.innerText === key){
            button.click();
        }
    })
};

function clickOperation(key){
    operationEl.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
};

function clickEqual(){
    equalEl.click();
};