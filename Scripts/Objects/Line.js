class Line {
    constructor(startX, startY, color, size) {
        this.startX = startX;
        this.startY = startY;
        this.path = []
        this.color = color;
        this.size = size;
    }

    addPoint(pointX, pointY) {
        var point = {"pointX": pointX, "pointY": pointY};
        this.path.push(point)
    }

    static open(canvas) {
        console.log('open line')
        canvas.addEventListener('mousemove', this.mouseMoveListener);
        canvas.addEventListener('mousedown', this.mouseDownListener);
        canvas.addEventListener('mouseup', this.mouseUpListener);
    }

    static close(canvas) {
        canvas.removeEventListener('mousemove', this.mouseMoveListener, false);
        canvas.removeEventListener('mousedown', this.mouseDownListener, false);
        canvas.removeEventListener('mouseup', this.mouseUpListener);
    }

    static mouseDownListener(e) {
        var pos = getMousePosition(e);

        var line = new Line(pos.posX, pos.posY, currentColor, currentSize);
        down = true;
        var object = {id:currentid++, object:line};
        objects.push(object);
        if (!eraser) {
            addAction(object);
        }
    }

    static mouseMoveListener(e) {
        var pos = getMousePosition(e);

        if(down == true)
        {
            objects[objects.length -1].object.addPoint(pos.posX, pos.posY);
            drawObjects();
        }
    }

    static mouseUpListener(e) {
        down = false;
        console.log(objects[objects.length - 1].object.path)
        if (objects[objects.length - 1].object.path.length === 0) {
            removeObject(currentid - 1)
        }
    }

    draw(context) {
        context.strokeStyle = this.color; 
        context.fillStyle = this.color; 
        context.lineWidth = this.size;
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        for(var i = 0; i < this.path.length; i++) {
            context.lineTo(this.path[i].pointX, this.path[i].pointY);
        }
        context.stroke();
    }
}