const startButton = document.getElementById('start-button')
const startScreen = document.getElementById('start')
const healthV = document.getElementById('health')

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const scaledC = {
    width: canvas.width / 4,
    height: canvas.height / 4
}
const spikes2D = [];
for (let i = 0; i < spikesLayout.length; i += 32) {
    spikes2D.push(spikesLayout.slice(i))
}
const spikeBlocks = []
spikes2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 69) {
            spikeBlocks.push(new SpikeBlock({
                position: { x: x * 18, y: y * 18 }
            }))
        }
    })
})


const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 34) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 34))
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
        x: 85,
        y: 300,
    },
    collisionBlocks: collisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks,
    imageSrc: './images/cat-idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: './images/cat-idle.png',
            frameRate: 8,
            image: new Image(),
            frameBuffer: 8,
        },
        Run: {
            imageSrc: './images/walking.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        Jump: {
            imageSrc: './images/catjump.png',
            frameRate: 4,
            frameBuffer: 10,
        },
        Fall: {
            imageSrc: './images/catfall.png',
            frameRate: 4,
            frameBuffer: 10,
        },
        RunLeft: {
            imageSrc: './images/walkingleft.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        JumpLeft: {
            imageSrc: './images/catjumpleft.png',
            frameRate: 4,
            frameBuffer: 10,
        },
        FallLeft: {
            imageSrc: './images/catfallleft.png',
            frameRate: 4,
            frameBuffer: 10,
        },
    }
});

const keys = {
    d: { pressed: false },
    a: { pressed: false }
}
const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './images/background.png',
})
const camera = {
    position: {
        x: 0,
        y: -432 + scaledC.height,
    }
}
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.scale(4, 4);
    c.translate(camera.position.x, camera.position.y)
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
        player.switchSprite("Run");
        player.movement.x = 2
        player.shouldPanCameraToTheLeft({ canvas, camera });
    } else if (keys.a.pressed) {
        player.switchSprite("RunLeft");
        player.movement.x = -2;
        player.shouldPanCameraToTheRight({ canvas, camera });
    } else if (player.movement.y === 0) {
        player.switchSprite("Idle");
    }
    if (player.movement.y < 0) {
        player.switchSprite("Jump")
        player.shouldPanCameraDown({ canvas, camera })
    }
    else if (player.movement.y > 0) {
        player.switchSprite("Fall")
        player.shouldPanCameraUp({ camera, canvas })
    }
    if (player.movement.y < 0 && keys.a.pressed) player.switchSprite("JumpLeft");
    else if (player.movement.y > 0 && keys.a.pressed) player.switchSprite("FallLeft");
    c.restore();


}
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    healthV.style.display = "block";
    animate();
})



let jumpLimit = 0

window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        keys.d.pressed = true;
    } else if (event.key === "a") {
        keys.a.pressed = true;
    } else if (event.key === "w") {
        jumpLimit += 1
        if (jumpLimit < 2) {
            player.movement.y = -9;
            setTimeout(() => {
                jumpLimit = 0;
            }, 500)
        }
    }
})
window.addEventListener("keyup", (event) => {
    if (event.key === "d") {
        keys.d.pressed = false;
    } else if (event.key === "a") {
        keys.a.pressed = false;
    }
})