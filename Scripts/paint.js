var currentid = 0;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var down = false;
var currentColor = 'black';
var objects = [];
var reverted = [];
var currentSize = 5;
var currentObject = Line;
var eraser = false;

currentObject.open(canvas);

function drawObjects() {
    console.log(objects);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.object.draw(context)
    }
}

function getMousePosition(e) {
    return {posX: e.clientX - canvas.offsetLeft, posY: e.clientY - canvas.offsetTop }
}

document.getElementById('current').style.backgroundColor = 'black';

function addAction(object) {
    var div = document.getElementById('action-bar');

    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('style', "background-image: linear-gradient(90deg, " + object.object.color + " 10px, #EEE 10px, #EEE 11px, transparent 11px);")
    li.setAttribute('id',object.id);
    

    var up = document.createElement("button");
    up.setAttribute('id','up');
    up.setAttribute('style', "background-image: url(images/up.png)");
    up.setAttribute('onclick', 'upObject('+ object.id + ')')
    li.appendChild(up);

    var down = document.createElement("button");
    down.setAttribute('id','down');
    down.setAttribute('style', "background-image: url(images/down.png)");
    down.setAttribute('onclick', 'downObject('+ object.id + ')')
    li.appendChild(down);
    
    var remove = document.createElement("button");
    remove.setAttribute('id','remove');
    remove.setAttribute('style', "background-image: url(images/remove.png)");
    remove.setAttribute('onclick', 'removeObject('+ object.id + ')')
    li.appendChild(remove);

    li.appendChild(document.createTextNode('Line'));
    ul.insertBefore(li, ul.firstChild);
}

canvas.addEventListener('mouseup', function() { down = false; });

var size =  document.getElementById('brushSize');
size.addEventListener("change",changeBrushSize);
size.addEventListener("mousemove",changeBrushSize);

function changeColor(color) {
    document.getElementById('current').style.backgroundColor = color; 
    currentColor = color;
}

function clearCanvas() {
    objects = [];
    drawObjects();
    var ul = document.getElementById("dynamic-list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function downObject(id) {
    var ul = document.getElementById("dynamic-list");
    var item = document.getElementById(id);
    for(var i = 0; i < objects.length; i++) {
        if (objects[i].id === id) {
            if (i === 0)
                break;
            var tmp = objects[i - 1];
            objects[i - 1] = objects[i];
            objects[i] = tmp;
            ul.insertBefore(item, item.nextElementSibling.nextElementSibling);
            break;
        }
    }
    drawObjects();
}

function upObject(id) {
    var ul = document.getElementById("dynamic-list");
    var item = document.getElementById(id);
    for(var i = 0; i < objects.length; i++) {
        if (objects[i].id === id) {
            if (i === objects.length - 1)
                break;
            var tmp = objects[i + 1];
            objects[i + 1] = objects[i];
            objects[i] = tmp;
            ul.insertBefore(item, item.previousElementSibling)
            break;
        }
    }
    drawObjects();
}

function removeObject(id) {
    var ul = document.getElementById("dynamic-list");
    var item = document.getElementById(id);
    if (item != null) {
        ul.removeChild(item);
    }
    for(var i = 0; i < objects.length; i++) {
        if (objects[i].id === id) {
            objects.splice(i, 1);
            break;
        }
    }
    drawObjects();
}

// TODO NOT REVERT TO HISTORY IF ERASER
function revert() {
    if (objects.length > 0) {
        var object = objects.pop();
        reverted.push(object);
        removeObject(object.id);
        drawObjects();
    }
}

function redo() {
    if (reverted.length > 0) {
        var object = reverted.pop();
        objects.push(object);
        addAction(object);
        drawObjects();
    }
}

function changeBrushSize(size) {
    currentSize = this.value;
}

function fillCanvas() { 
    currentColor = document.getElementById('current').style.backgroundColor;
    objects.push({id:currentid++, object:new Rectangle(0, 0, canvas.width, canvas.height , currentColor, currentSize, true)});
    drawObjects();
}

function changeObject(object) {
    eraser = false;
    document.getElementById('colors').style.display = 'block';
    currentColor = document.getElementById('current').style.backgroundColor;
    currentObject.close(canvas);
    if (object === 'line') {
        currentObject = Line;
    }
    else if (object === 'rectangle') {
        currentObject = Rectangle;
    }
    else if (object === 'eraser') {
        currentObject = Line;
        eraser = true;
        currentColor = 'white';
        document.getElementById('colors').style.display = 'none';
    }
    currentObject.open(canvas);
}