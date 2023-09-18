class Cat extends Sprite {
    constructor({ position, collisionBlocks, platformCollisionBlocks, imageSrc, frameRate, scale = 0.75, animations }) {
        super({ imageSrc, frameRate, scale });
        this.position = position
        this.movement = {
            x: 0,
            y: 1,
        }
        this.platformCollisionBlocks = platformCollisionBlocks;
        this.collisionBlocks = collisionBlocks;
        this.animations = animations

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image
        }
        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },

            width: 200,
            height: 80,
        }
    }
    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return;
        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;
    }
    updateCameraBox() {
        this.camerabox = {
            position: {
                x: this.position.x - 80,
                y: this.position.y - 30,
            },

            width: 200,
            height: 80,
        }
    }
    shouldPanCameraToTheLeft({ canvas, camera }) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width / 4
        if (cameraboxRightSide >= 576) return;
        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.movement.x
        }
    }
    shouldPanCameraToTheRight({ canvas, camera }) {
        if (this.camerabox.position.x <= 0) return;
        if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.movement.x
        }
    }
    shouldPanCameraDown({ canvas, camera }) {
        if (this.camerabox.position.y + this.movement.y <= 0) return;
        if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.movement.y
        }
    }
    shouldPanCameraUp({ canvas, camera }) {
        if (this.camerabox.position.y + this.camerabox.height + this.movement.y >= 432) return;
        if (this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + canvas.height / 4) {
            camera.position.y -= this.movement.y
        }
    }
    spawn() {
        this.updateFrames();
        this.updateHitbox();
        this.updateCameraBox();
        this.draw()
        this.position.x += this.movement.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.gravity();
        this.updateHitbox();
        this.checkForVerticialCollisions();

    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 3.5,
                y: this.position.y + 8.5,
            },
            width: 15.5,
            height: 11,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i += 1) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.movement.x > 0) {
                    this.movement.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
                if (this.movement.x < 0) {
                    this.movement.x = 0;
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
            }
        }
    }
    gravity() {
        this.movement.y += gravity;
        this.position.y += this.movement.y;
    }

    checkForVerticialCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i += 1) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.movement.y > 0) {
                    this.movement.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
                if (this.movement.y < 0) {
                    this.movement.y = 0;

                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }
        for (let i = 0; i < this.platformCollisionBlocks.length; i += 1) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.movement.y > 0) {
                    this.movement.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }
                if (this.movement.y < 0) {
                    this.movement.y = 0;

                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = platformCollisionBlock.position.y + platformCollisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }
    }
}
