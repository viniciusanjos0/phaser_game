const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
let player1;

let cursors;
let playerScore = 0, aiScore = 0;
let playerScoreText, aiScoreText;

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('zombie', '../assets/zombie.png', {
    frameWidth: 128,
    frameHeight: 128
  });
}


function create() {
  this.physics.world.setBounds(0, 0, 800, 600); // limites do mundo iguais à tela
  zombie = this.physics.add.sprite(400, 300, 'zombie');
  zombie.setCollideWorldBounds(true);


  this.anims.create({
    key: 'parado',
    frames: [ { key: 'zombie', frame: 0 }, { key: 'zombie', frame: 1 }, { key: 'zombie', frame: 2 }, { key: 'zombie', frame: 3 }, { key: 'zombie', frame: 2 }, { key: 'zombie', frame: 1 }],
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: 'correr_right',
    frames: [ { key: 'zombie', frame: 148 }, { key: 'zombie', frame: 149 }, { key: 'zombie', frame: 150 }, { key: 'zombie', frame: 151 }, { key: 'zombie', frame: 152 }, { key: 'zombie', frame: 153 }, { key: 'zombie', frame: 154 }, { key: 'zombie', frame: 155 },],
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'correr_y.up',
    frames: [ { key: 'player2', frame: 35 }, { key: 'player2', frame: 37 } ],
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'correr_y.down',
    frames: [ { key: 'player2', frame: 51 }, { key: 'player2', frame: 49 } ],
    frameRate: 8,
    repeat: -1
  });

  zombie.setScale(1);
  cursors = this.input.keyboard.createCursorKeys();
  
}


function update() {
  const speed = 150;
  zombie.setVelocity(0);

  /* Movimento horizontal */
  if (cursors.left.isDown) {
    player1.setVelocityX(-speed);
    player1.anims.play('correr_x', true);
    player1.flipX = false; // vira o sprite pra esquerda
  } else if (cursors.right.isDown) {
    zombie.setVelocityX(speed);
    zombie.anims.play('correr_right', true);
    zombie.flipX = true; // pra direita
  } else if (cursors.down.isDown) {
    player1.setVelocityY(-speed);
    player1.anims.play('correr_y.down', true);
  } else if (cursors.up.isDown) {
    player1.setVelocityY(speed);
    player1.anims.play('correr_y.up', true);
  } else {
    zombie.anims.play('parado', true)
  }

  zombie.anims.play('parado', true)
}
