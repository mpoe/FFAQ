/**
 * Created by Mpoe on 6/6/2016.
 */
var Player = {
    maxHealth:"",//Check 
    activeWeapon:0,
    playerWeapons:[],
    items:[],
    gold:0,
    curHealth:this.maxHealth,
    xp:0,
    level:1,
    changeWeapon:function(i){
        Player.activeWeapon=i;
    },
    useItem:function(name,index){
        switch(name){
            case "Small pot":
                Player.curHealth+=8;//Monkey code
                if(Player.curHealth>Player.maxHealth){
                    Player.curHealth=Player.maxHealth;
                }
                HPBar.updateText(Stage.playerBar,Player.curHealth,Player.maxHealth,Player)
                break;
            case "Large pot":
                Player.curHealth+=20;
                if(Player.curHealth>Player.maxHealth){
                    Player.curHealth=Player.maxHealth;
                }
                HPBar.updateText(Stage.playerBar,Player.curHealth,Player.maxHealth,Player)
                break;
            case "Full restore":
                Player.curHealth+=Player.maxHealth;
                if(Player.curHealth>Player.maxHealth){
                    Player.curHealth=Player.maxHealth;
                }
                HPBar.updateText(Stage.playerBar,Player.curHealth,Player.maxHealth,Player)
                break;
        }
        Player.items.splice(index,1);

        PopUp.itemMenu();
    },
    levelUp:function(){
        if(Player.xp>Player.level*50*1.35){
            Player.maxHealth+=5;
            Player.curHealth = Player.maxHealth;
            Player.level++;
            if(Game.gameMuted){}
            else{
                createjs.Sound.play("levelup")
            }

            alert("Level up! gained 5 hp, you are healed to max hp")
        }
    },
    buyItem:function(i){
        if(Player.gold>Item.items[i].price && Player.items.length<3){
            if(Game.gameMuted){}
            else {
                createjs.Sound.play("buy")
            }
            Player.items.push(Item.items[i]);
        }else{
            if(Game.gameMuted){}
            else {
                createjs.Sound.play("nomoney")
            }
            alert("Not enough money/full inventory")
        }
    },
    buyWeapon:function(i){
        if(Player.gold>Weapon.weapons[i].price){
            if(Game.gameMuted){}
            else {
                createjs.Sound.play("buy")
            }
            Player.playerWeapons.push(Weapon.weapons[i]);
            Weapon.weapons.splice(i,1);
            Game.stage.removeChild(PopUp.bsMenuContainer);
            if(Weapon.weapons.length===0){

            }else{
                PopUp.blacksmith();
            }
        }else{
            if(Game.gameMuted){}
            else {
                createjs.Sound.play("nomoney")
            }
            alert("Not enough money")
        }
    }
}