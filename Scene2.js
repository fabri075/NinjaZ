class Scene2 extends Phaser.Scene {
    constructor() {
      super('nivel1');
    }
    preload()
    {
        this.load.tilemapTiledJSON('nivel1', 'assets/lvl1.json');
        this.load.image('Tileset', 'Assets/Tileset.png');
        this.load.image('Fondo', 'Assets/Fondo2.png');
        this.load.image('bala', 'Assets/Kunai.png');
        this.load.spritesheet('Ninja', 'Assets/Ninja.png', { frameWidth: 232, frameHeight: 439 });
        this.load.spritesheet('Caminar', 'Assets/Run.png', { frameWidth: 363, frameHeight: 440 });
        this.load.spritesheet('Ataque', 'Assets/Throw.png', { frameWidth: 377, frameHeight: 440 });
        this.load.spritesheet('Saltar', 'Assets/Jump.png', { frameWidth: 362, frameHeight: 483 });
        
    };
    create() 
    {   
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Fondo')
         let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
        mapa = this.make.tilemap({key : 'nivel1'})
        var tileset = mapa.addTilesetImage('Niveluno', 'Tileset');
        var solidos = mapa.createDynamicLayer('Solidos', tileset, 0, 0);
        solidos.setCollisionByProperty({solido: true});
        scoreText = this.add.text(1200, 30, 'Puntaje: ' + score, { fontSize: '50px', fill: 'white', fontFamily: 'Boogaloo', align: 'center'});
        
        jugador = this.physics.add.sprite(190, 400, 'Ninja').setScale(0.3);
        arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        atacar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.add.collider(jugador, solidos);
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.startFollow(jugador);
        scoreText.setScale(scale).setScrollFactor(0);

        bala = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bala');
            
            this.speed = Phaser.Math.GetSpeed(800, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x, y);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            if(jugador.flipX === false){
            this.flipX = false;
            this.x += this.speed * delta;
            }
            else
            {   
                this.flipX = true;
                this.x -= this.speed * delta;
            }
            if (this.x > (jugador.x + 300) || this.x < (jugador.x - 300))
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }
        });
        balas = this.add.group({
            classType: bala,
            maxSize: 5,
            runChildUpdate: true,
        });

        this.anims.create({
            key: 'quieto',
            frames: [ { key: 'Ninja', frame: 0 } ],
            frameRate: 10,
        });
        this.anims.create({
            key: 'correr',
            frames: this.anims.generateFrameNumbers('Caminar', { start: 0, end: 4}),
            frameRate: 10
        });

        this.anims.create({
            key: 'salto',
            frames: [ { key: 'Saltar', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'atacar',
            frames: this.anims.generateFrameNumbers('Ataque', { start: 4, end: 5}),
            frameRate: 10
        });

    }

    update()
    {
     jugador.body.setVelocityX(0);
    
      
    if(izquierda.isDown){
        jugador.body.setVelocityX(-velocidad);
        jugador.flipX = true;
    }
    if(derecha.isDown){
        jugador.body.setVelocityX(velocidad);
        jugador.flipX = false;
    }

    if(arriba.isDown && jugador.body.onFloor()){
        jugador.body.setVelocityY(salto);
        jugador.anims.play('salto');
    }
    if((izquierda.isDown || derecha.isDown) && jugador.body.onFloor()){
        jugador.anims.play('correr',true);
    }else if(!jugador.body.onFloor()){
        jugador.anims.play('salto', true);
    }else {
        jugador.anims.play('quieto')
    }
    
    if (atacar.isDown){
        jugador.anims.play('atacar')
        
    }
    if (Phaser.Input.Keyboard.JustDown(atacar)){
        var bullet = balas.get();

        if (bullet)
        {
            bullet.fire(jugador.x, jugador.y);
        }
    }
   
  
   
}
}