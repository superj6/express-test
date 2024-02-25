const socket = io();
const canvas = document.getElementById('socket-stamp-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 500;

const dpi = window.devicePixelRatio;
ctx.scale(dpi, dpi);

var shapes = [];

function drawShape(shape){
  switch(shape.type){
    case 'text':
      ctx.fillStyle = shape.color;
      ctx.font = '2rem serif';
      ctx.textBaseline = 'top';
      ctx.fillText(shape.content, shape.coord.x, shape.coord.y);
      break;
  }
}

function drawShapes(shapes){
  shapes.forEach((shape) => {
    drawShape(shape);
  });   
}

async function initShapes(){
  shapes = [{type: 'text', coord: {x: 300, y: 100}, color: 'blue', content: 'hello'}];
  //shapes = await fetch('/api/html/getShapes');
  drawShapes(shapes);	
}

initShapes();

socket.on('add shape', (msg) => {
  
});
