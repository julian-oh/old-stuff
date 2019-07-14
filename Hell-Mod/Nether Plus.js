//HELL MOD

//####IMPORT TaQuiTo_988's ModPEGUI API
eval(""+new java.lang.String(ModPE.getBytesFromTexturePack("textures/resources/ModPEGUI 2.3.js"))+"");
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

UI = {
	UI.openBenchmark = {
		loadUI:function(){
		this.benchmark.selectedSlot = null
		this.benchmark.screen:ModPEGUI.screen();
		this.benchmark.UI:ModPEGUI.image(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),0, 106, 15, 121),80, 4, 80, 4);
			this.benchmark.UI.renderOn(UI.benchmark.screen);
		for(c = 9;c <=44; c++){
			this.benchmark.slots[c] = {
				"id":Player.getInventorySlot(c),
				"count":Player.getInventorySlotCount(c),
				"data":Player.getInventorySlotData(c),
			}
				if(Item.getDamageMax(Player.getInventorySlot(c))!==0){
					UI.benchmark.slots[c].texture = "icons/" + Player.getInventorySlot(c) + ".png"
				}else{
					UI.benchmark.slots[c].texture = "icons/" + Player.getInventorySlot(c) + "_" + Player.getInventorySlotData(c) ".png"
				}
				if(c<19){
					UI.benchmark.slots[c].cY = 0
				}else if(c>18 && c<29){
					UI.benchmark.slots[c].cY = 24 
				}else{
					UI.benchmark.slots[c].cY = 48
				}
				if(c==19){
					UI.benchmark.slots[c].cY = 0
				}else if(c==29){
					UI.benchmark.slots[c].cY = 0
				}else if(c==39){
					UI.benchmark.slots[c].cY = 0
				}
			UI.benchmark.slots.[c].function = function(id){
				UI.benchmark.slots[id].ui.widget.setBackgroundDrawable(UI.benchmark.slotsUI.selected(UI.benchmark.slots[id].ui.texture))
				UI.benchmark.slots.selectedSlot = id
			};
				UI.benchmark.slots[c].cX++
			UI.benchmark.slots[c].ui = ModPEGUI.imageButton(UI.benchmark.slotsUI.normal(UI.benchmark.slots[c].texture), UI.benchmark.slotsUI.selected(UI.benchmark.slots[c].texture), UI.benchmark.slotsUI.selected(UI.benchmark.slots[c].texture), 24 * UI.benchmark.slots[c].cX, UI.benchmark.slots[c].cY, 22, 22, UI.benchmark.slot[c].function(c));
			UI.benchmark.slots[c].ui.renderOn(UI.benchmark.UI);
			}
		}
	},
	UI.benchmark = {
		UI.benchmark.slots = {},
		UI.benchmark.cSlots = {},
	},
	UI.benchmark.slotsUI = {
		normal:function(texture){
				var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
					var canvas = new android.graphics.Canvas(blank);		
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/gui.png"),188, 184, 209, 205),0,0,null);//Slot
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture(texture),0,0,16,16),2,2,null);//Panel
					return blank
			},
		selected:function(texture){
				var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
					var canvas = new android.graphics.Canvas(blank);		
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/gui.png"),188, 184, 209, 205),0,0,null);//Slot
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture(texture),0,0,16,16),2,2,null);//Panel
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/gui.png"),0, 23, 23, 45),0,0,null);
					return blank
			}
		}
	moveSlot:function(id){
		if(selectedSlot){
			id.setBackgroundDrawable(UI.benchmark.slotsUI.normal(selectedSlot.texture))
			id.contains = {
				"id":selectedSlot.id,
				"data":selectedSlot.data
			}
			if(id.contains.id === selectedSlot.id){
				id.contains.amount = id.contains.amount + 1
			}else{
				id.contains.amount = 1
			}
			if(selectedSlot.amount===1){
				delete selectedSlot
				selectedSlot = null
			}
			
		}
	}
}