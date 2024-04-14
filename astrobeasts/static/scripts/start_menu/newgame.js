// second scene - new game
import * as WebFontLoader from '../webfontloader.js'
export class NewGameScene extends Phaser.Scene {
    constructor() {
        super('NewGame');
    }


    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
    }

    create() {
        // need to scale background image properly
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        const introText = "a long time ago in a galaxy far, far away....";
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const displayText = this.add.text(centerX, centerY - 50, '', { font: '30px', color: '#ffffff', align: 'center', wordWrap: { width: 600 } }).setOrigin(0.5,0.5);

        // add typing effect event
        let index = 0;
        this.time.addEvent({
            delay: 120, // how fast text is typed
            callback: () => {
                displayText.text += introText[index++]; // display letters one by one
            },
            repeat: introText.length - 1
        });

        const nextButtonX = this.cameras.main.width - 100; 
        const nextButtonY = this.cameras.main.height - 50;
        // next button to go to tutorial
        const nextButton = this.add.text(nextButtonX, nextButtonY, 'Next >', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(0.5, 0.5); 

        nextButton.on('pointerdown', () => {
            this.scene.start('NameInput'); 
        });
        
        nextButton.on('pointerover', () => {
            nextButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        nextButton.on('pointerout', () => {
            nextButton.setStyle({ fill: '#0f0'}); 
        });

        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                displayText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                nextButton.setFontFamily('"Press Start 2P"').setColor('#0f0')
            }
        }) 
    }
}

export class NameInputScene extends Phaser.Scene {
    constructor() {
        super('NameInput')
    }
    
    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.load.image('dude','static/assets/Objects/astronaut.png'); // just used a random placeholder image for our player
    }

    create() {
        // need to scale background image properly
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

       // calculated left side of screen and right side of screen
        const left = this.cameras.main.height / 2;
        const textX = 3 * this.cameras.main.width / 4; 

        const nameQuestion = this.add.text(textX, 200, 'What is your name?', { color: '#0f0',  align: 'center' }).setOrigin(0.5, 0);
        let errorText = this.add.text(0,0,'')
         // create form for user to input info
         // will need to make it look pretty with bootstrap!
         const formHtml = `
            <input type="text" name="nameField" placeholder="Enter your name">
            <button type="button" name="playButton">OK</button>
        `;

        // create the form, using dom module (which gives the ability to interact with HTML objects on our phaser canvas)
        let element = this.add.dom(textX, 300).createFromHTML(formHtml).setOrigin(0.5);
        
        element.addListener('click');
        element.on('click', (event) => {
            if (event.target.name === 'playButton') {
                let inputText = document.querySelector('input[name="nameField"]'); // player name
 
                if (inputText instanceof HTMLInputElement && inputText.value !== '') {
                    this.registry.set('playerName', inputText.value);
                    this.scene.start('PickYourStarter');
                } else {
                    errorText = this.add.text(textX, 400, 'Please input a name!', { color: '#fff', align: 'center' }).setOrigin(0.5, 0);
                }
            }
        });
        let player = this.add.image(200, left, 'dude').setOrigin(0.5, 0.5);

        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                nameQuestion.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                errorText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
            }
        }) 
        
    }
}

export class PickYourStarterScene extends Phaser.Scene {
    constructor() {
        super('PickYourStarter');
    }
    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.load.image('skol', 'static/assets/Objects/skol.png');
        this.load.image('tarkeel', 'static/assets/Objects/tarkeel.png');
    }
    create() {
        // below is the "here are your starters" screen
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

        // player name from registery
        const playerName = this.registry.get('playerName');

        const centerX = this.cameras.main.width / 2;
        const left = centerX / 2;
        const right = 3 * centerX / 2;
        const imageY = 250; 
        const textYOffset = 100; // bottom of the image and top of the text margin


       const text1 = this.add.text(centerX, 50, `Here are your starter AstroBeasts, \n${playerName}!`, {font: '20px', color: '#0f0', align: 'center'}).setOrigin(0.5, 0);

        // skol
        const skolX = this.cameras.main.width / 4;
        const skol_name = this.add.text(left, 150, "Skol", {color: '#0f0', align: 'center'}).setOrigin(0.5, 0.5);
        this.add.image(skolX, imageY, 'skol').setOrigin(0.5, 0.5).setScale(0.5);;
        const skolinfo = this.add.text(skolX, imageY + textYOffset, "Level 1\nRarity: Common\nClass: Balanced\nATK: 300\nDEF: 250\nDEX: 300\nSPD: 300\nLUK: 250", { color: '#0f0', align: 'center' }).setOrigin(0.5, 0);

        // tarkeel
        const tarkeelX = 3 * this.cameras.main.width / 4; 
        const tarkeel_name = this.add.text(right, 150, "Tarkeel", {color: '#0f0', align: 'center'}).setOrigin(0.5, 0.5);
        this.add.image(tarkeelX, imageY, 'tarkeel').setOrigin(0.5, 0.5).setScale(0.5);;
        const tarkeel_info = this.add.text(tarkeelX, imageY + textYOffset, "Level 1\nRarity: Common\nClass: Assassin\nATK: 194\nDEF: 128\nDEX: 448\nSPD: 500\nLUK: 130", { color: '#0f0', align: 'center' }).setOrigin(0.5, 0);

        const nextButtonX = this.cameras.main.width - 100; 
        const nextButtonY = this.cameras.main.height - 50;

       // next button to go to tutorial
        const nextButton = this.add.text(nextButtonX, nextButtonY, 'Next >', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(0.5, 0.5); 

        nextButton.on('pointerdown', () => {
            this.scene.start('Tutorial'); 
        });
        
        nextButton.on('pointerover', () => {
            nextButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        nextButton.on('pointerout', () => {
            nextButton.setStyle({ fill: '#0f0'}); 
        });

        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                text1.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                skol_name.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                skolinfo.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                tarkeel_name.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                tarkeel_info.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                nextButton.setFontFamily('"Press Start 2P"').setColor('#0f0')
            }
        }) 
    }
}

export class TutorialScene extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.tutorialStep = 0;
    }

    create() {
        this.askForTutorial();
    }

    askForTutorial() {
        // asks the user if they want a tutorial or not. if not, proceed to loadgame.js
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const question = this.add.text(centerX, centerY - 50, 'Would you like a tutorial of the game?', { color: '#0f0', align: 'center' })
            .setOrigin(0.5, 0.5);

        
        const yesButton = this.add.text(centerX - 100, centerY + 50, 'Yes', { color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5);

        yesButton.on('pointerdown', () => {
            // if yes, start tutorial
            // currently leaving empty until more of the gameplay is completed in order to have accurate tutorial
        });

        const noButton = this.add.text(centerX + 100, centerY + 50, 'No', { color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5);

        noButton.on('pointerdown', () => {
            // if no, load game 
            this.scene.start('LoadHub');
        });

        [yesButton, noButton].forEach(button => {
            button.on('pointerover', () => {
                button.setStyle({ fill: '#fff' });
            });

            button.on('pointerout', () => {
                button.setStyle({ fill: '#0f0' });
            });
        });

        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                question.setFontFamily('"Press Start 2P"')
                yesButton.setFontFamily('"Press Start 2P"')
                noButton.setFontFamily('"Press Start 2P"')
            }
        }) 
    }

}