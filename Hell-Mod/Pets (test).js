//Pets
eval(""+new java.lang.String(ModPE.getBytesFromTexturePack("textures/resources/ModPEGUI 2.3.js"))+"");
//Variables
var pr = 0
var dialog_intro = ["Subo mo burat ko", "sabi ni", " jabe"]
var dialog_intro_yes = ["ok", "okay", "okay"]
var dialog_intro_no = dialog_intro_yes
var dialog_intro_yes_function = []
var dialog_intro_no_function = []
var followPet;
ModPEGUI.borderButton = function(x, y, w, h, action){

return ModPEGUI.imageButton(ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/base.png"), 3, 3, 2, 2, w, h),ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/basePress.png"), 3, 3, 2, 2, w, h),ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/hover.png"), 3, 3, 2, 2, w, h),ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/hoverPress.png"), 3, 3, 2, 2, w, h), x, y, w, h, action)
}

var Utils = {
	shouldShoot:function(victim, attacker){
	return this.checkEntityProximity(victim,attacker,10,3)
	},
	shoot:function(victim, attacker){
	var e = Math.atan2((Entity.getZ(attacker)-Entity.getZ(victim)),(Entity.getX(attacker)-Entity.getX(victim)));
	var c = this.getVector((java.lang.Math.toDegrees(e)-90),0);
	Level.playSoundEnt(attacker,"random.bow",1000,0);
	if(Level.getGameMode()==GameMode.SURVIVAL){
		var d=Level.spawnMob(Entity.getX(attacker)+(-c.x*1.1),Entity.getY(attacker)+1,Entity.getZ(attacker)+(-c.z*1.1),80);
		var g=Level.spawnMob(Entity.getX(attacker)+(-c.x*1.1),Entity.getY(attacker)+1,Entity.getZ(attacker)+(-c.z*1.1),34);
		Entity.setRenderType(g,4);
		Entity.rideAnimal(g,d);
		Entity.remove(g)
	}else{
		var d=Level.spawnMob(Entity.getX(attacker)+(-c.x*1.1),Entity.getY(attacker)+1,Entity.getZ(attacker)+(-c.z*1.1),81)
		}
		Entity.setVelX(d,-c.x*1.8);
		Entity.setVelY(d,c.y*1.8);
		Entity.setVelZ(d,-c.z*1.8);
	},
	getVector:function(c,b){
		var a=new this.Vector();
		a.y=-Math.sin(java.lang.Math.toRadians(b));
		a.x=-Math.sin(java.lang.Math.toRadians(c))*Math.cos(java.lang.Math.toRadians(b));
		a.z=Math.cos(java.lang.Math.toRadians(c))*Math.cos(java.lang.Math.toRadians(b));
		return a
	},
	Vector:function(a,c,b){
		this.x=a;
		this.y=c;
		this.z=b
	},
	checkProximityOfPoints:function(c,e,h,b,d,g,a,f){
		if(f==null){
			f=a
		}
		if(!(Math.abs(c-b)<=a)){
			return false
		}
		if(!(Math.abs(e-d)<=f)){
			return false
		}
		if(!(Math.abs(h-g)<=a)){
		return false
		}
		return true
	},
	checkEntityProximity:function(b,a,c,d){
		return this.checkProximityOfPoints(Entity.getX(b),Entity.getY(b),Entity.getZ(b),Entity.getX(a),Entity.getY(a),Entity.getZ(a),c,d)
	},
	gravity:function(target){
		if(target){

		}
	},
	throw:function(target){
		this.playerYaw = Entity.getYaw(Player.getEntity());
		this.playerPitch = Entity.getPitch(Player.getEntity());
		this.velY = Math.sin((this.playerPitch - 180) / 180 * Math.PI);
		this.velX =Math.sin(this.playerYaw / 180 * Math.PI) * Math.cos((this.playerPitch - 180) / 180 * Math.PI);
		this.velZ =-1 * Math.cos(this.playerYaw / 180 * Math.PI) * Math.cos((this.playerPitch - 180) / 180 * Math.PI);

		setVelX(target,this.velX*0.3);
		setVelY(target,this.velY*0.3);
		setVelZ(target,this.velZ*0.3);
	}
}

var Pets = {
	entities:{}
}

var Dialogs = {
	intro:{
		dialog1:["Welcome"],
		answers:{
			yes:[],
			no:[]
		}
	}
}

var Intro = {

}

