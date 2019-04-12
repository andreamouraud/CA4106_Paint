class ImageObject {
    constructor(data, width, height) {
        this.data = data;
        this.name = "Image";
        this.type = "Image";
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.drawImage(this.data, 0, 0, this.width, this.height);
    }
}