// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');


// Заливка прямоугольника
// ctx.fillStyle = '#FF0000'; // цвет заливки
// ctx.fillRect(50, 50, 150, 100); // x, y, ширина, высота

// Рамка прямоугольника
// ctx.strokeStyle = '#0000FF'; // цвет рамки
// ctx.strokeRect(50, 50, 150, 100);


// ctx.beginPath();
// ctx.arc(250, 150, 50, 0, Math.PI * 2, false); // x, y, радиус, начало, конец, направление
// ctx.fillStyle = 'green';
// ctx.fill();
// ctx.strokeStyle = 'black';
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(300, 300); // начальная точка
// ctx.lineTo(400, 350); // конечная точка
// ctx.strokeStyle = 'purple';
// ctx.lineWidth = 5;
// ctx.stroke();

// ctx.font = '30px Arial';
// ctx.fillStyle = 'blue';
// ctx.fillText('Привет, Canvas!', 100, 50);

// const img = new Image();
// img.src = 'path/to/image.jpg';
// img.onload = function() {
//     ctx.drawImage(img, 10, 10, 200, 150); // изображение, x, y, ширина, высота
// };

// let x = 0;

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // очистка канваса

//     ctx.fillStyle = 'orange';
//     ctx.fillRect(x, 100, 50, 50);

//     x += 2;
//     if (x > canvas.width) x = -50;

//     requestAnimationFrame(animate);
// }

// animate();
//CANVAS
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Получение элементов управления
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

// Настройка кисти
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = brushSize.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// Обработчики событий
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = getMousePos(e);
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Функция рисования
function draw(e) {
    if (!isDrawing) return;
    const [x, y] = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

// Функция получения позиции мыши относительно канваса
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return [
        e.clientX - rect.left,
        e.clientY - rect.top
    ];
}

// Обновление цвета кисти
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
});

// Обновление размера кисти
brushSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

// Очистка холста
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Сохранение изображения
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = canvas.toDataURL();
    link.click();
});