import { MainMenuScene } from './start_menu/mainmenu.js';
import { NewGameScene } from './start_menu/newgame.js';
import { LoadGameScene } from './start_menu/loadgame.js';
import { OptionsScene } from './start_menu/options.js';
import { Preload } from './combat/preload.js';
import { CombatScene }  from './combat/combat.js';

// game configs
const config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    scale: { 
       
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT
    },
     parent: 'gameContainer',
    scene: [MainMenuScene, NewGameScene, LoadGameScene, OptionsScene, Preload, CombatScene],
       dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

// create game instance using game config from above
const game = new Phaser.Game(config);

//If loading directly to combat, uncomment the following line:
game.scene.start('Preload');