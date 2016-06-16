/**
 * Created by Mpoe on 6/6/2016.
 */
var Stage = {
    level:"",
    grid:"",
    hero:"",
    heroposX:"",
    heroposY:"",
    enemyBar:"",
    playerBar:"",
    townmusic:"",
    mapmusic:"",
    combatmusic:"",
    createTown:function(){
        Controller.disable();

        if(Player.items.length===0){
            Player.items.push(Item.items[0]);
        }
        Player.curHealth=Player.maxHealth;
        var bg = new createjs.Bitmap(Preloader.queue.getResult("img/bg/bg.jpg"));
        Game.stage.addChild(bg);

        if(Game.gameMuted) {
            var muted = new createjs.Bitmap(Preloader.queue.getResult("img/volume-mute.png"))
            muted.addEventListener("click",function(){
                Game.gameMuted=false;
                Stage.townmusic.play()
                Stage.createTown();
            })
            Game.stage.addChild(muted)
        }else{
            this.townmusic = createjs.Sound.play('townmusic');
            this.townmusic.volume = 0.05;
            var volume = new createjs.Bitmap(Preloader.queue.getResult("img/volume.png"))
            volume.addEventListener("click",function(){
                Game.gameMuted=true;
                Stage.townmusic.stop();
                Stage.createTown();
            })
            Game.stage.addChild(volume)
        }

        var shop = new createjs.Bitmap(Preloader.queue.getResult("img/shop.jpg"));
        shop.x = 573;
        shop.y = 270;
        shop.addEventListener("click",PopUp.shop);
        Game.stage.addChild(shop);
        
        var blacksmith = new createjs.Bitmap(Preloader.queue.getResult("img/blacksmith.png"))
        blacksmith.x = 260;
        blacksmith.y = 216;
        blacksmith.addEventListener("click",PopUp.blacksmith);
        Game.stage.addChild(blacksmith);

        var cave = new createjs.Bitmap(Preloader.queue.getResult("img/cave.png"));
        cave.x = 135;
        cave.y = 260;
        cave.addEventListener("click",PopUp.quest);
        Game.stage.addChild(cave);

        var mapbtn = new createjs.Bitmap(Preloader.queue.getResult("img/mapbtn.png"));
        mapbtn.x =20;
        mapbtn.y =435;
        mapbtn.addEventListener("click",function(){
            Stage.createMap()
            Stage.townmusic.stop();
        });
        Game.stage.addChild(mapbtn);

        // Set level to -1 since you have to start over
        Game.level = 0;
    },
    createMap:function(returnrow,returncol){
        createjs.Ticker.setFPS(15);
        Game.stage.removeAllChildren();

        Controller.enable();
        var row,col;
        Stage.grid=[];

        Stage.level = Game.levelData.levels[Game.level].tiles;
        var heroRow, heroCol;

        for(row=0;row<Stage.level.length;row++) {
            Stage.grid.push([]);
            for (col = 0; col < Stage.level[row].length; col++) {
                var img;
                switch (Stage.level[row][col]) {
                    case 0:
                        img = "floor"
                        break;
                    case 1:
                        img = "grass"
                        break;
                    case 2:
                        img = "wall"
                        break;
                    case 3:
                        img = "exit"
                        break;
                    case 4:
                        heroCol = col;
                        heroRow = row;
                        img = "floor"
                        break;
                }
                var t = new createjs.Sprite(Game.bgtiles, img)
                t.x = col * Game.blockSize;
                t.y = row * Game.blockSize;
                Stage.grid[row].push(t);
                t.row = row;
                t.col = col;
                t.type = Stage.level[row][col];
                if(t.type===4){
                    t.type=0;
                }

                Game.stage.addChild(t);
            }
        }

        Stage.hero = new createjs.Sprite(Game.heroTopDownSheet,'idle');
        //console.log("Pre function: " + Stage.hero.x + ", col: " + heroCol + " returnCol: " + returncol)
        if(returncol===undefined){
            Stage.hero.x = heroCol*Game.blockSize;
            Stage.hero.col = heroCol;
        }else{
            Stage.hero.x = returncol*Game.blockSize
            Stage.hero.col = returncol;
        }

        //console.log("Pre function: " + Stage.hero.y + ", row: " + heroRow + " returnRow: " + returnrow)

        if(returnrow===undefined){
            Stage.hero.y = heroRow*Game.blockSize;
            Stage.hero.row = heroRow;
        }else{
            Stage.hero.y = returnrow*Game.blockSize;
            Stage.hero.row = returnrow;
        }

        //console.log("After function: " + Stage.hero.x + ", col: " + Stage.hero.col + " returnCol: " + returncol)
        //console.log("After function: " + Stage.hero.y + ", row: " + Stage.hero.row + " returnRow: " + returnrow)

        Stage.hero.row= returnrow || heroRow;
        Stage.hero.col= returncol || heroCol;

        Stage.hero.addEventListener("animationend",function(){
            Stage.hero.gotoAndPlay("idle");
        })

        if(Game.gameMuted) {
            var muted = new createjs.Bitmap(Preloader.queue.getResult("img/volume-mute.png"))
            muted.addEventListener("click",function(){
                Game.gameMuted=false;
                Stage.mapmusic.play()
                Stage.createMap(Stage.hero.row,Stage.hero.col);
            })
            Game.stage.addChild(muted)
        }else {
            this.mapmusic = createjs.Sound.play('mapmusic');
            this.mapmusic.volume = 0.35;
            var volume = new createjs.Bitmap(Preloader.queue.getResult("img/volume.png"))
            volume.addEventListener("click", function () {
                Game.gameMuted = true;
                Stage.mapmusic.stop();
                Stage.createMap(Stage.hero.row,Stage.hero.col);
            })
            Game.stage.addChild(volume)
        }

        Game.stage.addChild(Stage.hero);
    },
    createCombat:function(){
        Controller.disable();
        Stage.heroposX=Stage.hero.col;
        Stage.heroposY=Stage.hero.row;
        Game.stage.removeAllChildren();
        
        var bg = new createjs.Bitmap(Preloader.queue.getResult("img/combatbg/combatbg1.png"))
        Game.stage.addChild(bg);

        var chero = new createjs.Bitmap(Preloader.queue.getResult("img/combathero.png"))
        chero.x= 50;
        chero.y= Game.stage.canvas.height-300; //height of picture is 231
        Game.stage.addChild(chero);

        var nme =Enemy.addEnemy();

        Stage.playerBar = HPBar.createBar(127,247,127,50,Game.stage.canvas.height-40,Player.curHealth,Player.maxHealth,Player);
        Stage.enemyBar = HPBar.createBar(247,127,127,550,Game.stage.canvas.height-40,nme.curHealth,nme.maxHealth,nme);

        if(Game.gameMuted) {
            var muted = new createjs.Bitmap(Preloader.queue.getResult("img/volume-mute.png"))
            muted.addEventListener("click",function(){
                Game.gameMuted=false;
                Stage.combatmusic.play()
            })
            Game.stage.addChild(muted)
        }else {
            this.combatmusic=new createjs.Sound.play("combatmusic")
            this.combatmusic.volume=0.2;
            var volume = new createjs.Bitmap(Preloader.queue.getResult("img/volume.png"))
            volume.addEventListener("click", function () {
                Game.combatmusic = true;
                Stage.combatmusic.stop();
            })
            Game.stage.addChild(volume)
        }
        PopUp.combatMenu(nme);
    },
    endCombat:function(){
        Stage.combatmusic.stop();
        Stage.createMap(Stage.heroposY,Stage.heroposX);
    },
    stageLevelUp:function(){
        Game.level++;
    }
}