class FloodFill {

    constructor(imageData, color) {
        this.imageData = imageData;
        this.color = color;
        this.name = "Flood Fill";
    }

    static open(canvas) {
        canvas.addEventListener('mousedown', this.mouseDownListener);
    }

    static close(canvas) {
        canvas.removeEventListener('mousedown', this.mouseDownListener, false);
    }

    static mouseDownListener(e) {
      FloodFill.close(canvas);
      e.preventDefault();
        this.posB = this.posA = getMousePosition(e);
        var currentColorElem = document.getElementById('current-color');
        currentColorElem.style.backgroundColor = currentColor;
        const color = window.getComputedStyle(currentColorElem).backgroundColor;
        const rgb = color.replace(/[^\d,]/g, '').split(',');
        const col = { r: rgb[0], g: rgb[1], b: rgb[2], a: 255 };
          fill(context.getImageData(0, 0, canvas.width, canvas.height), col, this.posA.posX, this.posA.posY)
      FloodFill.open(canvas);
    }

    
      
    draw(context) {
        context.fillStyle = currentColor;
        context.putImageData(this.imageData, 0, 0);
    }
}
function getColorAtPixel(imageData, x, y) {
    const {width, data} = imageData
  
    return {
      r: data[4 * (width * y + x) + 0],
      g: data[4 * (width * y + x) + 1],
      b: data[4 * (width * y + x) + 2],
      a: data[4 * (width * y + x) + 3]
    }
  }
  
   function setColorAtPixel(imageData, color, x, y) {
    const {width, data} = imageData
  
    data[4 * (width * y + x) + 0] = color.r & 0xff
    data[4 * (width * y + x) + 1] = color.g & 0xff
    data[4 * (width * y + x) + 2] = color.b & 0xff
    data[4 * (width * y + x) + 3] = color.a & 0xff
  }
  
   function colorMatch(a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a
  }
  
   function fill(imageData, newColor, x, y) {
    const {width, height, data} = imageData
    const stack = []
    path = []
    const baseColor = getColorAtPixel(imageData, x, y)
    console.log(baseColor)
    let operator = {x, y}
  
    // Check if base color and new color are the same
    console.log(baseColor)
    console.log(newColor);
    console.log(colorMatch(baseColor, newColor))
    if (colorMatch(baseColor, newColor)) {
      return
    }
  
    // Add the clicked location to stack
    stack.push({x: operator.x, y: operator.y})
  
    while (stack.length) {
      operator = stack.pop()
      let contiguousDown = true // Vertical is assumed to be true
      let contiguousUp = true // Vertical is assumed to be true
      let contiguousLeft = false
      let contiguousRight = false
  
      // Move to top most contiguousDown pixel
      while (contiguousUp && operator.y >= 0) {
        operator.y--
        contiguousUp = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor)
      }
  
      // Move downward
      while (contiguousDown && operator.y < height) {
        setColorAtPixel(imageData, newColor, operator.x, operator.y)
        path.push({x:operator.x, y:operator.y})
  
        // Check left
        if (operator.x - 1 >= 0 && colorMatch(getColorAtPixel(imageData, operator.x - 1, operator.y), baseColor)) {
          if (!contiguousLeft) {
            contiguousLeft = true
            stack.push({x: operator.x - 1, y: operator.y})
          }
        } else {
          contiguousLeft = false
        }
  
        // Check right
        if (operator.x + 1 < width && colorMatch(getColorAtPixel(imageData, operator.x + 1, operator.y), baseColor)) {
          if (!contiguousRight) {
            stack.push({x: operator.x + 1, y: operator.y})
            contiguousRight = true
          }
        } else {
          contiguousRight = false
        }
  
        operator.y++
        contiguousDown = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor)
      }
    }
    console.log('presque fini')

    objects.push({id:currentid++, object:new FloodFill(imageData, currentColor)});
    addAction(objects[objects.length - 1]);
    drawObjects();
    console.log('fini')

  }