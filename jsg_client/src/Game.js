
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react'

const game = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: {
    init: init,
    create: create,
    update: update
  }
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
}

function update() {
  this.helloWorld.angle += 1;
}

function Game() {
  return (
    <IonPhaser game={game} />
  )
}

export default Game;

