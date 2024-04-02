
//BATTLE Options - TO DO: Make this reference the list of moves available
const ATTACK_LIST = Object.freeze({
    MOVE_1: 'Slash',
    MOVE_2: 'CrossSlash',
    MOVE_3: 'Bite',
    MOVE_4: 'Tackle',
});



//Run/Fight/Item/Scan - Should be CONSTANT?
const PLAYER_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    FLEE: 'FLEE',
    ITEM: 'ITEM',
    SCAN: 'SCAN',
});



const MessageTextStyle = {

    color:'Blue',
    fontSize: '22px',
    fontStyle: 'bold',
}


const MenuOptionsTextStyle = {

    color: 'red',
    fontSize: '20px',
    fontStyle: 'bold',
}

export class CombatMenu {
    #scene;
    #battleOpt;
    #fightOpt;

    #BattleText;
    #FightText;

   
    #fightSlash;
    #fightMessage;

    #RenderMessage

    

    
    constructor(scene) {    
        this.#scene = scene;
        this.#createDialog();
        this.#createBattleOptions();
        this.#createFightOptions();
 
        this.#promptItem();
        this.#Slashfight();
    }




 //Create the Dialog Box.
 #createDialog()
 {
     const rHeight = 94; 
     
     this.#scene.add
         .rectangle(
         3, 
         this.#scene.scale.height-rHeight-3, //height-1/2 padding
         this.#scene.scale.width-6, //width minus padding
         rHeight, 
         0xede4f3,//sets background color for text box
         1
         ).setOrigin(0)
         .setStrokeStyle(6,0x00b2e3,1) //sets border on text box (6 pixels, color)
 
 }
 
 //Create Run/Fight/Scan options. 
 #createBattleOptions()
 {
    this.#BattleText = this.#scene.add.text(400, 540, "Your Orders, Sir?", MessageTextStyle);
     
    this.#battleOpt = this.#scene.add.container(0,500, [
     this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
     this.#scene.add.image(245,52, 'rightkey').setScale(0.5),
     this.#scene.add.image(110,20,'upkey').setScale(0.5),
     this.#scene.add.image(110,80,'downkey').setScale(0.5),

     this.#scene.add.text(125,15, PLAYER_OPTIONS.FIGHT, MenuOptionsTextStyle),
     this.#scene.add.text(55,43,PLAYER_OPTIONS.FLEE,MenuOptionsTextStyle),
     this.#scene.add.text(180,43,PLAYER_OPTIONS.ITEM, MenuOptionsTextStyle),
     this.#scene.add.text(125,70, PLAYER_OPTIONS.SCAN,MenuOptionsTextStyle),
     ]);

     this.battleOptionsOff();
     
 }

 //Create options for Player Moves
 #createFightOptions()
 {
  this.#FightText = this.#scene.add.text(55,540,'What Do You Want To Do?', MessageTextStyle)

  this.#fightOpt =  this.#scene.add.container(400,500, [
  this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
  this.#scene.add.image(285,52, 'rightkey').setScale(0.5),
  this.#scene.add.image(150,20,'upkey').setScale(0.5),
  this.#scene.add.image(150,80,'downkey').setScale(0.5),

  this.#scene.add.text(170,15, ATTACK_LIST.MOVE_1, MenuOptionsTextStyle),
  this.#scene.add.text(55,43, ATTACK_LIST.MOVE_2,  MenuOptionsTextStyle),
  this.#scene.add.text(220,43, ATTACK_LIST.MOVE_3, MenuOptionsTextStyle),
  this.#scene.add.text(170,70, ATTACK_LIST.MOVE_4,MenuOptionsTextStyle),
  ]);

   this.fightOptionsOff();
 
 }

//Show Item Used Text
 #promptItem()
 {    

    this.#RenderMessage = this.#scene.add.text(400, 540, "blank", MessageTextStyle);
    this.RenderMessageOff();

}

battleOptionsOn()
{
     //Add MenuOptions - Player Options container
         this.#battleOpt.setAlpha(1); 
         this.#BattleText.setAlpha(1);
}
battleOptionsOff()
{
     //Add MenuOptions - Player Options container
         this.#battleOpt.setAlpha(0);
         this.#BattleText.setAlpha(0);
}


fightOptionsOn()
{
 this.#fightOpt.setAlpha(1);
 this.#FightText.setAlpha(1);

}
fightOptionsOff()
{
 this.#fightOpt.setAlpha(0);
 this.#FightText.setAlpha(0);

}


managedInFightScene()
{
    this.battleOptionsOff();

    this.fightOptionsOn();

}

managedInBattleScene()
{
    this.battleOptionsOn();
    this.fightOptionsOff();


}

RenderMessageOff()
{
    this.#RenderMessage.setAlpha(0);
}

RenderMessageOn()
{
    this.#RenderMessage.setAlpha(1);
}

playerInput(entry)
{
    if (entry == 'FIGHT')
    {
        this.managedInFightScene();
        return;
    }
    if (entry == 'FLEE')
    {
        console.log("YOU are FLEEING")
        //Return to main battle menu?
        this.#scene.start("Highscore")
        return;
        
    }
    if (entry == 'SCAN')
    {
        console.log("YOU are SCANNING")
    }
    if (entry == 'ITEM')
    {
        console.log("ITEM")
        
        this.battleOptionsOff();
        this.#RenderMessage.setText(`You Used An Item`)
        this.RenderMessageOn();
        
        this.#scene.time.delayedCall(2500, this.battleOptionsOn, null, this )
        this.#scene.time.delayedCall(2500, this.RenderMessageOff, null, this)

        this.item = this.#scene.add.sprite(615, 200, 'blueitem').setScale(3);
        this.item.anims.play('blueitem',true)
        
        return;
            
    }


}


playerFightInputSelect(entry)
{

  //Player Attacks
   
        this.fightOptionsOff(),

        this.#RenderMessage.setText(`You Used ${entry}`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(2000, this.RenderMessageOff, null, this )
    
        //Reduce Enemy Life

    //     this.#RenderMessage.setText(`Your Enemy Loses HP`); 
    //     this.RenderMessageOn();      
    //     this.#scene.time.delayedCall(1000, this.RenderMessageOff, null, this )
     

    //     //Check Enemy is still alive

    //     //Enemy Attacks

    //     var attack = "WHOMP"
    //     this.#RenderMessage.setText(`Your Enemy Uses ${attack}`); 
    //     this.RenderMessageOn();      
    //     this.#scene.time.delayedCall(1000, this.RenderMessageOff, null, this )

    //     //Reduce Player Life

    //     this.#RenderMessage.setText(`You have lost HP`); 
    //     this.RenderMessageOn();      
    //     this.#scene.time.delayedCall(1000, this.RenderMessageOff, null, this )
        
    //     //Check Player is still alive

    // //Return
    this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
    // return;
    
}


#Slashfight()
{
    var A = "slash"
        this.#fightSlash = this.#scene.add.text(
        200,
        300,
        "Slash",
        {
            color:'Red',
            fontSize: '40px',
            fontStyle: 'bold italic',
        }),

   this.slashOff();
}

slashOff()
{
    this.#fightSlash.setAlpha(0);
}
slashOn()
{
    this.#fightSlash.setAlpha(1);
}



}
