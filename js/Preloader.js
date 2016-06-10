/**
 * Created by Mpoe on 6/6/2016.
 */
var Preloader ={
    queue: new createjs.LoadQueue(true),
    loadText: new createjs.Text("", "50px Courier New", "#000"),
    loaderBar:new createjs.Container(),
    bar:new createjs.Shape(),
    imageContainer:new createjs.Container(),
    loaderWidth:300,
    loaderColor:createjs.Graphics.getRGB(247, 247, 247),
    load:function(){
        var barHeight = 20;
        this.bar.graphics.beginFill(this.loaderColor).drawRect(0, 0, 1, barHeight).endFill();
        this.imageContainer.x = 430;
        this.imageContainer.y = 200;
        Game.stage.addChild(this.imageContainer);
        var bgBar = new createjs.Shape();
        var padding = 3;
        bgBar.graphics.setStrokeStyle(1).beginStroke(this.loaderColor).drawRect(-padding / 2, -padding / 2, this.loaderWidth + padding, barHeight + padding);
        this.loaderBar.x = Game.stage.canvas.width - this.loaderWidth >> 1;
        this.loaderBar.y = Game.stage.canvas.height - barHeight >> 1;
        this.loaderBar.addChild(this.bar, bgBar);
        Game.stage.addChild(this.loaderBar);

        Game.stage.addChild(this.loadText);
        this.queue.on("progress", this.progress, this);
        this.queue.on("complete", Game.setup, Game);
        this.queue.loadManifest([
            //JS
            "js/Combat.js","js/Controller.js","js/Enemy.js","js/Game.js",
            "js/Item.js","js/Player.js","js/PopUp.js","js/Splash.js", "js/Stage.js","js/Ticker.js", "js/Weapon.js",
            //Images
            "img/bg/bg.jpg","img/cave.png","img/shop.jpg","img/mapbtn.png",
            "img/hero.png",
            "img/sprites/tiles.png","img/sprites/HeroTopDownSprite.png",

            {id:"bgtiles",src:"json/bgtiles.json"},
            {id:"herosheet",src:"json/heroAnim.json"},
            {id:"levelJson",src:"json/levels/levels.json"}
        ])
    },
    progress:function(e){
        this.loadText.text=Math.round(e.progress*100)+"% done";
        this.bar.scaleX = e.loaded * this.loaderWidth;
        Game.stage.update();
    }
}