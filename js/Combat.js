/**
 * Created by Mpoe on 6/6/2016.
 */
var Combat = {
    playerAttack:function(nme){
        var wep = Player.playerWeapons[Player.activeWeapon];
        var dmg = Game.getRandomInt(wep.mindmg,wep.maxdmg);
        Combat.enemyDamage(dmg,nme);
    },
    enemyAttack:function(nme){
        var dmg = Game.getRandomInt(nme.mindmg,nme.maxdmg)
        Combat.playerDamage(dmg)
    },
    playerDamage:function(dmg){
        Player.curHealth-=dmg;
        HPBar.updateText(Stage.playerBar,Player.curHealth,Player.maxHealth,Player)
        if(Player.curHealth<=0){
            Stage.combatmusic.stop();
            window.alert("Defeated, you lost all your gold")
            Player.gold=0;
            Stage.createTown(); // can also be game over
            Player.curHealth=Player.maxHealth;
        }
    },
    enemyDamage:function(damage,enemy){
        if(Game.gameMuted){
            
        }else{
            createjs.Sound.play("attack")
        }
        var wep = Player.playerWeapons[Player.activeWeapon];
        switch (wep.type){
            case "grass":
            case "electricity":
                if(enemy.type ==="water"){
                    damage = Math.round(damage*=1.5);
                }
                break;
            case "fire":
                if(enemy.type==="grass"){
                    damage = Math.round(damage*=1.5);
                }
                break;
            case "light":
                if(enemy.type==="dark"){
                    damage = Math.round(damage*=1.5);
                }
                break;
            case "dark":
                if(enemy.type==="light"){
                    damage = Math.round(damage*=1.5);
                }
                break;
            case "water":
                if(enemy.type==="fire"){
                    damage = Math.round(damage*=1.5);
                }
                break;
        }
        enemy.curHealth-=damage;
        HPBar.updateText(Stage.enemyBar,enemy.curHealth,enemy.maxHealth,enemy)
        if(enemy.curHealth <=0){
            var gold =Game.getRandomInt(enemy.mingold,enemy.maxgold);
            Player.gold+=gold
            window.alert("Defeated enemy, you earned "+gold+" gold");
            Player.xp+=enemy.xp;
            Player.levelUp();
            Stage.endCombat();
        }else{
            Combat.enemyAttack(enemy);
        }
    }
}