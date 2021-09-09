import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react'

const game = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  physics: {
      default: 'arcade',
      arcade: {
          debug: true
      }
  },
  scene: {
    preload: preload,
    init: init,
    create: create,
    update: update
  }
}

var player;

function preload() {
    this.load.image('samuraihelmet', 'assets/samuraihelmet.png');
    this.load.image('gray', 'assets/GrayBackground.png');
}

function init() {
  this.cameras.main.setBackgroundColor('#24252A')
}

function create() {

  player = this.physics.add.image(400, 300, 'samuraihelmet');
  player.setCollideWorldBounds(true);

  this.cursors = this.input.keyboard.createCursorKeys();

  var sprites = Array.from(Array(8).keys());
  for (let i = 0; i < sprites.length; i ++){
    sprites[i] = Array.from(Array(10).keys());
  }

  var rect = new Phaser.Geom.Polygon([
    0, 0,
    0, 225,
    400, 225,
    400, 0
  ]);

  let y = 100;
  let x = 100;

  for (let i = 0; i < sprites.length; i++){
    for (let j = 0; j < sprites[i].length; j++) {
      sprites[i][j] = this.add.sprite(x, y, 'gray').setScale(.25);
      x += 110;
      setZoneBehavior(sprites[i][j], rect);
    }
    x = 100;
    y += 70;
  }
}

function update() {
  player.setVelocity(0);

  if (this.cursors.left.isDown){
    player.setVelocityX(-200);
  } else if (this.cursors.right.isDown) {
    player.setVelocityX(200);
  } else if (this.cursors.up.isDown) {
    player.setVelocityY(-200);
  }  else if (this.cursors.down.isDown) {
    player.setVelocityY(200);
  }  
}

function setZoneBehavior(spriteIn, shape) {
  spriteIn.setInteractive(shape, Phaser.Geom.Polygon.Contains);
  spriteIn.on('pointerover', function () {
    spriteIn.setTint(0xfaaaaf);
  });
  spriteIn.on('pointerout', function () {
    spriteIn.clearTint();
  });
}

function Game() {
  return (
    <IonPhaser game={game} />
  )
}

export default Game;

