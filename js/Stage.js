/**
 * Created by Mpoe on 6/6/2016.
 */
var Stage = {
    level:"",
    grid:"",
    hero:"",
    heroposX:"",
    heroposY:"",
    createTown:function(){
        Controller.disable();
        var bg = new createjs.Bitmap(Preloader.queue.getResult("img/bg/bg.jpg"));
        Game.stage.addChild(bg);

        var shop = new createjs.Bitmap(Preloader.queue.getResult("img/shop.jpg"));
        shop.x = 573;
        shop.y = 270;
        shop.addEventListener("click",PopUp.shop);
        Game.stage.addChild(shop);

        var cave = new createjs.Bitmap(Preloader.queue.getResult("img/cave.png"));
        cave.x = 135;
        cave.y = 260;
        cave.addEventListener("click",PopUp.quest);
        Game.stage.addChild(cave);

        var mapbtn = new createjs.Bitmap(Preloader.queue.getResult("img/mapbtn.png"));
        mapbtn.x =20;
        mapbtn.y =435;
        mapbtn.addEventListener("click",Stage.createMap);
        Game.stage.addChild(mapbtn);

        // Set level to -1 since you have to start over
        Game.level = 0;
    },
    createMap:function(r,c){
        createjs.Ticker.setFPS(15);
        Game.stage.removeAllChildren();
        Controller.enable();

        var row,col;
        Stage.grid=[];

        console.log("Map clicked")

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
                        console.log("Found hero at", row,col)
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
        Stage.hero.x = c*Game.blockSize || heroCol*Game.blockSize;
        Stage.hero.y = r*Game.blockSize || heroRow*Game.blockSize;
        Stage.hero.row= r || heroRow;
        Stage.hero.col= c || heroCol;
        Stage.hero.addEventListener("animationend",function(){
            Stage.hero.gotoAndPlay("idle");
        })
        Game.stage.addChild(Stage.hero);
    },
    createCombat:function(){
        Stage.heroposX=Stage.hero.col;
        Stage.heroposY=Stage.hero.row;
        Game.stage.removeAllChildren();
        Stage.endCombat();
    },
    endCombat:function(){
        Stage.createMap(Stage.heroposY,Stage.heroposX);
    },
    stageLevelUp:function(){
        Game.level++;
    }
}