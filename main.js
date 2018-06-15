const currentYear = new Date().getFullYear();   
const currentMonth = new Date().getMonth();

function daysInMonth (month, year) { 
    return new Date(year, month +1, 0).getDate(); ///asdasdasdg
}

let daysData = [];
for(let i = 0; i < daysInMonth(currentMonth, currentYear); i++) {
    daysData.push({Task: []});
}
//Create empty array and fill it with the empty tasks ^
//P.S. array id +1 = day of the month

function putDataOnDays(daySelected) {
    const textToAdd = document.querySelector('input').value;
    daysData[daySelected].Task.push(textToAdd);
}
//easily put data inside the according object

function generateCalendar(){
    const parent = document.querySelector('.calendar-parent');
    const daysNow = daysInMonth(currentMonth, currentYear);
    for(let i = 1; i <= daysNow; i++) {
        const oneItem = document.createElement('div');
        oneItem.classList.add('grid-item', `day-no-${i}`);
        oneItem.setAttribute('tabindex', i);
        oneItem.textContent = i;
        parent.appendChild(oneItem);
    }
}
generateCalendar(); //immideatly call this, later i need to fix it, probably

function checkAndShowData(arrayId) {
    if(daysData[arrayId].Task[arrayId] === undefined) {
        document.querySelector('ul').textContent = 'You have no tasks';
    } else {
        const list = document.querySelector('ul').innerHTML =
            daysData[arrayId].Task
                .map(tasks => `<li>${tasks}</li>`);
    }
}

//Display object data to user ^^


function unselectAllDays(ev) {
    if(ev.relatedTarget === null || ev.toElement === 'button') {
        dayElement.forEach(day => day.classList.remove('selected'));
    }
}
//Unselect all days if user clicks not on the day or on the button to put entry

function selectDays(day, ctrlPressed) {
    if(ctrlPressed) {
        day.classList.toggle('selected');
    } else {
        dayElement.forEach(day => day.classList.remove('selected'));
        day.classList.toggle('selected');
    }
}

const dayElement = Array.from(document.querySelectorAll('.grid-item'));
dayElement.forEach(day => {
        day.addEventListener('click', function(ev) {
            selectDays(this, ev.ctrlKey);
            checkAndShowData(day.tabIndex -1);
        });
        day.addEventListener('focusout', function(ev) {
            unselectAllDays(ev); //This might be problem too in the future
        });
    });

const buttonClick = document.querySelector('button')
    .addEventListener('click', function(ev) {
        dayElement.forEach(day => {
            if(day.classList.contains('selected')) {
                putDataOnDays(day.tabIndex -1); //this works too all good
            }
        });
        unselectAllDays(ev); //Ok this works if I click on the button
    });