/**
 * Created by Mpoe on 6/6/2016.
 */
var Controller = {
    enable:function(){
        window.onkeydown=this.keyDown;
    },
    disable:function(){
        window.onkeydown=false;
    },
    keyDown:function(e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            //UP
            case 38 || 87:
                console.log("no w?")
                Controller.mapMove(-1,0);
                break;
            //RIGHT
            case 39 || 68:
                Controller.mapMove(0,1);
                break;
            //DOWN
            case 40 || 83:
                console.log("down")
                Controller.mapMove(1,0);
                break;
            //LEFT
            case 37 || 65:
                Controller.mapMove(0,-1);
                break;
        }
    },
    mapMove:function(row,col){
        console.log(Stage.hero.row);
        console.log(row);
        var newHeroRow = Stage.hero.row+row;
        console.log(newHeroRow)
        var newHeroCol = Stage.hero.col+col;
        
        if(col<0){
            Stage.hero.gotoAndPlay("left");
        }else{
            Stage.hero.gotoAndPlay("right");
        }
        if(row>0){
            Stage.hero.gotoAndPlay("down");
        }else if(row<0){
            Stage.hero.gotoAndPlay("up");
        }
        
        if(Controller.isPassable(newHeroRow,newHeroCol)){
            console.log("Test")
            createjs.Tween.get(Stage.hero).to({
                x:newHeroCol*Game.blockSize,
                y:newHeroRow*Game.blockSize},300)

            //Stage.hero.x = newHeroCol*Game.blockSize;
            //Stage.hero.y = newHeroRow*Game.blockSize;
            Stage.hero.row= newHeroRow;
            Stage.hero.col= newHeroCol;
        }
    },
    isPassable:function(r,c){
        console.log(Stage.grid[r][c].type)
        switch(Stage.grid[r][c].type){
            case 0:
                console.log("floor")
                return true;
                break;
            case 1:
                console.log("Grass")
                var r = Game.getRandomInt(1,4);
                if(r===1){
                    Stage.createCombat();
                }
                return true;
                break;
            case 2:
                console.log("wall")
                return false;
                break;
            default:
                console.log("default")
                return true;
        }
    }
}