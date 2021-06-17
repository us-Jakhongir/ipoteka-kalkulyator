const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');


// Значения из ренж групп
const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

// Итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

//все ренж
const inputsRange = document.querySelectorAll('.input-range');

// Все кнопки с процентной ставкой
const bankBtns = document.querySelectorAll('.bank');


const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}

assignValue();

const banks = [
    {
        name: 'ipoteka',
        precents: 19.8
    },
    {
        name: 'qishloqqurilish',
        precents: 20
    },
    {
        name: 'milliy',
        precents: 23
    },
    {
        name: 'xalq',
        precents: 22
    },
    {
        name: 'agro',
        precents: 24
    }
];

let currentPrecent = banks[0].precents;


for(let bank of bankBtns) {
    bank.addEventListener('click', () => {
        console.log(bank);
        for(let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    console.log(dataAttrValue);
    const currentBank = banks.find( bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precents
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for ( let input of inputsRange ) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

const calculation = (totalCost = 0, anInitialFee = 50000000, creditTerm = 1) => {
    /* 
    OT - Oylik to'lov
    KM - Kredit miqdori
    FM - Foiz miqdori
    OS - Oylar soni

    OT = (KM + (((KM / 100) * FM) / 12) * OS) / OS

    */

    let monthlyPayment;
    let lounAmount = totalCost - anInitialFee;
    let interestRate = currentPrecent;
    let numberOfYears = creditTerm;
    let numberOfMonths = 12 * numberOfYears;

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);

    if (monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = lounAmount;
        totalMonthlyPayment.innerHTML = monthlyPaymentArounded;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100 ) * 25)}`
    }

}