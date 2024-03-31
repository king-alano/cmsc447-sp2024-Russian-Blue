import { MainMenuScene } from './start_menu/mainmenu.js';
import { NewGameScene, PickYourStarterScene, TutorialScene } from './start_menu/newgame.js';
import { LoadGameScene } from './start_menu/loadgame.js';
import { OptionsScene } from './start_menu/options.js';

// game configs
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    scene: [MainMenuScene, NewGameScene, PickYourStarterScene, TutorialScene, LoadGameScene, OptionsScene],
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
new Phaser.Game(config);