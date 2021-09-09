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
  this.helloWorld = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY,
    "Hello World", {
      font: "40px Arial",
      fill: "#ffffff"
    }
  );
  this.helloWorld.setOrigin();

  player = this.physics.add.image(400, 300, 'samuraihelmet');
  player.setCollideWorldBounds(true);

  this.cursors = this.input.keyboard.createCursorKeys();

  var sprite = this.add.sprite(200, 100, 'gray').setScale(.5);
  var rect = new Phaser.Geom.Polygon([
    0, 0,
    0, 225,
    400, 225,
    400, 0
  ]);
  sprite.setInteractive(rect, Phaser.Geom.Polygon.Contains);
  sprite.on('pointerover', function () {
    sprite.setTint(0xfaaaaf);
  });
  sprite.on('pointerout', function () {
    sprite.clearTint();
  });
}

function update() {
  this.helloWorld.angle += 1;
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


function Game() {
  return (
    <IonPhaser game={game} />
  )
}

export default Game;

