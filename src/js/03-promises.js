import Notiflix from "notiflix";

const refs = {
    form: document.querySelector(".form"),
};

refs.form.addEventListener("submit", onFormSubmit);
const { amount, delay, step } = refs.form.elements;

function onFormSubmit(e) {
    e.preventDefault();

    let delayValue = Number(delay.value);
    const amountValue = Number(amount.value);
    const stepValue = Number(step.value);

    for (let i = 1; i <= amountValue; i += 1) {
        createPromise(i, delayValue)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });

        delayValue += stepValue;
    }
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.5;
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}
