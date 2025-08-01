const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  },
  render: {
  pixelArt: true
  }
};



let player;
let zombie;
let cursors;
let playerScore = 0, aiScore = 0;
let playerScoreText, aiScoreText;

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('zombie', '../assets/zombie.png', {
    frameWidth: 80,
    frameHeight: 110
  });
}


function create() {
  const graphics = this.add.graphics();
  graphics.lineStyle(4, 0xff0000, 1);
  graphics.strokeRect(0, 0, 3000, 2000);
  this.physics.world.setBounds(0, 0, 3000, 2000);
  zombie = this.physics.add.sprite(400, 300, 'zombie');
  zombie.setCollideWorldBounds(true);
  this.cameras.main.setBounds(0, 0, 3000, 2000);
  this.cameras.main.startFollow(zombie);



  this.anims.create({
    key: 'parado',
    frames: [ { key: 'zombie', frame: 0 }, {key: 'zombie', frame: 23 }],
    frameRate: 2.5,
    repeat: -1
  });

  this.anims.create({
    key: 'correr.lado',
    frames: [ { key: 'zombie', frame: 9 }, { key: 'zombie', frame: 10 }],
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'correr.up',
    frames: [ { key: 'zombie', frame: 5 }, { key: 'zombie', frame: 6 } ],
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'correr.down',
    frames: [ { key: 'zombie', frame: 51 }, { key: 'zombie', frame: 49 } ],
    frameRate: 8,
    repeat: -1
  });

  zombie.setScale(1);
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setZoom(1);
}


function update() {
  const speed = 600;
  zombie.setVelocity(0);
  console.log("Câmera:", this.cameras.main.scrollX, this.cameras.main.scrollY);
  /* Movimento horizontal */
  if (cursors.left.isDown) {
    zombie.setVelocityX(-speed);
    zombie.anims.play('correr.lado', true);
    zombie.flipX = true; // vira o sprite pra esquerda
  } else if (cursors.right.isDown) {
    zombie.setVelocityX(speed);
    zombie.anims.play('correr.lado', true);
    zombie.flipX = false; // pra direita
  } else if (cursors.down.isDown) {
    zombie.setVelocityY(speed);
    zombie.anims.play('correr.up', true);
    zombie.flipX = false; // pra direita
  } else if (cursors.up.isDown) {
    zombie.setVelocityY(-speed);
    zombie.anims.play('correr.up', true);
  } else {
    zombie.anims.play('parado', true)
  }

}
