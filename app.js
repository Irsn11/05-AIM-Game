const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const btn = document.querySelector('.btn')
const colors = ['#fb6542','#375e97','#ffbb00','#a65480','#3f681c'];

let time = 0;
//счетчик игры
let score = 0;
//нажимаем старт
startBtn.addEventListener('click', (e) => {
	//отменяем действия по умолчанию, чтобы не добавлялся хеш к адресу URL
	e.preventDefault()
	//Класс up ^ margin-top: -100vh
	//убираем первый экран
	screens[0].classList.add('up');
})
//выбор времени
timeList.addEventListener('click', (e) => {
	//делегируем , проверяем произожел ли клик на нужной кнопке
	if (e.target.classList.contains('time-btn')) {
		//parseInt- переводит строку в число
		time = parseInt(e.target.getAttribute('data-time'))
	
		//функция начала игры
		startGame()
		//убираем экран выбора времени
		screens[1].classList.add('up')
	}
})

//клик по кружку
board.addEventListener('click',(e)=> {
	if (e.target.classList.contains('circle')) {
		score++;
		//удаляем кружек
		e.target.remove();
		createRandomCircle()
		
	}
})
//DEBUG - отладка
//startGame()

//получаем цвет кружка
function setColor(element){
	const color = getRandomCollor();
	element.style.backgroundColor = `${color}`;
	element.style.boxShadow = `0 0 2px ${color}, 0 0 2px ${color}`;
}

function getRandomCollor(){
	const index = Math.floor(Math.random() * colors.length)
	return colors[index];
}

function startGame() {
	createRandomCircle()
	//указанная функция запускается не один раз, а периодически через указанный интервал времени

	setInterval(decreaseTime, 1000);
	//в табло записываем выбранное на старте время
	setTime(time);

}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		//переменная текущее время 
	let current = --time
	if (current < 10) {
		current = `0${current}`
	};
			//в табло записываемтекущее время
		setTime(current);
	}
	
}
function setTime(value) {
		timeEl.innerHTML=`00:${value}`
}

function finishGame() {
	//	timeEl.parentNode.remove();
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span><h1>
	`
}



function createRandomCircle() {
		
	const circle=document.createElement('div')
	circle.classList.add('circle')
	const size = getRangomNmber(10, 60)
	//пользуясь деструктуризацией получаем размеры доски
	const {width,height } = board.getBoundingClientRect()

	const x = getRangomNmber(0, width-size);
	const y = getRangomNmber(0, height-size);

	circle.style.top  = `${y}px`;
	circle.style.left = `${x}px`;
	//указываем рандомные размеры
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	setColor(circle);

	board.append(circle);
}


//получаем рандомное знаечение размеров из диапазона
function getRangomNmber(min, max) {
return Math.round(Math.random()*(max - min) + min)
}