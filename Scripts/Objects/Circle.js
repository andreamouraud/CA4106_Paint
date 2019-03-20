class Circle {

    constructor(startX, startY, endX, endY, color, size, fill) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.size = size;
        this.fill = fill;
        this.name = "Circle"
    }

    static open(canvas) {
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
        context.beginPath();
        context.stroke();
        down = true;
         e.preventDefault();
        this.posB = this.posA = getMousePosition(e);
    }

    static mouseMoveListener(e) {
        if (down) {     
            var rectangle = new Circle(this.posA.posX, this.posA.posY, this.posB.posX, this.posB.posY, currentColor, currentSize, false);
            objects.push({id:currentid, object:rectangle});
    
            e.preventDefault();
            this.posB = getMousePosition(e);
            drawObjects()
            objects.pop()
        }
    }

    static mouseUpListener(e) {
        down = false;
        e.preventDefault();
        this.locB = getMousePosition(e);
        var circle = new Circle(this.posA.posX, this.posA.posY, this.posB.posX, this.posB.posY, currentColor, currentSize, false);
        if (circle.startX == circle.endX && circle.startY == circle.endY) {
            return;
        }
        var object = {id:currentid++, object:circle}
        objects.push(object);
        addAction(object);
        drawObjects();
    }

    draw(context) {
        context.strokeStyle = this.color; 
        context.fillStyle = this.color; 
        context.lineWidth = this.size;
        context.beginPath();
        context.moveTo(this.startX, this.startY + (this.endY - this.startY) / 2);
        context.bezierCurveTo(this.startX, this.startY, this.endX, this.startY, this.endX, this.startY + (this.endY - this.startY) / 2);
        context.bezierCurveTo(this.endX, this.endY, this.startX, this.endY, this.startX, this.startY + (this.endY - this.startY) / 2);
        context.closePath();
        context.stroke();
    }
}
