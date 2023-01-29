class Scene1 extends Phaser.Scene {
    constructor() {
      super('Menu');
    }

    preload()
    {
        this.load.image('Fondo', './Assets/Fondo2.png')
        this.load.spritesheet('Ninja', './Assets/Ninja.png', { frameWidth: 32, frameHeight: 48 })
    }

    
}