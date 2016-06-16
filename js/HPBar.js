/**
 * Created by Mpoe on 6/13/2016.
 */
var HPBar = {
    createBar:function(r,g,b,x,y,curHP,maxHP,source){
        var hpBar = new createjs.Container();
        var bar = new createjs.Shape();
        var hpWidth = 200;
        var hpColor = createjs.Graphics.getRGB(r, g, b);
        var bgBar = new createjs.Shape();
        var padding = 3;
        var barHeight=20;

        bar.graphics.beginFill(hpColor).drawRect(0, 0, 1, barHeight).endFill();

        bgBar.graphics.setStrokeStyle(2).beginStroke("#000").drawRect(-padding / 2, -padding / 2, hpWidth + padding, barHeight + padding);
        bar.scaleX = source.curHealth/source.maxHealth * hpWidth;

        hpBar.x = x;
        hpBar.y = y;

        hpBar.addChild(bar, bgBar);

        Game.stage.addChild(hpBar);

        var hpText = new createjs.Text("", "20px Courier New", "#000")
        hpText.text = curHP+"/"+maxHP;
        hpText.x= hpWidth/2;
        hpText.textAlign="center";
        hpBar.addChild(hpText);
        hpBar.hpText=hpText;
        hpBar.bar=bar;
        return hpBar;
    },
    updateText:function(cont,curHP,maxHP,source){
        cont.hpText.text= curHP+"/"+maxHP;
        cont.bar.scaleX = source.curHealth/source.maxHealth * 200;//hpWidth monkey code
    }
}