class Stack {
    constructor() {
        this.items = [];      // internal storage
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: cannot pop from empty stack");
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty: cannot peek");
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    getAll() {
        return [...this.items];
    }
}

const stack = new Stack();

const displayDiv = document.getElementById('stackDisplay');
const inputField = document.getElementById('elementInput');
const sizeSpan = document.getElementById('sizeValue');
const messageSpan = document.getElementById('messageArea');

document.getElementById('pushBtn').addEventListener('click', () => {
    const value = inputField.value.trim();
    if (value === '') {
        showMessage('Please enter a value', 'red');
        return;
    }
    let parsedValue;
    if (!isNaN(value) && value !== '') {
        parsedValue = Number(value);  
    } else {
        parsedValue = value;            
    }
    stack.push(parsedValue);
    updateDisplay();
    showMessage(`Pushed: ${parsedValue}`, 'green');
    inputField.value = '';
    inputField.focus();
});

document.getElementById('popBtn').addEventListener('click', () => {
    try {
        const popped = stack.pop();
        updateDisplay();
        showMessage(`Popped: ${popped}`, 'green');
    } catch (error) {
        showMessage(error.message, 'red');
    }
});

document.getElementById('peekBtn').addEventListener('click', () => {
    try {
        const top = stack.peek();
        showMessage(`Top element: ${top}`, 'green');
    } catch (error) {
        showMessage(error.message, 'red');
    }
});

document.getElementById('isEmptyBtn').addEventListener('click', () => {
    const empty = stack.isEmpty();
    showMessage(`Stack is ${empty ? 'empty' : 'not empty'}`, 'blue');
});

document.getElementById('sizeBtn').addEventListener('click', () => {
    showMessage(`Stack size: ${stack.size()}`, 'blue');
});

document.getElementById('clearBtn').addEventListener('click', () => {
    stack.clear();
    updateDisplay();
    showMessage('Stack cleared', 'green');
});

function updateDisplay() {
    const items = stack.getAll();
    if (items.length === 0) {
        displayDiv.innerText = '[ ]';
    } else {
        displayDiv.innerText = '[ ' + items.join(' | ') + ' ]  ← top';
    }
    sizeSpan.innerText = stack.size();
}

function showMessage(msg, color) {
    messageSpan.innerText = msg;
    messageSpan.style.color = color;
    setTimeout(() => {
        messageSpan.innerText = '';
    }, 2000);
}

updateDisplay();