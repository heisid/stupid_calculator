let display = $('#calcDisplay');

let stack = [0];
let buffer = [];
const OPERATION = ['+', '-', 'x', '/'];

function render(value) {
    if (isNaN(value))
        display.text(value.slice(0, 11));
    else {
        if (value.toString().length > 11) display.text(value.toExponential(2));
        else display.text(value);
    }
}

function clear() {
    buffer = [];
    if (stack.length > 1)
        stack.pop();
    else
        stack = [0];
    render(0);
}

function reset() {
    stack = [0];
    buffer = [];
    render(0);
}

function numPress() {
    let pressed = $(this).text().trim();
    if (pressed === '.' && buffer.includes('.')) return;
    buffer.push(pressed);
    let buffer_join = buffer.join('').startsWith('.') ? '0' + buffer.join('') : buffer.join('');
    console.log(buffer_join);
    if (!OPERATION.includes(stack[stack.length - 1])) {
        stack[stack.length - 1] = parseFloat(buffer_join);
    } else {
        stack.push(parseFloat(buffer_join));
    }

    render(buffer_join);
}

function opPress() {
    let operation = $(this).text().trim();
    buffer = [];
    if (stack.length === 3) {
        calculate();
        return;
    }
    if (OPERATION.includes(stack[stack.length - 1]))
        stack[stack.length - 1] = operation;
    else
        stack.push(operation);
    render(operation);
}

function calculate() {
    let operand1 = stack[0];
    let operator = stack[1];
    let operand2 = stack[2];
    let result = 0;

    switch(operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case 'x':
            result = operand1 * operand2;
            break;
        case '/':
            try {
                result = operand1 / operand2;
            } catch (error) {
                stack = [0];
                render(error);
            }
            break;
        default:
            break;
    }

    render(result);
    stack = [result];
}

function resPress() {
    buffer = [];
    // noinspection FallThroughInSwitchStatementJS
    switch (stack.length) {
        case 2:
            stack.pop();
        case 1:
            render(stack[0]);
            break;
        case 3:
            calculate();
            break;
        default:
            break;
    }
}

render(0);

$('#clearBtn').on('click', clear);

$('#resetBtn').on('click', reset);

$('.mainBtns').on('click', numPress);

$('.opBtns').on('click', opPress);

$('.resBtns').on('click', resPress);