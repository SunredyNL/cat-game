const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

class Cat {
    constructor(position) {
        this.position = position
        this.movement = {
            x: 0,
            y: 1,
        }
        this.height = 100;
    }
    design() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }
    spawn() {
        this.design()
        this.position.y += this.movement.y;
        this.position.x += this.movement.x;
        if (this.position.y + this.height + this.movement.y < canvas.height) {
            this.movement.y += gravity;
        } else {
            this.movement.y = 0;
        }
    }
}

const player = new Cat({ x: 0, y: 0 });

const keys = {
    d: { pressed: false },
    a: { pressed: false }
}
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.spawn();
    player.movement.x = 0;
    if (keys.d.pressed) {
        player.movement.x = 1
    } else if (keys.a.pressed) {
        player.movement.x = -1;
    }
}

animate();

window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        keys.d.pressed = true;
    } else if (event.key === "a") {
        keys.a.pressed = true;
    } else if (event.key === "w") {
        player.movement.y = -15;
    }
})
window.addEventListener("keyup", (event) => {
    if (event.key === "d") {
        keys.d.pressed = false;
    } else if (event.key === "a") {
        keys.a.pressed = false;
    }
})