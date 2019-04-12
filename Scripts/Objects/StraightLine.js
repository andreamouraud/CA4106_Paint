class StraightLine {

    constructor(startX, startY, endX, endY, color, size) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.size = size;
        this.name = "Straight Line";
        this.type = "Straight Line";
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
            var line = new StraightLine(this.posA.posX, this.posA.posY, this.posB.posX, this.posB.posY, currentColor, currentSize, false);
            objects.push({id:currentid, object:line});
    
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
        console.log("a")
        var line = new StraightLine(this.posA.posX, this.posA.posY, this.posB.posX, this.posB.posY, currentColor, currentSize);
        if (line.startX == line.endX && line.startY == line.endY) {
            return;
        }
        var object = {id:currentid++, object:line}
        objects.push(object);
        addAction(object);
        drawObjects();
    }

    draw(context) {
        context.strokeStyle = this.color; 
        context.fillStyle = this.color; 
        context.lineWidth = this.size;
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        context.lineTo(this.endX, this.endY);
        context.closePath();
        context.stroke();
    }
}
