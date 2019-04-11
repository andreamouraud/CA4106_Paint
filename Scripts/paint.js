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
var imageLoader = document.getElementById('imageLoader');
var posA = [];
var posB = [];

imageLoader.addEventListener('change', openFile);
currentObject.open(canvas);
context.lineCap='round'; 

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

function createAction(object) {
    var li = document.createElement("li");
    li.setAttribute('style', "background-image: linear-gradient(90deg, " + object.object.color + " 10px, #EEE 10px, #EEE 11px, transparent 11px);")
    li.setAttribute('id',object.id);

    var up = document.createElement("button");
    up.setAttribute('id','up');
    up.setAttribute('style', "background-image: url(images/up.png)");
    up.setAttribute('title', "Move up");
    up.setAttribute('onclick', 'upObject('+ object.id + ')')
    li.appendChild(up);

    var down = document.createElement("button");
    down.setAttribute('id','down');
    down.setAttribute('style', "background-image: url(images/down.png)");
    down.setAttribute('title', "Move down");
    down.setAttribute('onclick', 'downObject('+ object.id + ')')
    li.appendChild(down);
    
    var edit = document.createElement("button");
    edit.setAttribute('id','down');
    edit.setAttribute('style', "background-image: url(images/edit.png)");    
    edit.setAttribute('title', "Rename");
    edit.setAttribute('onclick', 'changeName('+ object.id + ')');
    li.appendChild(edit);
    
    var remove = document.createElement("button");
    remove.setAttribute('id','remove');
    remove.setAttribute('style', "background-image: url(images/remove.png)");
    remove.setAttribute('title', "Remove");
    remove.setAttribute('onclick', 'removeObject('+ object.id + ')')
    li.appendChild(remove);

    li.appendChild(document.createTextNode(object.object.name));
    return li;
}

function addAction(object) {
    var div = document.getElementById('action-bar');

    var ul = document.getElementById("dynamic-list");
    var li = createAction(object);
    ul.insertBefore(li, ul.firstChild);
}

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

function changeName(id) {
    var item = document.getElementById(id);
    var input = prompt ("Enter new name", item.textContent)
    if (input != null && input != "") {
        for(var i = 0; i < objects.length; i++) {
            if (objects[i].id === id) {
                objects[i].object.name = input;
                item.replaceWith(createAction(objects[i]))
                break;
            }
        }
    }
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
    addAction(objects[objects.length - 1]);
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
    else if (object === 'straightline') {
        currentObject = StraightLine;
    }
    else if (object === 'floodfill') {
        currentObject = FloodFill;
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
    else if (object === 'circle') {
        currentObject = Circle;
    }
    currentObject.open(canvas);
}

function exportImage() {
    var lnk = document.createElement('a'), e;
  
    lnk.download = 'image.png';
    lnk.href = canvas.toDataURL("image/png;base64");
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }

function openFile(e) {
    var reader = new FileReader();
    reader.onload = function(e){
        var img = new Image();
        img.onload = function(e) {
            newWidth = img.naturalWidth;
            newHeight = img.naturalHeight;
            ratio = img.naturalWidth / img.naturalHeight;
            if(newWidth > img.naturalHeight && newWidth > 1280) {
                newWidth = 1280 / ratio;
            }
            if(newWidth >= newHeight || newHeight > newWidth && newHeight > 720) {
                newHeight = 720;
                newWidth = 720 * ratio;
            }
            objects.push({id: currentid++, object:new ImageObject(img, newWidth, newHeight)});
            addAction(objects[objects.length - 1]);
            drawObjects();
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 
}