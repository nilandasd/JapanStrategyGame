import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react'

const game = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  player: 0,
  cursors: 0,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: {
    preload: preload,
    init: init,
    create: create,
    update: update
  }
}

function preload() {
    this.load.image('samuraihelmet', 'assets/samuraihelmet.png');
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
  this.player = this.physics.add.image(400, 300, 'samuraihelmet');
  this.player.setCollideWorldBounds(true);
  this.cursors = this.input.keyboard.createCursorKeys();
  this.helloWorld.setOrigin();
}

function update() {
  this.helloWorld.angle += 1;
  this.player.setVelocity(0);

  if (this.cursors.left.isDown){
    this.player.setVelocityX(-200);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
  } else if (this.cursors.up.isDown) {
    this.player.setVelocityY(-200);
  }  else if (this.cursors.down.isDown) {
    this.player.setVelocityY(200);
  }  
}

function Game() {
  return (
    <IonPhaser game={game} />
  )
}

export default Game;

