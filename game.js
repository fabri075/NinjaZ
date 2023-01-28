var config = {
    type: Phaser.AUTO,
     scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1100 },
            debug: false
        
        }

    },
    scene: [Scene2, Scene1],
    
};

var game = new Phaser.Game(config);
var jugador;
var cursors;
var mapa;
var arriba;
var izquierda;
var derecha;
var atacar;
var scoreText;
var score = 0;
var bala;
var balas;
const salto = -700;
const velocidad = 350;