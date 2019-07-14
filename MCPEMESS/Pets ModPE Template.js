//Pets Template

//Item IDS
var spawnEgg = {
}
function defineItem(){
	Item.defineItem()


}
var Pets = {
	mobs = {},
	eggs = {},
}

var Spawn = {
	egg:function(x, y, z, type, hatchTime){
		var egg = Level.spawnMob(x, y, z, EntityType.Villager);
		Entity.setMobSkin(egg, PetTypes[type].skin);
		Entity.setRenderType(egg, PetTypes[type].renderType);
		Pets.egg[egg] = {
			"time": hatchTime,
			"type": type,
			"renderType": PetTypes[type].renderType,
			"skin": PetTypes[type].skin
		},
	pet:function(x, y, z, type){
		var pet = Level.spawnMob(x, y, z, PetTypes[type].baseMob);
		Entity.setMobSkin(pet, PetTypes[type].skin);
		Entity.setRenderType(pet, PetTypes[type].renderType);
		Entity.setMaxHealth(pet, PetTypes[type].maxHealth);
		Entity.setHealth(pet, PetTypes[type].maxHealth);
		Pets.pet[pet] = {
			"type": type,
			"skin": PetTypes[type].skin,
			"renderType": PetTypes[type].renderType,
			"maxHealth": PetTypes[type].maxHealth,
			"health": PetTypes[type].health
			"tamed": (Pets.pet[pet]==tamed)? true : false
		}

	}

	}
}

//Special Variables
Item.defineItem = function(id, texturename, texturedata, name, maxStack){
	try{
		ModPE.setItem(id, texturename, texturedata, name, maxStack);
	}catch(e){
		ModPE.setItem(id, "coal", 0, name, maxStack);
	}
}