var PetsGUI = {
	init:function(){
		Intro.firstScreen = ModPEGUI.screen();
		Intro.firstScreen.dialogBox = ModPEGUI.contentPanel(4, 180, 450, 80);
		Intro.firstScreen.dialogBox.widget.setBackgroundDrawable(Background.dialog.hollow3(450, 80));
		Intro.firstScreen.dialogBox.renderOn(Intro.firstScreen)
		Intro.readyText = ModPEGUI.label(dialog_intro[pr], 20, 0, 400, 250, "#ffffff", true)
		Intro.readyText.renderOn(Intro.firstScreen.dialogBox)
		Intro.ready = ModPEGUI.borderButton(380, 160, 100, 40, function(){
			pr++
			if(pr<dialog_intro_yes.length){
				ModPEGUI.setText(Intro.ready.widget, dialog_intro_yes[pr], true, "#ffffff", 7);
				ModPEGUI.setText(Intro.notready.widget, dialog_intro_no[pr], true, "#ffffff", 7);
			Intro.ready.widget.setText(dialog_intro_yes[pr])
			Intro.ready.widget.setText(dialog_intro_no[pr])
			Intro.readyText.widget.setText(dialog_intro[pr]);
}
				if(pr+1>dialog_intro_yes.length){
					Intro.firstScreen.close();
					Intro.secondScreen.show();
					var noti = ModPEGUI.notification(ImageUtils.getDrawable(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/entity/steve.png"),8, 8, 8, 8), 32, 32)), "Look in the eBook", "open your PeeperCreepers");
					noti.show(ImageUtils.getDrawable(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/entity/creeper/creeper.png"),8, 8, 8, 8), 32, 32)), "New Mission!", "Open your PeeperCreepers")
						}
				});
		Intro.notready = ModPEGUI.borderButton(0, 160, 100, 40, function(){
			pr++
			if(pr<dialog_intro_yes.length){
				ModPEGUI.setText(Intro.ready.widget, dialog_intro_yes[pr], true, "#ffffff", 7);
				ModPEGUI.setText(Intro.notready.widget, dialog_intro_no[pr], true, "#ffffff", 7);
			Intro.ready.widget.setText(dialog_intro_yes[pr])
			Intro.ready.widget.setText(dialog_intro_no[pr])
			Intro.readyText.widget.setText(dialog_intro[pr]);
}
				if(pr+1>dialog_intro_yes.length){
					Intro.firstScreen.close();
					Intro.secondScreen.show();
					var noti = ModPEGUI.notification(ImageUtils.getDrawable(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/entity/steve.png"),8, 8, 8, 8), 32, 32)), "Look in the eBook", "open your PeeperCreepers");
					noti.show(ImageUtils.getDrawable(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/entity/creeper/creeper.png"),8, 8, 8, 8), 32, 32)), "New Mission!", "Open your PeeperCreepers")
						}
				});
			ModPEGUI.setText(Intro.ready.widget, dialog_intro_yes[pr], true, "#ffffff", 7);
				ModPEGUI.setText(Intro.notready.widget, dialog_intro_no[pr], true, "#ffffff", 7);
			Intro.ready.renderOn(Intro.firstScreen);
			Intro.notready.renderOn(Intro.firstScreen);
		//Next
		Intro.secondScreen = ModPEGUI.screen();
		Intro.secondScreen.text = ModPEGUI.label("What are your Interests?" , 120, 40, 400, 250, "#ffffff", true);
			Intro.secondScreen.text.renderOn(Intro.secondScreen)
		Intro.secondScreen.griefer = ModPEGUI.borderButton(80, 80, 100, 40, function(){Intro.secondScreen.close()});
			ModPEGUI.setText(Intro.secondScreen.griefer.widget, "Griefing" ,true, "#B22222", 10);
			Intro.secondScreen.griefer.renderOn(Intro.secondScreen);
		Intro.secondScreen.redstone = ModPEGUI.borderButton(80, 180, 100, 40, function(){});
			ModPEGUI.setText(Intro.secondScreen.redstone.widget, "Redstone" ,true, "#ff0000", 10);
			Intro.secondScreen.redstone.renderOn(Intro.secondScreen);
		Intro.secondScreen.builder = ModPEGUI.borderButton(200, 80, 100, 40, function(){});
			ModPEGUI.setText(Intro.secondScreen.redstone.widget, "Building" ,true, "#0000ff", 10);
			Intro.secondScreen.builder.renderOn(Intro.secondScreen);
		Intro.secondScreen.grinding = ModPEGUI.borderButton(200, 180, 100, 40, function(){});
			ModPEGUI.setText(Intro.secondScreen.redstone.widget, "Grinding" ,true, "#ffffff", 10);
			Intro.secondScreen.grinding.renderOn(Intro.secondScreen);
	}
}

//Functions
function useItem(){
	Intro.firstScreen.show();
}

function modTick(){
	if(followPet)
		Utils.gravity(followPet);
}
function attackHook(a, v){
	if(Entity.isSneaking(a)==true){
		followPet = v
	}else{
		Utils.throw(v)
		followPet = null
	}
}

PetsGUI.init()
