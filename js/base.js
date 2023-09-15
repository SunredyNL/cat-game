const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const scaledC = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 32) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 32))
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 203) {
            collisionBlocks.push(new CollisionBlock({
                position: { x: x * 18, y: y * 18 }
            }))
        }
    })
})

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 32) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 32))
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 203) {
            platformCollisionBlocks.push(new CollisionBlock({
                position: { x: x * 18, y: y * 18 }
            }))
        }
    })
})



const gravity = 0.5


const player = new Cat({
    position: {
        x: 50,
        y: 0,
    },
    collisionBlocks: collisionBlocks,
    imageSrc: './images/cat-idle.png',
});

const keys = {
    d: { pressed: false },
    a: { pressed: false }
}
const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './images/background.png',
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.scale(4, 4);
    c.translate(0, -background.image.height + scaledC.height)
    background.update();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })
    platformCollisionBlocks.forEach(block => {
        block.update();
    })
    player.spawn();
    player.movement.x = 0;
    if (keys.d.pressed) {
        player.movement.x = 4
    } else if (keys.a.pressed) {
        player.movement.x = -4;
    }
    c.restore();


}

animate();

window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        keys.d.pressed = true;
    } else if (event.key === "a") {
        keys.a.pressed = true;
    } else if (event.key === "w") {
        player.movement.y = -8;
    }
})
window.addEventListener("keyup", (event) => {
    if (event.key === "d") {
        keys.d.pressed = false;
    } else if (event.key === "a") {
        keys.a.pressed = false;
    }
})