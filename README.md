# Cat bed!
[Help the kitty get home!](https://sunredynl.github.io/cat-game/)

# Description
Cat bed is a cute platformer stylised in pixel art. The main goal of the game is to help the cat get back to his cat bed using the A/D/W keys to move/jump while avoiding spikes.

# MVP
- cat can move across the map using following keys: A - left, D - right, W - jump,
- due to collision recognision, the cat does not fall through ground or platforms,
- the player starts with 3 health,
- if the cat sprite touches a spike, the health is depleted,
- stage is won when the cat reaches their cat bed,

# Backlog
- sprite animations for when the cat is walking
- sprite animations for when the cat is jumping
- sprite animations for when the cat is falling
- implement gravity (the longer the fall, the faster the cat falls),
- visible heart (health) counter,
- hearts are being removed by 1 if the cat takes damage,
- audio queue whenever cat takes damage,
- audio queue whenever cat reaches the cat bed,
- background music throughout the whole level,
- level 2/3,
- camera following the cat,

# Techs used
- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Canvas
- JS Classes and methods
- JS Audio() and JS Image()
- JS scale()

# Data structure
## base.js
- animate();

## CollisionBlocks.js
class CollisionBlock
- constructor (this.position,this.width,this.height)
- draw()
- update()

class SpikeBlock
- constructor (this.position,this.width,this.height)
- draw()
- update()

class WinBlock
- constructor (this.position,this.width,this.height)
- draw()
- update()

## sprite.js
class Sprite
- constructor(position, imageSrc,frameRate,frameBuffer,scale)
- draw()
- update()
- updateFrames()

## player.js
class Cat - extends sprite.js
- constructor (position,collisionBlocks,platformCollisionBlocks,spikeBlocks,winBlocks,imageSrc,frameRate,scale,animations,health,hurtSound,winSound)
- switchSprite(key)
- updateCameraBox()
- shouldPanCameraToTheLeft()
- shouldPanCameraToTheRight()
- shouldPanCameraDown()
- shouldPanCameraUp()
- spawn()
- updateHitbox()
- checkForHorizontalCollisions()
- gravity()
- checkForVerticialCollisions()
- checkForSpikes()
- checkForWin()
- gameOver()

# States
- start screen
- game screen
- lost game screen
- won game screen

# Links
- [Slides Link](https://docs.google.com/presentation/d/1ruG6Dz030i7_yLkl5-3tN74Y1CePXqoFPdsZvjwu3o4/edit?usp=sharing)
- [Github repo link](https://github.com/SunredyNL/cat-game)
- [Deployment Link](https://sunredynl.github.io/cat-game/)