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
  
  let y = 150;
  let x = 100;
  let s;

  const rect = new Phaser.Geom.Polygon([
    0, 0,
    0, 225,
    400, 225,
    400, 0
  ]);

  // UI
  const uiItems = {
    // Values
    text: this.add.text(50, 50, 'Clicked: (X, X)').setFont('24px Arial').setColor('#ffffff'),
    numDisplay: this.add.text(250, 50, 'Count: 0').setFont('24px Arial').setColor('#ffffff'),
    num: 0,

    // Methods
    incNum: incNum
  };

  // Board
  this.board = {
    // Values
    zones: [],

    // Methods
  };
  
  // Init Board Zones
  this.board.zones = Array.from(Array(8).keys());
  for (let i = 0; i < this.board.zones.length; i ++){
    this.board.zones[i] = Array.from(Array(10).keys());
  }
  
  // Set Zone Behavior and size
  for (let i = 0; i < this.board.zones.length; i++){
    for (let j = 0; j < this.board.zones[i].length; j++) {
      this.board.zones[i][j] = {
        sprite: this.add.sprite(x, y, 'gray').setScale(.25),
        text: this.add.text(x-5, y-7, '0').setFont('18px Arial').setColor('#ffffff').setAlign('center'),
        id: (i.toString()+"x"+j.toString()),
        count: 0,
        alignment: 0,

        incCount: incCount
      };
      s = "("+i.toString()+","+j.toString()+")";
      this.board.zones[i][j].sprite.setName(`${s}`);
      x += 110;
      setZoneBehavior(this.board.zones[i][j], rect, uiItems);
    }
    x = 100;
    y += 70;
  }
}

function update() {
  for (let i = 0; i < this.board.zones.length; i++){
    for (let j = 0; j < this.board.zones[i].length; j++) {
      if (this.board.zones[i][j].alignment > 0){
        this.board.zones[i][j].sprite.setTint(0xfaaaaf);
      }
    }
  }
}

function setZoneBehavior(zone, shape, uiObj) {
  zone.sprite.setInteractive(shape, Phaser.Geom.Polygon.Contains);
  zone.sprite.on('pointerover', function () {

  });
  zone.sprite.on('pointerout', function () {

  });
  zone.sprite.on('pointerdown', function () {
    uiObj.text.setText("Clicked: "+zone.sprite.name);
    zone.incCount();
    zone.alignment = 1;
    uiObj.incNum();
  })
}

function incNum() {
  this.num += 1;
  this.numDisplay.setText("Count: "+this.num.toString());
}

function incCount() {
  this.count += 1;
  this.text.setText(this.count.toString());
}

function Game() {
  return (
    <IonPhaser game={game} />
  )
}

export default Game;

