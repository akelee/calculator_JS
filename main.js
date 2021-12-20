class Calculator { //special method for creating and initializing an object created with a class
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()//reset all default when cleared
    } 
    clear() {//remove all values in output:
        this.currentOperand = '';//empties when cleared
        this.previousOperand = '';//empties when cleared
        this.operation = undefined;//operand not selected when cleared

        //then, call function above with this.clear();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)//deletes last number of string. (0 is first digit, -1 is 2ns to last digit)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()//need to change to string otherwise 1 + 1 = 11

    }

    chooseOperation(operation) {//function needs to take operation selected by user //to make inputnumber and operand appear as previous operand:
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
      this.compute()
    }
        this.operation = operation
        this.previousOperand = this.currentOperand //tells calculator we are done w previous operand, so current operand has space to be typed in
        this.currentOperand = ''; //clear out value in current operand space

    }

    compute() { //take values inside calculator n compute single value
        let computation
        const prev = parseFloat(this.previousOperand);//convert string to number
        const current = parseFloat(this.currentOperand);
        //check if user doesn't enter number and clicks equal, we dont want code to run
        if(isNaN(prev) || isNaN(current)); return//return cancels function completely
        switch (this.operation) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break
            case '*':
              computation = prev * current
              break
            case '÷':
              computation = prev / current
              break
            default://like 'else statement'. default is if no symbols and statements above execute, default will execute return nothing
                return

        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number){
        const stringNumber = number.toString();//.toString cos we dk if we will get a number or a string
        const integerDigits = parseFloat(stringNumber.split('.')[0])//turns string into array with striungNumber. 1st part of number is b4 decimal, 2nd part is after. [0] cos we want the integers b4 decimal
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNan(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    
        }
        if(decimalDigits != null)//means user entered '.' + numbers after it
        {
        return `${integerDisplay}.${decimalDigits}`
    }   else {
        return integerDisplay
        }
    }


    updateDisplay() {//updates values inside output
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '' //empties out previous operand when calculation completes
        }
    }
}


//add specific data classes in html to prevent confusion when selecting elements

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//make above consts operate on our calculator

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)//define class name with new + class name, and pass everything from constructor into it

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();//clicking equals calls the compute function
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();//clicking equals calls the compute function
})