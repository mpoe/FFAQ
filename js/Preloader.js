/**
 * Created by Mpoe on 6/6/2016.
 */
var Preloader ={
    queue: new createjs.LoadQueue(true),
    loadText: new createjs.Text("", "50px Courier New", "#000"),
    loaderBar:new createjs.Container(),
    bar:new createjs.Shape(),
    loaderWidth:300,
    loaderColor:createjs.Graphics.getRGB(247, 247, 247),
    load:function(){
        var barHeight = 20;
        this.bar.graphics.beginFill(this.loaderColor).drawRect(0, 0, 1, barHeight).endFill();
        var bgBar = new createjs.Shape();
        var padding = 3;
        bgBar.graphics.setStrokeStyle(1).beginStroke(this.loaderColor).drawRect(-padding / 2, -padding / 2, this.loaderWidth + padding, barHeight + padding);
        this.loaderBar.x = Game.stage.canvas.width - this.loaderWidth >> 1;
        this.loaderBar.y = Game.stage.canvas.height - barHeight >> 1;
        this.loaderBar.addChild(this.bar, bgBar);
        Game.stage.addChild(this.loaderBar);

        Game.stage.addChild(this.loadText);
        this.queue.installPlugin(createjs.Sound)
        this.queue.on("progress", this.progress, this);
        this.queue.on("complete", Game.setup, Game);
        this.queue.loadManifest([
            //JS
            "js/Combat.js","js/Controller.js","js/Enemy.js","js/Game.js","js/HPBar.js",
            "js/Item.js","js/Player.js","js/PopUp.js","js/Stage.js","js/Ticker.js", "js/Weapon.js",
            "img/bg/bg.jpg","img/cave.png","img/shop.jpg","img/blacksmith.png","img/mapbtn.png",
            "img/hero.png",
            "img/sprites/tiles.png","img/sprites/HeroTopDownSprite.png",
            "img/combathero.png","img/combatbg/combatbg1.png",
            "img/enemy1.png","img/enemy2.png","img/enemy3.png","img/enemy4.png",
            "img/volume.png","img/volume-mute.png",
            {id:"bgtiles",src:"json/bgtiles.json"},
            {id:"herosheet",src:"json/heroAnim.json"},
            {id:"levelJson",src:"json/levels/levels.json"},
            {id:"attack",src:"aud/attack.mp3"},
            {id:"buy",src:"aud/buy.wav"},
            {id:"combatmusic",src:"aud/combatmusic.mp3"},
            {id:"levelup",src:"aud/levelup.mp3"},
            {id:"mapmusic",src:"aud/mapmusic.mp3"},
            {id:"nomoney",src:"aud/nomoney.mp3"},
            {id:"townmusic",src:"aud/townmusic.mp3"}
        ])
    },
    progress:function(e){
        this.loadText.text=Math.round(e.progress*100)+"% done";
        this.bar.scaleX = e.loaded * this.loaderWidth;
        console.log(e.progress)
        Game.stage.update();
    }
}