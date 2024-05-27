const promptSync = require("prompt-sync")();

// 1. Deposit some money by user
// 3. Determine number of lines to be bet
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if user won
// 6. Give the user their winning


const COLS = 3;
const ROWS = 3;

const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        Array.from(new Array(count)).forEach(() => symbols.push(symbol));
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbol = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbol.length);
            reels[i].push(reelSymbol[randomIndex]);
            reelSymbol.splice(randomIndex, 1);
        }
    }
    return reels;
}
const transpose = (reels) => {
    const rowReels = reels.map((_, index) => {
        const transposeArray = [];
        reels.forEach((data) => {
            transposeArray.push(data[index])
        })
        return transposeArray;
    });
    return rowReels
};

const showResult = (rows) => {
    for (const row of rows) {
        let rowString = '';
        for (const [index, symbol] of Object.entries(row)) {
            rowString += symbol;
            if (index < (row.length - 1)) {
                rowString += ' | ';
            }
        }
        console.log(rowString)
    }
}

const deposit = () => {
    while (true) {
        const depositAmount = promptSync('Enter Deposit Amount: ');
        const numberDepositAmount = parseFloat(depositAmount);
        if (!isNaN(numberDepositAmount) || numberDepositAmount > 0) {
            return numberDepositAmount;
        }
        console.log("🚀 Invalid Amount 404, Try Again...!");
    }
};

const getBetLine = () => {
    while (true) {
        const betLine = promptSync('Enter the number of lines to be bet (1-3): ');
        const numberBetLine = parseFloat(betLine);
        if (!isNaN(numberBetLine) && numberBetLine >= 1 && numberBetLine <= 3) {
            return numberBetLine;
        }
        console.log("🚀 Invalid Amount 404, Try Again...!");
    }
};

const getBet = (totalAmount, betLine) => {
    while (true) {
        const betAmount = promptSync('Enter per line bet Amount : ');
        const numberBetAmount = parseFloat(betAmount);
        if (!isNaN(numberBetAmount) && numberBetAmount >= 0 && numberBetAmount < (totalAmount / betLine)) {
            return numberBetAmount;
        }
        console.log("🚀 Invalid Amount 404, Try Again...!");
    }
};


let totalBalance = deposit();
const betLine = getBetLine();
const bet = getBet(totalBalance, betLine)
console.log("🚀 ~ bet:", bet)
const reels = spin();
console.log("🚀 ~ reels:", reels)
const rows = transpose(reels);
showResult(rows);

const getResult = () => {
    let winning = 0;
    for (let row = 0; row < betLine; row++) {
        const line = reels[row];
        let isSame = false;
        isSame = line.every((symbol) => symbol === line[0])
        if (isSame) {
            winning += bet * SYMBOL_VALUES[line[0]];
            console.log("🚀 ~ getResult ~ winning:", winning);
        }
    }
    return winning;
}
const winning = getResult();

console.log("🚀 ~ Your winning $: ", winning)
