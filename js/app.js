'use strict';
const index = 0;
const nums = document.querySelectorAll('input[type]');
const button = document.querySelector('button');
const answer = document.querySelector('.answers');
const answers = document.querySelectorAll('.answers li');



button.addEventListener('click', function(e) {
	let arr = getValuesInputs(nums);
	if(determinant(arr)!=0 && mainDiagonal(arr)){
		let values = iteration(arr);
		return answers[0].innerHTML = `x: ${values[0]}`,answers[1].innerHTML = `y: ${values[1]}`, answers[2].innerHTML = `x: ${values[2]}`;

	}else{
		return answer.innerHTML = 'Метод итераций не подходит для данного уравнения';
	}
});


//возвращает массив введенных значений
function getValuesInputs(arr){
	const values = [];
	for(let elem of arr){
		values.push(+elem.value);
	}
	return values;
}

//находит определитель матрицы
function determinant(arr){
	return arr[0]*arr[5]*arr[10]+arr[8]*arr[1]*arr[6]+arr[4]*arr[9]*arr[2]-arr[8]*arr[5]*arr[2]-arr[0]*arr[9]*arr[6]-arr[4]*arr[1]*arr[10];
	
}

// проверка главной диагонали
function mainDiagonal(arr){
	if((Math.abs(arr[0])>Math.abs(arr[1])+Math.abs(arr[2]))&&(Math.abs(arr[5])>Math.abs(arr[4])+Math.abs(arr[6]))&&(Math.abs(arr[10])>Math.abs(arr[8])+Math.abs(arr[9]))){
		return true;
	}else{
		return false;
	}	
}


//проверка на точность. поиск максимального значения
function max(arr){
	const c1 = (Math.abs(arr[1])+Math.abs(arr[2])) / Math.abs(arr[0]);
	const c2 = (Math.abs(arr[4])+Math.abs(arr[6])) / Math.abs(arr[5]);
	const c3 = (Math.abs(arr[8])+Math.abs(arr[9])) / Math.abs(arr[10]);
	return +Math.max(c1,c2,c3).toFixed(2);
}

//проверка на точность 
function accuracy(arr,x0,x){
	const e = Math.pow(10,-3);
	const q = max(arr);
	if(((q/(1-q))*Math.abs(x-x0))<e){
		return true;
	}else{
		return false;
	}
}


//итерации
function iteration(arr){
	let x = +(arr[3]/arr[0]).toFixed(2);
	let y = +(arr[7]/arr[5]).toFixed(2);
	let z = +(arr[11]/arr[10]).toFixed(2);
	let x0 = 0;
	let y0 = 0;
	let z0 = 0;
	while(!accuracy(arr,x0,x)){
		x0 = x;
		y0 = y;
		z0 = z;
		x = +((arr[3]-arr[1]*y0-arr[2]*z0)/arr[0]).toFixed(3);
		y = +((arr[7]-arr[4]*x0-arr[6]*z0)/arr[5]).toFixed(3);
		z = +((arr[11]-arr[9]*y0-arr[8]*x0)/arr[10]).toFixed(3);
	}
	return [x,y,z];
}

