/**
 * Created by Mpoe on 6/6/2016.
 */
var Enemy = {
    enemies:[],
    setupEnemies:function(){
        Enemy.enemies.push(Enemy.createEnemy("enemy1.png", 8,"Red devil",1,2,6,8,"fire",10));
        Enemy.enemies.push(Enemy.createEnemy("enemy2.png", 25,"Moss monster", 2,2,5,13,"grass",40));
        Enemy.enemies.push(Enemy.createEnemy("enemy3.png", 13,"Dark imp", 2,5,10,15, "dark",20));
        Enemy.enemies.push(Enemy.createEnemy("enemy4.png", 30,"Sea man",1,4,10,12, "water",30));
    },
    createEnemy:function(file, maxHealth, name, minDmg, maxDmg, minGold, maxGold, type,xp){
        var e = new createjs.Bitmap(Preloader.queue.getResult("img/"+file))
        e.maxHealth = maxHealth;
        e.name = name;
        e.mindmg = minDmg;
        e.maxdmg = maxDmg;
        e.mingold= minGold;
        e.maxgold= maxGold;
        e.type=type;
        e.xp=xp
        return e;
    },
    addEnemy:function(){
        var nme = Enemy.enemies[Game.getRandomInt(0,Enemy.enemies.length-1)]
        nme.x = 550;
        nme.y = Game.stage.canvas.height-300; //height of picture is 231
        nme.maxHealth = nme.maxHealth;
        nme.curHealth = nme.maxHealth;
        Game.stage.addChild(nme);
        return nme;
    }
}