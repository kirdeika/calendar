const currentYear = new Date().getFullYear();   
const currentMonth = new Date().getMonth();

function daysInMonth (month, year) { 
    return new Date(year, month +1, 0).getDate(); ///asdasdasdg
}

let daysData = [];
for(let i = 0; i < daysInMonth(currentMonth, currentYear); i++) {
    daysData.push({
        TaskHeadline: [],
        TaskExtraText: [],
    });
}
//Create empty array and fill it with the empty tasks ^
//P.S. array id +1 = day of the month

function putDataOnDays(daySelected) {
    const textToAddH = document.querySelector('input[name="headline"]').value;
    const textToAddET = document.querySelector('textarea[name="extra-notes"]').value;
    daysData[daySelected].TaskHeadline.push(textToAddH);
    daysData[daySelected].TaskExtraText.push(textToAddET);
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
    if(daysData[arrayId].TaskHeadline.length === 0 && daysData[arrayId].TaskExtraText.length === 0) {
        document.querySelector('ul').textContent = 'You have no tasks';
    } else {
        const list = document.querySelector('ul').innerHTML =
            daysData[arrayId].TaskHeadline.map((taskH, index) => {
                return `<li>Headline: ${taskH} -- Extra notes: ${daysData[arrayId].TaskExtraText[index]}</li>`
            });
            //this part took me sooooooo long to figure it out. Main thing is that I use
            //[index] keyword to get extra notes for same headline, feels good
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