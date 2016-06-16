/**
 * Created by Mpoe on 6/6/2016.
 */
var Weapon = {
    weapons:[],
    setupWeapons:function(){
        Weapon.weapons.push(Weapon.createWeapon("asd","Wooden sword",1,3,"grass",0));
        Player.playerWeapons.push(Weapon.weapons[0]);
        Weapon.weapons.splice(0,1);
        Weapon.weapons.push(Weapon.createWeapon("asd","Flame blade",2,4,"fire",25));
        Weapon.weapons.push(Weapon.createWeapon("asd", "Water bucket",2,3,"water",25));
        Weapon.weapons.push(Weapon.createWeapon("asd","Excalibur",4,7,"light",50));
        Weapon.weapons.push(Weapon.createWeapon("asd","Shadowblade",5,6,"dark",35));
        Weapon.weapons.push(Weapon.createWeapon("asd","Lightning gun",8,10,"electricity",175))
    },
    createWeapon:function(file,name, minDmg, maxDmg, type, price){
        var w = new createjs.Bitmap(Preloader.queue.getResult("img/weapons/"+file));
        w.file=file;
        w.name = name;
        w.mindmg = minDmg;
        w.maxdmg = maxDmg;
        w.type=type;
        w.price=price;
        return w;
    },
    activeWeapon:function(){
        return Player.playerWeapons[Player.activeWeapon];
    }
}