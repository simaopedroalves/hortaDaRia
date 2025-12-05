const holidayPopUp = document.querySelector('#holidayPopUp');
const closeHolidayPopUpButton = holidayPopUp.querySelector('.close-pop-up-button');

export function setHolidayPopUp() {
    const today = new Date();
    // const month = today.getMonth() + 1;
    // const day = today.getDate();

    let showPopUp = false;

    // Define holiday periods
    const holidayPeriods = [
        { start: { month: 12, day: 1 }, end: { month: 1, day: 5 } }, // Christmas to New Year
       // { start: { month: 8, day: 1 }, end: { month: 8, day: 31 } }   // August holidays
    ];

    // Check if today falls within any holiday period
    for (const period of holidayPeriods) {
        const start = new Date(today.getFullYear(), period.start.month - 1, period.start.day);

        const end = new Date(today.getFullYear(), period.end.month - 1, period.end.day);

        // Adjust year for periods that span the new year
        if (period.start.month > period.end.month) {
            if (today < end) {
                start.setFullYear(today.getFullYear() - 1);
            } else {
                end.setFullYear(today.getFullYear() + 1);
            }
        }
        if (today >= start && today <= end) {
            console.log('today', today < end);
            console.log('start', start);
            console.log('end', start.setFullYear(today.getFullYear() - 1));


            showPopUp = true;
            break;
        }
    }

    if (showPopUp) {
        holidayPopUp.style.display = 'flex';
    } else {
        holidayPopUp.style.display = 'none';
    }

    closeHolidayPopUpButton.addEventListener('click', () => {
        holidayPopUp.style.display = 'none';
    });
}

setHolidayPopUp();