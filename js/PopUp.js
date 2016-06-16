/**
 * Created by Mpoe on 6/6/2016.
 */
var PopUp = {
    weaponMenuContainer:null,
    itemMenuContainer:null,
    bsMenuContainer:null,
    playerMenuContainer:new createjs.Container(),
    shop:function(){
        var shopCon = new createjs.Container();
        for(var i =0; i<Item.items.length;i++){
            var item = Item.items[i];
            var itemCon = new createjs.Container();
            var itemImg = new createjs.Bitmap(Preloader.queue.getResult("img/"+item.file));
            itemImg.y=i*50;
            var itemText= new createjs.Text(item.name, "30px Courier New", "#000")
            itemText.x=50;
            itemText.y=i*50;
            var whitebg = new createjs.Shape();
            whitebg.graphics.beginFill("#eee");
            whitebg.graphics.drawRect(50,i*50,250,50);

            whitebg.number=i
            itemText.number=i
            itemImg.number=i;

            itemCon.addChild(whitebg);
            itemCon.addChild(itemText);
            itemCon.addChild(itemImg);
            //itemCon.number=i;

            shopCon.addChild(itemCon)

        }
        for(var s=0;s<shopCon.numChildren;s++){
            for(var c=0;c<shopCon.getChildAt(s).numChildren;c++) {
                var child = shopCon.getChildAt(s).getChildAt(c);
                child.addEventListener("click", function (e) {
                    Player.buyItem(e.target.number);
                })
            }
        }
        shopCon.x = 300;
        shopCon.y = 50;
        Game.stage.addChild(shopCon);
    },
    blacksmith:function(){
        if(Weapon.weapons.length===0){
            alert("No more items to buy")
        }
        PopUp.bsMenuContainer = new createjs.Container();
        for(var i =0; i<Weapon.weapons.length;i++){
            var wep = Weapon.weapons[i];
            var wepCon = new createjs.Container();
            var wepImg = new createjs.Bitmap(Preloader.queue.getResult("img/"+wep.file));
            wepImg.y=i*50;
            var wepText= new createjs.Text(wep.name + " dmg: "+wep.mindmg+"-"+wep.maxdmg+ " Price: " + wep.price, "20px Courier New", "#000")
            wepText.x=50;
            wepText.y=i*50;
            var whitebg = new createjs.Shape();
            whitebg.graphics.beginFill("#eee");
            whitebg.graphics.drawRect(50,i*50,400,50);

            whitebg.number=i
            wepText.number=i
            wepImg.number=i;

            wepCon.addChild(whitebg);
            wepCon.addChild(wepText);
            wepCon.addChild(wepImg);

            PopUp.bsMenuContainer.addChild(wepCon)

        }
        for(var w=0;w<PopUp.bsMenuContainer.numChildren;w++){
            for(var c=0;c<PopUp.bsMenuContainer.getChildAt(w).numChildren;c++) {
                var child = PopUp.bsMenuContainer.getChildAt(w).getChildAt(c);
                child.addEventListener("click", function (e) {
                    Player.buyWeapon(e.target.number);
                })
            }
        }
        PopUp.bsMenuContainer.x = 150;
        PopUp.bsMenuContainer.y = 50;
        Game.stage.addChild(PopUp.bsMenuContainer);
    },
    quest:function(){
        window.alert("Not implemented")
        console.log("Quest Clicked");
    },
    combatMenu:function(nme){
        PopUp.weaponMenuContainer=new createjs.Container();
        PopUp.weaponMenuContainer.x = 520; // 20 for at little padding
        PopUp.weaponMenuContainer.y = 150; // From start of weapons
        PopUp.weaponMenuContainer.visible=false;

        PopUp.itemMenuContainer=new createjs.Container();
        PopUp.itemMenuContainer.x=520;
        PopUp.itemMenuContainer.y=200;
        PopUp.itemMenuContainer.visible=false;

        var menuCon = new createjs.Container();
        menuCon.x = 300;
        menuCon.y = 100;

        var att = new createjs.Container();
        var attText = new createjs.Text("Attack", "45px Courier New", "#000");
        attText.addEventListener("click", function(){
            Combat.playerAttack(nme);
        });
        attText.textAlign = "center";
        attText.x = 100;
        var greybg = new createjs.Shape();
        greybg.graphics.beginFill("#aaa");
        greybg.graphics.drawRect(0,0,200,50);
        greybg.addEventListener("click", function(){
            Combat.playerAttack(nme);
        });
        att.addChild(greybg);
        att.addChild(attText);




        var wep = new createjs.Container();
        var wepText = new createjs.Text("Weapons", "45px Courier New", "#000");
        wepText.addEventListener("click", function(){
            if(PopUp.weaponMenuContainer.visible){
                Game.stage.removeChild(PopUp.weaponMenuContainer)
            } else {
                PopUp.weaponMenu()
            }
            PopUp.weaponMenuContainer.visible=!PopUp.weaponMenuContainer.visible
        })
        wepText.textAlign = "center";
        wepText.x = 100;
        wepText.y = 50;
        var whitebg = new createjs.Shape();
        whitebg.graphics.beginFill("#eee");
        whitebg.graphics.drawRect(0,50,200,50);
        whitebg.addEventListener("click", function(){
            if(PopUp.weaponMenuContainer.visible){
                Game.stage.removeChild(PopUp.weaponMenuContainer)
            } else {
                PopUp.weaponMenu()
            }
            PopUp.weaponMenuContainer.visible=!PopUp.weaponMenuContainer.visible
        });
        wep.addChild(whitebg);
        wep.addChild(wepText);






        var item = new createjs.Container();
        var itemText = new createjs.Text("Item", "45px Courier New", "#000");
        itemText.addEventListener("click", function(){
            if(PopUp.itemMenuContainer.visible){
                Game.stage.removeChild(PopUp.itemMenuContainer)
            } else {
                PopUp.itemMenu()
            }
            PopUp.itemMenuContainer.visible=!PopUp.itemMenuContainer.visible
        });
        itemText.textAlign = "center";
        itemText.x = 100;
        itemText.y = 100;
        var greybg2 = new createjs.Shape();
        greybg2.graphics.beginFill("#aaa");
        greybg2.graphics.drawRect(0,100,200,50);
        greybg2.addEventListener("click", function(){
            if(PopUp.itemMenuContainer.visible){
                Game.stage.removeChild(PopUp.itemMenuContainer)
            } else {
                PopUp.itemMenu()
            }
            PopUp.itemMenuContainer.visible=!PopUp.itemMenuContainer.visible
        });
        item.addChild(greybg2);
        item.addChild(itemText);

        var flee = new createjs.Container();
        var fleeText = new createjs.Text("Flee", "45px Courier New", "#000");
        fleeText.addEventListener("click", function(){
            Stage.createTown();
        })
        fleeText.textAlign = "center";
        fleeText.x = 100;
        fleeText.y = 150;
        var whitebg2 = new createjs.Shape();
        whitebg2.graphics.beginFill("#eee");
        whitebg2.graphics.drawRect(0,150,200,50);
        whitebg2.addEventListener("click", function(){
            Stage.combatmusic.stop()
            Stage.createTown();
        })
        flee.addChild(whitebg2);
        flee.addChild(fleeText);

        menuCon.addChild(att);
        menuCon.addChild(wep);
        menuCon.addChild(item);
        menuCon.addChild(flee);

        Game.stage.addChild(menuCon)
    },
    weaponMenu:function(){
        Game.stage.removeChild(PopUp.weaponMenuContainer);
        PopUp.weaponMenuContainer.removeAllChildren();

        for(var i = 0; i<Player.playerWeapons.length;i++) {
            var wep = new createjs.Container();
            wep.number =i;
            var w = Player.playerWeapons[i];
            if(wep.number===Player.activeWeapon){
                var wepText = new createjs.Text(w.name, "25px Courier New", "#000");
                wepText.y=i*50;
                var greybg = new createjs.Shape();
                greybg.graphics.beginFill("#aaa");
                greybg.graphics.drawRect(0, i*50, 200, 50);
                wep.addChild(greybg);
                wep.addChild(wepText);
            }else{
                wepText = new createjs.Text(w.name, "25px Courier New", "#000");
                wepText.number=i;
                wepText.y=i*50;
                wepText.addEventListener("click", function (e) {
                    Player.changeWeapon(e.target.number);
                    PopUp.weaponMenu();
                })
                var whitebg = new createjs.Shape();
                whitebg.graphics.beginFill("#eee");
                whitebg.number=i;

                whitebg.graphics.drawRect(0, i*50, 200, 50);
                whitebg.addEventListener("click", function (e) {
                    Player.changeWeapon(e.target.number);
                    PopUp.weaponMenu();
                })
                wep.addChild(whitebg);
                wep.addChild(wepText);
            }
            PopUp.weaponMenuContainer.addChild(wep);
        }
        Game.stage.addChild(PopUp.weaponMenuContainer);
    },
    itemMenu:function(){
        Game.stage.removeChild(PopUp.itemMenuContainer);
        PopUp.itemMenuContainer.removeAllChildren();

        var itemcont = new createjs.Container();

        if(Player.items.length===0){
            var whitebg = new createjs.Shape();
            whitebg.graphics.beginFill("#eee");
            whitebg.graphics.drawRect(0, 0, 200, 50);

            var itmText = new createjs.Text("No items", "25px Courier New", "#000");
            itmText.y=0;

            itemcont.addChild(whitebg);
            itemcont.addChild(itmText);
            PopUp.itemMenuContainer.addChild(itemcont)
        }else {
            for (var i = 0; i < Player.items.length; i++) {
                itemcont.number = i;
                var item = Player.items[i]
                var itmText = new createjs.Text(item.name, "25px Courier New", "#000");
                itmText.name = item.name;
                itmText.number = i;
                
                itmText.y = i * 50;
                itmText.addEventListener("click", function (e) {
                    Player.useItem(e.target.name, e.target.number);
                })

                var whitebg = new createjs.Shape();
                whitebg.graphics.beginFill("#eee");
                whitebg.name = item.name;
                whitebg.number = i;

                whitebg.graphics.drawRect(0, i * 50, 200, 50);
                whitebg.addEventListener("click", function (e) {
                    Player.useItem(e.target.name, e.target.number);
                })
                itemcont.addChild(whitebg);
                itemcont.addChild(itmText);
                PopUp.itemMenuContainer.addChild(itemcont)
            }
        }
        Game.stage.addChild(PopUp.itemMenuContainer);
    },
    playerMenu:function(){
        PopUp.playerMenuContainer.removeAllChildren();
        if(Stage.hero.x<Game.stage.canvas.width/2){
            PopUp.playerMenuContainer.x = Game.stage.canvas.width-400
        }else{
            PopUp.playerMenuContainer.x = 100;
        }
        PopUp.playerMenuContainer.y = 100;
        PopUp.playerMenuContainer.visible=false;

        var whitebg = new createjs.Shape();
        whitebg.graphics.beginFill("#eee");
        whitebg.graphics.drawRect(0, 0, 333, 225);

        PopUp.playerMenuContainer.addChild(whitebg)

        //gold xp/xpreq level cur/maxhp
        var curGold= new createjs.Text("Current gold: "+Player.gold,"30px Courier New", "#000")
        var xpText = new createjs.Text("Experience: " +Player.xp+"/"+Math.round(Player.level*50*1.35),"30px Courier New", "#000")
        xpText.y=50;
        var lvlText= new createjs.Text("Level: "+Player.level,"30px Courier New", "#000")
        lvlText.y=100;
        var hpText = new createjs.Text("Hit points: "+Player.curHealth+"/"+Player.maxHealth,"30px Courier New", "#000")
        hpText.y=150;
        PopUp.playerMenuContainer.addChild(curGold);
        PopUp.playerMenuContainer.addChild(xpText);
        PopUp.playerMenuContainer.addChild(lvlText);
        PopUp.playerMenuContainer.addChild(hpText);
        Game.stage.addChild(PopUp.playerMenuContainer)
    }
}