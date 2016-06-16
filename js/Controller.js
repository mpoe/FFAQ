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
        switch (e.keyCode) {
            //UP
            case 38:
            case 87:
                Controller.mapMove(-1,0);
                break;
            //RIGHT
            case 39:
            case 68:
                Controller.mapMove(0,1);
                break;
            //DOWN
            case 40:
            case 83:
                Controller.mapMove(1,0);
                break;
            //LEFT
            case 37:
            case 65:
                Controller.mapMove(0,-1);
                break;
            // P
            case 80:
                if(PopUp.playerMenuContainer.visible){
                    Game.stage.removeChild(PopUp.playerMenuContainer)
                } else {
                    PopUp.playerMenu()
                }
                PopUp.playerMenuContainer.visible=!PopUp.playerMenuContainer.visible
                break;
        }
    },
    mapMove:function(row,col){
        var newHeroRow = Stage.hero.row+row;
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
            createjs.Tween.get(Stage.hero).to(
                {
                    x:newHeroCol*Game.blockSize,
                    y:newHeroRow*Game.blockSize
                },300)

            //Stage.hero.x = newHeroCol*Game.blockSize;
            //Stage.hero.y = newHeroRow*Game.blockSize;
            Stage.hero.row= newHeroRow;
            Stage.hero.col= newHeroCol;
        }
    },
    isPassable:function(r,c){
        switch(Stage.grid[r][c].type){
            case 0:
                return true;
                break;
            case 1:
                var r = Game.getRandomInt(1,4);
                if(r===1){
                    Stage.mapmusic.stop()
                    Stage.createCombat();
                }
                return true;
                break;
            case 2:
                return false;
                break;
            default:
                return true;
        }
    }
}