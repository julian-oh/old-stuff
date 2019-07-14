//Clone mod
var wrapContent = 	android.view.ViewGroup.LayoutParams.WRAP_CONTENT
var cloneUI = ModPEGUI.contentPanel(0, 0, wrapContent, wrapContent)
var cloneUI_text = ModPEGUI.label()
var Clones = {
	clones:{},
	createClone:function(x, y, z){
		var clone = Level.spawnMob(x, y, z, EntityType.ARMOR_STAND)

		Clones.clones[clone] = {
			inventory:{
				slots:{
					normal:{},
					armor:{}
				},
			}
			status:{
				health: 20,
				hunger: 2,
				exp:0,
				level:0
			},
			button:function(){
				var buttonC ModPEGUI.imageButton()

				return buttonC
			}
		}
		cloneUI.addView(Clones.clones[clone].button.widget)
	},
	change:function(player, clone){
		Clones.clones.temp = {
			inventory:{
				slots:{
					normal:{},
					armor:{},
				},
			status:{
				health:null,
				hunger:null,
				exp:null,
				level:null,
			}
			}
		var tempI = Clones.clones.temp.inventory.slots
		var tempS = Clones.clones.temp.status
		var cloneI = Clones.clones[clone].inventory.slots
		var cloneS = Clones.clones[clone].status
		var  copyTemp = function(){
			//Copy inventory to the middle man
			for(i = 9; i <+44 ; i++){
				tempI.normal[i-9].id = Player.getInventorySlot(i)
				tempI.normal[i-9].count = Player.getInventorySlotCount(i)
				tempI.normal[i-9].data = Player.getInvetorySlotData(i)
				tempI.normal[i-9].enchants = new Player.getEnchantments(i)
				tempS.health = Entity.getHealth(Player.getEntity)
				tempS.hunger = Player.getHunger()
				tempS.exp = Player.getExp()
				tempS.level = Player.getLevel()
			}
			//Armor
			for(i = 0; i<=3; i++){
				tempI.armor[i+1].id = Player.getArmorSlot(i)
				tempI.armor[i+1].data = Player.getArmorSlotData(i)
			}
		}
		var setPlayer = function(){
			//gives the items of the clone to the player
			for(i = 9; i <+44 ; i++){
				Player.setInventory(i, cloneI.normal[i-9].id, cloneI.normal[i-9].count, cloneI.normal[i-9].data)
				for(i = 0; i<cloneI.normal[i-9].enchants.length; i++){
					Player.setEnchantType(cloneI.normal[i-9].enchants[i].id, cloneI.normal[i-9].enchants[i].type, cloneI.normal[i-9].enchants[i].level)
				}
			}
			//set armor
			for(i = 0; i<=3; i++){
				Player.setArmorSlot(i, cloneI.armor[i+1].id, 1, cloneI.armor[i+1].data)
			}

		}

		var setClone = function(){
			//gives the middleman's inv to the clone
			for(i = 9; i <+44 ; i++){
			cloneI.normal[i-9].id =	tempI.normal[i-9].id
			cloneI.normal[i-9].count = tempI.normal[i-9].count
			cloneI.normal[i-9].data = tempI.normal[i-9].data
			cloneI.normal[i-9].enchants = new tempI.normal[i-9].enchants
			}
			tempS.health = tempS.health
			tempS.hunger = tempS.hunger
			tempS.exp = tempS.exp
			tempS.level = tempS.level
			//sets armor
			for(i = 0; i <= 3; i ++){
				cloneI.armor[i+1].id = Player.getArmorSlot(i) = tempI.armor[i+1].id = Player.getArmorSlot(i)
				cloneI.armor[i+1].data = Player.getArmorSlotData(i) = tempI.armor[i+1].id = Player.getArmorSlot(i)
			}
		}
		copyTemp()
		setPlayer()
		setClone()
	}
}
