/**
 * Created by Mpoe on 6/6/2016.
 */
var Game = {
    stage:new createjs.Stage("canvas"),
    level:"",
    levelData:"",
    bgtiles:"",
    blockSize:60,
    heroTopDownSheet:"",
    types:["grass","fire","light","dark","water","electricity"],
    gameMuted:false,
    init:function(){
        Preloader.load()
    },
    setup:function(){
        if(Game.level===0){
            Game.level=0;
        }
        Game.stage.removeAllChildren();
        Ticker.start();
        Game.levelData = Preloader.queue.getResult('levelJson');

        //Load sprite data
        Game.bgtiles = new createjs.SpriteSheet(Preloader.queue.getResult('bgtiles'));
        Game.heroTopDownSheet = new createjs.SpriteSheet(Preloader.queue.getResult('herosheet'))
        Game.heroTopDownSheet.framerate = 5;
        Game.startGame();
    },
    startGame:function(){
        Enemy.setupEnemies();
        Weapon.setupWeapons();
        Item.setupItems();
        Game.level =0;
        Player.maxHealth=20;
        Stage.createTown();
        //Set hero attributes to default
    },
    getRandomInt:function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    playerAttack:function(){
        var wep = Weapon.activeWeapon();
    }
    
}