class Cat extends Sprite {
    constructor({ position, collisionBlocks, imageSrc }) {
        super({ imageSrc });
        this.position = position
        this.movement = {
            x: 0,
            y: 1,
        }
        this.collisionBlocks = collisionBlocks;
    }
    spawn() {
        this.draw()
        this.position.x += this.movement.x;
        this.checkForHorizontalCollisions();
        this.gravity();
        this.checkForVerticialCollisions();
    }
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i += 1) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                if (this.movement.x > 0) {
                    this.movement.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
                if (this.movement.x < 0) {
                    this.movement.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
            }
        }
    }
    gravity() {
        this.position.y += this.movement.y;
        this.movement.y += gravity;
    }

    checkForVerticialCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i += 1) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                if (this.movement.y > 0) {
                    this.movement.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
                if (this.movement.y < 0) {
                    this.movement.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }
            }
        }
    }
}
