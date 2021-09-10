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

function preload() {
    this.load.image('gray', 'assets/GrayBackground.png');
}

function init() {
  this.cameras.main.setBackgroundColor('#24252A')
}

function create() {

  //const text = this.add.text(50, 50, 'TopText').setFont('24px Arial').setColor('#ffffff');
  const uiItems = {
    // Values
    text: this.add.text(50, 50, 'Clicked: (X, X)').setFont('24px Arial').setColor('#ffffff'),
    numDisplay: this.add.text(250, 50, 'Count: 0').setFont('24px Arial').setColor('#ffffff'),
    num: 0,

    // Methods
    incNum: incNum
  };

  this.zones = Array.from(Array(8).keys());
  for (let i = 0; i < this.zones.length; i ++){
    this.zones[i] = Array.from(Array(10).keys());
  }

  var rect = new Phaser.Geom.Polygon([
    0, 0,
    0, 225,
    400, 225,
    400, 0
  ]);

  let y = 150;
  let x = 100;
  let s;

  for (let i = 0; i < this.zones.length; i++){
    for (let j = 0; j < this.zones[i].length; j++) {
      this.zones[i][j] = this.add.sprite(x, y, 'gray').setScale(.25);
      s = "("+i.toString()+","+j.toString()+")";
      this.zones[i][j].setName(`${s}`);
      x += 110;
      setZoneBehavior(this.zones[i][j], rect, uiItems);
    }
    x = 100;
    y += 70;
  }
}

function update() {

}

function setZoneBehavior(spriteIn, shape, uiObj) {
  spriteIn.setInteractive(shape, Phaser.Geom.Polygon.Contains);
  spriteIn.on('pointerover', function () {
    if (!spriteIn.isTinted){
      spriteIn.setTint(0xfaaaaf);
    }
  });
  spriteIn.on('pointerout', function () {
  });
  spriteIn.on('pointerdown', function () {
    uiObj.text.setText("Clicked: "+spriteIn.name);
    uiObj.incNum();
    if (spriteIn.isTinted){
      spriteIn.clearTint();
      return;
    }
    spriteIn.setTint(0xf2222f);
  })
}

function incNum() {
  this.num += 1;
  this.numDisplay.setText("Count: "+this.num.toString());
}

function Game() {
  return (
    <IonPhaser game={game} />
  )
}

export default Game;

