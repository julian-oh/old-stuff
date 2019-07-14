//Hell mod

eval(""+new java.lang.String(ModPE.getBytesFromTexturePack("textures/resources/ModPEGUI 2.3.js"))+"");
//IDs
var star_sword = 3550;
var hell_bench = 3651;
var spawn_vendor = 3551;
var bootleg_star = 3552
//Variables
UI.slot = {};
UI.slotInv = {};
var bounce = [];
//Blocks & Item

defineItem = function(){
	Item.newItem(star_sword, "star_sword", 0, "");
		Item.setMaxDamage(star_sword, 280);
	Block.define(hell_bench, "", [["hell_bench", 0],["hell_bench", 1],["hell_bench", 2],["hell_bench", 3],["hell_bench", 4],["hell_bench", 5]], 1, true);
		Block.setShape(hell_bench, 0.2, 0.8, 0, 0.8, 0.2, 0.8);
}
Item.newItem = function(id, texture, texturedata, name, maxStack){
	try{
		ModPE.defineItem(id, texture, texturedata, name, maxStack)
	}catch(e){
			ModPE.defineItem(id, "coal", 0, name, maxStack);
	}

};
var UI = {
	openBench:function(){
		this.benchScreen = ModPEGUI.screen();
		this.benchScreenUI = ModPEGUI.image(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),0, 106, 15, 121),80, 4, 80, 4);
			this.benchScreenUI.renderOn(this.benchScreen);
		this.bInventory = ModPEGUI.image(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),0, 106, 15, 121),20, 4, 40, 80);
		for(c = 9; c <=44; c++){
			this.slotInv[c] = {},
			this.slot[c] = {},
			if(Player.getInventorySlot(c)!=0){
				this.slot[c].id = Player.getInventorySlot(c);
				this.slot[c].count = Player.getInventorySlotCount(c);
				this.slot[c].data = Player.getInventorySlotData(c);
				if(Item.getMaxDamage(Player.getInventorySlot(c))!=0){
					his.slot[c].texture = "icons/" + Player.getInventorySlot(c) = ".png"
				}else{
					this.slot[c].texture = "icons/" + Player.getInventorySlot(c) + "-" + Player.getInventorySlotData(c) + ".png"
				}
				//add new Y if n
				this.slotInv[c].yoffset = (c > 9 * 9)? this.slotInv[c-9].yoffset + 22: 0
				this.slotInv[c] = ModPEGUI.image(slotInv[c].background(), c-8*22, 22+yoffset, 22, 22)
				this.slotInv[c].background:function() {
					var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
					var canvas = new android.graphics.Canvas(blank);
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),188, 184, 209, 205),0,0,null);//Slot
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture(this.slot[c].texture),0,0,16,16),2,2,null);//Panel
					return blank
				}
			}
		}

	},
	this.openVendorScreen:function(){
		this.vendorScreen = ModPEGUI.screen();
		this.vendorScreenUI = ModPEGUI.image(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),0, 106, 15, 121),80, 4, 80, 4);
		this.vendorScreenTitle = ModPEGUI.label("What do you want???");
	}
}

//ModPE Hoooks
function useItem(x, y, z, i, b){
	if(b===hell_bench){
		UI.openBench();
	}
}

function attackHook(a, v){
	if(Player.getCarriedItem()==star_sword){
		bounce.push[{"entity": v, "count": 5}];
	}
}
function modTick(){
	for(let j of Entity.getAll()){
		for(let m of bounce){
			if(shouldShoot(m.entity, j)&&m.count>0){
				shoot(m.entity, j);
				if(m.count>1){
				bounce.push({"entity":j, "count": i.count - 1});
				}
				bounce.splice(i, 0);
			}
		}
	}
}
var mobs = {
	entities:{},
	types:{
		vendor:{
			"skin":"mob/vendor.png",
			"renderType":vendormodel().renderType,
			"maxHealth":20,
			products:{
				"bootleg_star":{
					"id":bootleg_star,
					"data"0,
					"price":{
						"id":264,
						"count":3
					},
					"descriptions":["A Nether Star that isn't really from Nether", "Expensive?"]
				}


			}
		}


	}
}

customMob = function(type, x, y, z){
	var mob = Level.spawnMob(x, y+1, z, EntityType.VILLAGER);
	Entity.setMobSkin(mob, mobs.types[type].skin);
	Entity.setRenderType(mob, mobs.types[type].renderType);
	Entity.setMaxHealth(mob, mobs.types[type].maxHealth);
	mobs.entities[mob] = {
		"type":mobs.types[type],
		"renderType":mobs.types[type].renderType,
		"skin":mobs.types[type].skin,
		"maxHealth":mobs.types[type].maxHealth
	}
	return mob;
}


