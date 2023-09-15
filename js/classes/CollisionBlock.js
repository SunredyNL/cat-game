class CollisionBlock {
    constructor({ position }) {
        this.position = position;
        this.width = 18;
        this.height = 18;
    }
    draw() {
        c.fillStyle = "rgba(255,0,0,1.5)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw();
    }
}