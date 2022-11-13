import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    datePicker: document.querySelector('input[type="text"]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let chosenTime = 0;
refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        chosenTime = selectedDates[0].getTime();
        if (chosenTime < Date.now()) {
            Notiflix.Notify.warning("Please choose a date in the future");
            return;
        }
        refs.startBtn.disabled = false;
        refs.startBtn.addEventListener('click', onStartBtnClick);
    },
};

flatpickr(refs.datePicker, options);


function onStartBtnClick(e) {
    refs.startBtn.removeEventListener('click', onStartBtnClick);
    refs.startBtn.disabled = true;

    const timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = chosenTime - currentTime;
        console.log('deltaTime :>> ', deltaTime);
        if (deltaTime <= 0) {
            clearInterval(timerId);
            return;
        }
        const time = convertMs(deltaTime);
        updateTimerFace(time);

    }, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

