const socket = io();
const activeUsersList = document.getElementById('socket-active-users-list');
const canvas = document.getElementById('socket-stamp-canvas');
const ctx = canvas.getContext('2d');
const stampTextInput = document.getElementById('stamp-text-input');

canvas.width = 900;
canvas.height = 500;

const dpi = window.devicePixelRatio;
ctx.scale(dpi, dpi);

let shapes = new Set();
let activeUsers = new Set();

function displayActiveUsers(activeUsers){
  activeUsersSorted = Array.from(activeUsers).sort((x, y) => {
    return x.localeCompare(y, undefined, {sensitivity: 'base'});
  });
 
  userList = []
  activeUsersSorted.forEach((user) => {
    let li = document.createElement('li');
    li.textContent = user; 
    userList.push(li);
  });

  activeUsersList.replaceChildren(...userList);
}

function drawShape(shape){
  switch(shape.type){
    case 'text':
      ctx.fillStyle = shape.color;
      ctx.font = '2rem serif';
      ctx.textBaseline = 'top';
      ctx.fillText(shape.content, shape.coordx, shape.coordy);
      break;
  }
}

function drawShapes(shapes){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => {
    drawShape(shape);
  });   
}

async function initShapes(){
  //shapes.add({type: 'text', coordx: 300, coordy: 100, color: 'blue', content: 'hello'});
  const response = await fetch('/api/html/socket-stamp/getAllShapes');
  const fetchedShapes = await response.json();
  fetchedShapes.forEach(async shape => shapes.add(shape));
  drawShapes(shapes);
}

function addShape(coordX, coordY){
  let textContent = stampTextInput.value;

  if(!textContent){ return;}

  let shape = {
    type: 'text',
    coordx: coordX,
    coordy: coordY,
    content: textContent 
  };

  socket.emit('add shape', shape);

  stampTextInput.value = '';
}

canvas.addEventListener("click", (event) => {
  const boundingRect = canvas.getBoundingClientRect();
  
  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  addShape(Math.round(canvasLeft), Math.round(canvasTop));
});

socket.on('init', (users) => {
  initShapes();

  users.forEach((user) => activeUsers.add(user));
  displayActiveUsers(activeUsers);
});

socket.on('user joined', (user) => {
  activeUsers.add(user);
  displayActiveUsers(activeUsers);
});

socket.on('user left', (user) => {
  activeUsers.delete(user);
  displayActiveUsers(activeUsers);
});

socket.on('shape added', (shape) => {
  if(!shapes.has(shape)){
    shapes.add(shape);
    drawShape(shape);
  }
});
