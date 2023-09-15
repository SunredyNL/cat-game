class Cat {
    constructor({ position }) {
        this.position = position
        this.movement = {
            x: 0,
            y: 1,
        }
        this.width = 100;
        this.height = 100;
    }
    design() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    spawn() {
        this.design()
        this.position.x += this.movement.x;
        this.gravity();
    }
    gravity() {
        this.position.y += this.movement.y;
        this.movement.y += gravity;
    }

}

