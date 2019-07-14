
var Inventory = {
	load:function(){
		this.screen = ModPEGUI.screen()
		this.screenPanel = ModPEGUI.contentPanel()
		this.screenPanel.widget.setBackgroundDrawable(Background.dialog())
		this.slots = {}
		for(i=9;i<45;i++){
			this.slots[i-9] = {
				background:ModPEGUI.image(),
				id:null,
				amount:null,
				data:null,
				enchants:[],
				count:ModPEGUI.label(),
				item:ModPEGUI.image(),
				select:ModPEGUI.imageButton()
			}
		}
	},
setItems:function(){
		for(i=9;i<45;i++){
			this.slots[i-9].id = Player.getInventorySlot(i)
			this.slots[i-9].amount = Player.getInventorySlotCount(i)
			this.slots[i-9].data = Player.getInventorySlotData(i)
			if(this.slots[i-9].id > 255)
				if(itemsData[this.slots[i-9].id + "_tool"]){
					this.slots[i-9].item.widget.setBackgroundDrawable(this.utils.getItemTexture(itemsData[this.slots[i-9].id + "_tool"].icon))
					this.slots[i-9].damage.widget.setBackgroundDrawable(Background.durability(Player.getInventorySlotData(i), Item.getMaxDamage(Player.getInventorySlot(i))))
					}
				else if(itemsData[this.slots[i-9].id + "_" + this.slots[i-9].data])
					this.slots[i-9].item.widget.setBackgroundDrawable(this.utils.getItemTexture(itemsData[this.slots[i-9].id + this.slots[i-9].data]))
				else
					this.slots[i-9].item.widget.setBackgroundDrawable(null)
			else if(this.slots[i-9].id < 256)
				this.slots[i-9].item.widget.setBackgroundDrawable(this.utils.getBlockTexture(this.slots[i-9].id + "_" + this.slots[i-9].data));
			else
				this.slots[i-9].item.widget.setBackgroundDrawable("icons/none.png");
		}
	},
	utils:{
		getItemTexture:function(texture, w, h){
			if(ModPE.openInputStreamFromTexturePack("textures/items/" + texture + ".png")!=null)
				return ImageUtils.setScaled(BitmapUtils.getFromTexture("textures/items/" + texture + ".png"), w, h)
			else if(java.io.File("/sdcard/games/com.mojang/minecraftpe/inventory/icons/mods/items"+ texture + ".png").exists())
				return ImageUtils.setScaled(BitmapUtils.getFromFile("/sdcard/games/com.mojang/minecraftpe/inventory/icons/mods/items"+ texture + ".png"), w, h)
				else
					return null
		},
		getBlockTexture:function(id, w, h){
			if(ModPE.openInputStreamFromTexturePack("textures/icons/blocks/" + texture + ".png")!=null)
				return ImageUtils.setScaled(BitmapUtils.getFromTexture("textures/icons/blocks/" + texture + ".png"), w, h)
			else if(java.io.File("/sdcard/games/com.mojang/minecraftpe/inventory/icons/mods/blocks"+ texture + ".png").exists())
				return ImageUtils.setScaled(BitmapUtils.getFromFile("/sdcard/games/com.mojang/minecraftpe/inventory/icons/mods/blocks"+ texture + ".png"), w, h)
				else
					return null
		}
	}
}







