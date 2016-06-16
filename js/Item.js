/**
 * Created by Mpoe on 6/7/2016.
 */
var Item = {
    items:[],
    setupItems:function(){
        Item.items.push(Item.createItem("asd","Small pot",8,4));
        Player.items.push(Item.items[0]);
        Item.items.push(Item.createItem("asd","Large pot",20,13));
        Item.items.push(Item.createItem("asd","Full restore",9999,25));
    },
    createItem:function(file,name,healing, price){
        var i = new createjs.Bitmap(Preloader.queue.getResult("img/weapons/"+file));
        i.file=file;
        i.name = name;
        i.healing = healing
        i.price=price;
        return i;
    }
}