var SpaceHipster = SpaceHipster || {};

SpaceHipster.GameState = {

  //initiate game settings
  init: function() {
    //use all the area, don't distort scale
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.physics.arcade.gravity.y = 1000;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

  },

  //load the game assets before the game starts
  preload: function() {



     this.load.image('player', 'assets/images/messi.png');
     this.load.image('ground', 'assets/images/ground.png');
     this.load.image('arco','assets/images/arco.PNG');
     this.load.image('arco2','assets/images/arco2.PNG');
     this.load.image('player2','assets/images/Ronaldo.png');
     this.load.image('ball','assets/images/ball.png');
     this.load.image('travesano','assets/images/travesano.png');
     this.load.image('travesano2','assets/images/travesano2.png');
     this.load.image('parante','assets/images/parante.png');
     this.load.image('parante2','assets/images/parante2.png');

  },
  create: function() {


    //ground
     this.ground = this.add.tileSprite(this.game.world.X, this.game.world.height -72, this.game.world.width * 2, 72,'ground');
     this.game.physics.arcade.enable(this.ground);
     this.ground.body.immovable = true;
     this.ground.body.allowGravity = false;


    // player
     this.player = this.add.sprite(this.game.world.width - 150, this.game.world.height-144, 'player');
     this.player.anchor.setTo(0.5);
     this.player.scale.setTo(-1,1);
     this.game.physics.arcade.enable(this.player);
     this.player.body.collideWorldBounds = true;

     //player2
     this.player2 = this.add.sprite(140,this.game.world.height - 88,'player2');
     this.player2.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.player2);
     this.player2.body.collideWorldBounds = true;


     //ball
     this.ball = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'ball');
     this.ball.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.ball);
     this.ball.body.collideWorldBounds = true;
     this.ball.allowGravity = true;
     this.ball.body.checkCollision.up = true;
     this.ball.body.checkCollision.down = true;
     this.ball.body.velocity.setTo(200,200);
     this.ball.body.gravity.set(0,100);
     this.ball.body.bounce.set(0.7);


    //arco
    this.arco = this.add.sprite(60,this.game.world.height-175,'arco');
    this.arco.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.arco);
    this.arco.body.collideWorldBounds = false;
    this.arco.body.immovable = true;
    this.arco.body.allowGravity = false;

    //travesano
     this.travesano = this.add.sprite(60,this.game.world.height-275,'travesano');
     this.travesano.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.travesano);
     this.travesano.body.collideWorldBounds = false;
     this.travesano.body.immovable = true;
     this.travesano.body.allowGravity = false;

    //Parante
     this.parante = this.add.sprite(20,this.game.world.height-175,'parante');
     this.parante.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.parante);
     this.parante.body.collideWorldBounds = false;
     this.parante.body.immovable = true;
     this.parante.body.allowGravity = false;

    //Arco2
    this.arco2 = this.add.sprite(this.game.world.width - 60, this.game.world.height-175,'arco2');
    this.arco2.anchor.setTo(0.5);
    this.arco2.scale.setTo(-1,1);
    this.game.physics.arcade.enable(this.arco2);
    this.arco2.body.collideWorldBounds = false;
    this.arco2.body.immovable = true;
    this.arco2.body.allowGravity = false;

    //travesano2
     this.travesano2 = this.add.sprite(this.game.world.width - 60,this.game.world.height-275,'travesano2');
     this.travesano2.anchor.setTo(0.5);
     this.travesano2.scale.setTo(-1,1);
     this.game.physics.arcade.enable(this.travesano2);
     this.travesano2.body.collideWorldBounds = false;
     this.travesano2.body.immovable = true;
     this.travesano2.body.allowGravity = false;

     //Parante
     this.parante2 = this.add.sprite(this.game.world.width - 20,this.game.world.height-175,'parante2');
     this.parante2.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.parante2);
     this.parante2.body.collideWorldBounds = false;
     this.parante2.body.immovable = true;
     this.parante2.body.allowGravity = false;

  },
  update: function() {


    this.game.physics.arcade.collide(this.ball, this.ground);
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player2,this.ground);
    this.game.physics.arcade.overlap(this.ball,this.arco);
    this.game.physics.arcade.overlap(this.ball,this.arco2);
    this.game.physics.arcade.overlap(this.ball,this.player,this.rebound.bind(this),this.kick.bind(this),this.collidedown.bind(this));
    this.game.physics.arcade.overlap(this.ball,this.player2,this.rebound2.bind(this),this.kick2.bind(this),this.collidedown2.bind(this));
    this.game.physics.arcade.collide(this.player,this.arco);
    this.game.physics.arcade.collide(this.player2,this.arco);
    this.game.physics.arcade.collide(this.player,this.arco2);
    this.game.physics.arcade.collide(this.player2,this.arco2);
    this.game.physics.arcade.collide(this.ball,this.travesano);
    this.game.physics.arcade.collide(this.ball,this.travesano2);
    this.game.physics.arcade.collide(this.ball,this.parante,this.win.bind(this));
    this.game.physics.arcade.collide(this.ball,this.parante2,this.win.bind(this));




    if(this.cursors.left.isDown) {
      this.player.body.velocity.x = -180;
      this.player.scale.setTo(-1,1);
      this.player.play('walking');
    }else if(this.player.body.velocity.x < 0){
      this.player.body.velocity.x += 8;
    }

    if(this.cursors.right.isDown) {
      this.player.body.velocity.x = 180;
      this.player.scale.setTo(1,1);
      this.player.play('walking');
    }else if(this.player.body.velocity.x > 0){
      this.player.body.velocity.x -= 8;
    }

    if((this.cursors.up.isDown || this.player.isjumping)  && this.player.body.touching.down) {
      this.player.body.velocity.y = -450;
    }



  },
  jump: function(){
    this.player.isjumping = true;
  },
  dontJump: function(){
    this.player.isjumping = false;
  },
  win: function(){
    alert('You Win');
    this.game.state.start('GameState');
  },
  rebound: function(player,ball){
      this.ball.body.velocity.x = -200;
  },
   rebound2: function(player,ball){
      this.ball.body.velocity.x = 200;
  },
  kick: function(ball,player){
    if(this.keyS.isDown){
      this.ball.body.velocity.x = -300;
      this.ball.body.velocity.y = -600;
    }
  },
  kick2: function(ball,player){
    if(this.keyS.isDown){
      this.ball.body.velocity.x = 300;
      this.ball.body.velocity.y = 600;
    }
  },
  collidedown: function(player,ball){
    if(player.body.touching.down){
      this.ball.body.velocity.y = -100;
      this.ball.body.velocity.x = -50;
    }
  },
  collidedown2: function(player,ball){
    if(player.body.touching.down){
      this.ball.body.velocity.y = 100;
      this.ball.body.velocity.x = 50;
    }
  }
}
