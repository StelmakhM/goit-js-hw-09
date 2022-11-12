const refs = {
	startBtn: document.querySelector("[data-start]"),
	stopBtn: document.querySelector("[data-stop]"),
	body: document.body,
};

const DELAY = 1000;
let timerId;

refs.startBtn.addEventListener("click", onStartBtnClick);
refs.stopBtn.addEventListener("click", onStopBtnClick);
refs.stopBtn.disabled = true;

function onStartBtnClick(e) {
	refs.startBtn.disabled = true;
	refs.stopBtn.disabled = false;

	timerId = setTimeout(function changeBodyColor() {
		refs.body.style.backgroundColor = getRandomHexColor();
		timerId = setTimeout(changeBodyColor, DELAY);
	}, DELAY);
}

function onStopBtnClick(e) {
	refs.startBtn.disabled = false;
	refs.stopBtn.disabled = true;
	clearTimeout(timerId);
}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
