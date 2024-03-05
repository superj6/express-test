const socket = io();

const helloUser = document.getElementById('hello-user');
const activeUsersList = document.getElementById('socket-active-users-list');
const canvas = document.getElementById('socket-stamp-canvas');
const ctx = canvas.getContext('2d');
const stampTextInput = document.getElementById('stamp-text-input');

canvas.width = 900;
canvas.height = 500;

const dpi = window.devicePixelRatio;
ctx.scale(dpi, dpi);

let myUser;
let shapes = new Set();
let activeUsers = new Map();

function displayMe(myUser){
  helloUser.textContent = myUser.name;
  helloUser.style.color = myUser.color;
  helloUser.style.fontWeight = 'bold';
}

function displayActiveUsers(myUser, activeUsers){
  activeUsersSorted = Array.from(activeUsers.values()).sort((x, y) => {
    return x.name.localeCompare(y.name, undefined, {sensitivity: 'base'});
  });
 
  userList = []
  activeUsersSorted.forEach((user) => {
    let li = document.createElement('li');
    li.textContent = user.name;
    li.style.color = user.color
    if(user.id === myUser.id){ li.style.fontWeight = 'bold';}
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

async function addFetchedShapes(fetchedShapes){
  fetchedShapes.forEach(async shape => shapes.add(shape));
  drawShapes(shapes);
}

async function initShapes(){
  //shapes.add({type: 'text', coordx: 300, coordy: 100, color: 'blue', content: 'hello'});
  const response = await fetch('/api/html/socket-stamp/getAllShapes');
  const fetchedShapes = await response.json();
  addFetchedShapes(fetchedShapes);
}

async function getUserShapes(userid){
  const response = await fetch('/api/html/socket-stamp/getUserShapes?' + new URLSearchParams({
    userid: userid
  }));
  const fetchedShapes = await response.json();
  addFetchedShapes(fetchedShapes);
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

socket.on('init', (me, users) => {
  myUser = me;
  displayMe(myUser);

  users.forEach((user) => activeUsers.set(user.id, user));
  displayActiveUsers(myUser, activeUsers);

  initShapes();
});

socket.on('user joined', (user) => {
  activeUsers.set(user.id, user);
  displayActiveUsers(myUser, activeUsers);

  getUserShapes(user.id);
});

socket.on('user left', (userid) => {
  activeUsers.delete(userid);
  shapes.forEach((shape) => {
    if(shape.userid === userid){
      shapes.delete(shape);
    }
  });

  drawShapes(shapes);
  displayActiveUsers(myUser, activeUsers);
});

socket.on('shape added', (shape) => {
  shapes.add(shape);
  drawShape(shape);
});
