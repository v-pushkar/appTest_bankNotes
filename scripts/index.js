let errors = {
    invalidEmount: "InvalidArgumentExcpetion - BANG!!!!",
};

const app = document.querySelector("#root");
const inforow = document.querySelector('[data-name="inforow"]');
const inputdiv = document.querySelector('[data-name="inputdiv"]');
const inputnum = document.querySelectorAll('[data-role="inputnum"]');
const enterbtn = document.querySelector('[data-role="enter"]');
const backbtn = document.querySelector('[data-role="back"]');

let start_app = false; // flag - is app is start
let emount_enter_start = false; // if emount of money is correct
let emount_ok = false; // if emount of money is correct
let money = 0; // amount for given, zero at start
const notes = [100, 50, 20, 10]; // available notes
const minnote = Math.min(...notes); // min nomenal note
let notesgiv = {};
let card = document.querySelector(".visacard");

card.addEventListener("click", (e) => { //push bank kard in bankomat and start app
    e.target.classList.add("insertCard")
    setTimeout(() => {
        startApp();
    }, 2000)
})

// --------- CLICK EVENT TO SCREEN KEYBOARD
inputnum.forEach((i) => {
    i.addEventListener('click', e => {
        let el = e.target
        // let val = Number(el.getAttribute('data-value'));
        let val = el.getAttribute('data-value');
        amountMoney(val)
    })
})
// --------- add value from button to sistem
function amountMoney(a) {
    if (start_app) {
        inputdiv.setAttribute('data-value', (inputdiv.getAttribute('data-value') === '0' ? a : inputdiv.getAttribute('data-value') + a));
        inputdiv.innerText = inputdiv.getAttribute('data-value');
        emount_enter_start = true;
    } else {
        const inf = document.querySelector('[data-name="inforow"]');
        inf.innerText = "Pleas, push you card"
    }
}

function giveMoney(mo) { // function check, is the sum is correct
    let m = mo;
    let sumisok = () => {
        let answer;
        if (m % minnote == 0 && m > 0) {
            answer = () => `emount is OK. Get you money!`;
            emount_ok = true;
            money = m;
            countNotes()
        } else {
            emount_ok = false;
            console.log("emount is not correct")
            answer = () => {
                let a;
                if (m < minnote && m >= 0) {
                    a = `suma is not correct! We can give you min ${minnote}$`;
                } else if (m < 0) {
                    a = `suma is not correct!`;
                    throw new Error(errors.invalidEmount);
                } else {
                    a = `NoteUnavailableException! We can give you ${m -
            (m % minnote)} or ${m + (minnote - (m % minnote))} $`;
                }
                return a;
            };
        }
        return answer();
    };
    inforow.innerText = sumisok();

}

function countNotes() { // counts the number of notes and save resalt to obj notesgiv

    if (emount_ok) {
        console.log("emount is ok " + money + " $")
        let nota = {};
        let reshta = Infinity;
        notes.forEach(i => {
            let k = () => {
                let s;
                if (Math.floor(money / i) > 1 && reshta === Infinity) {
                    s = Math.floor(money / i);
                    reshta = money % i;
                } else if (Math.floor(money / i) > 1 && reshta >= i) {
                    s = Math.floor(reshta / i);
                    reshta = reshta % i;
                } else {
                    s = 0;
                }
                return s;
            };
            nota[`${i}`] = k();
        });

        notesgiv = nota;
        giveNotes()


    } else {
        console.log("emount is not correct")
    }

}

function giveNotes() {

    const givenotes = document.querySelector('[data-name="givenotes"]');
    let text = "You get: "
    Object.keys(notesgiv).forEach((i) => {
        if (notesgiv[i]) {
            text = text + `\n ${i} x ${notesgiv[i]}  `;
        }
    })
    givenotes.innerText = text;
    setTimeout(() => {
        let el = document.querySelector('.notes');
        el.classList.add('giveNotesAn')
    }, 1000);

}


function startApp() { // start app
    start_app = true;
    const inf = document.querySelector('[data-name="inforow"]');
    inf.innerText = "Pleas, enter emount of money you want end press enter"
    enterbtn.addEventListener('click', () => {
        if (emount_enter_start && !isNaN(Number(inputdiv.getAttribute('data-value')))) {
            giveMoney(Number(inputdiv.getAttribute('data-value')))
        } else if (isNaN(Number(inputdiv.getAttribute('data-value')))) {
            inf.innerText = "Not correct emount of money - NaN."
        } else {
            inf.innerText = "You not enter emount of money."
        }

    })
    backbtn.addEventListener('click', () => {
        if (inputdiv.getAttribute('data-value').length) {

            inputdiv.setAttribute('data-value', inputdiv.getAttribute('data-value').slice(0, -1))
            inputdiv.innerText = inputdiv.getAttribute('data-value')
            console.log("lenght :" + inputdiv.getAttribute('data-value').length);
            if (!inputdiv.getAttribute('data-value').length) {
                emount_enter_start = false;
                inputdiv.setAttribute('data-value', '0')
            }
        }
    })

}