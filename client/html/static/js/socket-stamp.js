const socket = io();
const activeUsersList = document.getElementById('socket-active-users-list');
const canvas = document.getElementById('socket-stamp-canvas');
const ctx = canvas.getContext('2d');

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
  shapes.forEach((shape) => {
    drawShape(shape);
  });   
}

async function initShapes(){
  //shapes.add({type: 'text', coordx: 300, coordy: 100, color: 'blue', content: 'hello'});
  const response = await fetch('/api/html/socket-stamp/getShapes');
  const fetchedShapes = await response.json();
  fetchedShapes.forEach(async shape => shapes.add(shape));
  drawShapes(shapes);
}

socket.on('init', (msg) => {
  initShapes();

  msg.users.forEach((user) => activeUsers.add(user));
  displayActiveUsers(activeUsers);
});

socket.on('user join', (msg) => {
  activeUsers.add(msg.user);
  displayActiveUsers(activeUsers);
});

socket.on('user leave', (msg) => {
  activeUsers.delete(msg.user);
  displayActiveUsers(activeUsers);
});

socket.on('add shape', (msg) => {
  shapes.add(msg.shape);
});
