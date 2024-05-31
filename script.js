let result = document.getElementById('result');

function insert(value) {
    if (value === '^') {
        result.value += '^';
    } else if (value === 'mod') {
        result.value += ' % '; 
    } else {
        result.value += value;
    }
}

function clearScreen() {
    result.value = '';
}

function deleteChar() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = result.value.replace(/mod/g, '%'); 
        let evaluated = Function('"use strict";return (' + expression + ')')();
        result.value = evaluated;
    } catch (error) {
        result.value = 'Error';
    }
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (isNumeric(key)) {
        insert(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        insert(key); 
    } else if (key === '%' || key === '^') {
        insert(key); 
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteChar(); 
    }
});


function isNumeric(value) {
    return /^[0-9]$/.test(value);
}
