//Pets
var ent = []
var pr = 0
var introDialog1 = ["Welcome to your first day away from our perfectly fine self-sustaining city. Going here has no good benefits or what so ever, but your parents sent you here anyways. But because our city is so notchdamn rich we will let you back in, Just say it", "Hmmm... We don't know you, but do you know me?", "Oh yeah, I can help you. Never accept a deal that includes you being famous and 'for 3 diamonds'", "So if you want some help just use your PeeperCreepers 4000"]
var introAnswers1 = ["Who am I?", "Uhmmm no, but can you help me?", "Okay... Thanks, I guess", "Smile and walk-away"]
eval(""+new java.lang.String(ModPE.getBytesFromTexturePack("textures/resources/ModPEGUI 2.3.js"))+"");
function useItem(){
Intro.firstScreen.show()
}

ModPEGUI.borderButton = function(x, y, w, h, action){

return ModPEGUI.imageButton(ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/base.png"), 3, 3, 2, 2, w, h),ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/basePress.png"), 3, 3, 2, 2, w, h),ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/hover.png"), 3, 3, 2, 2, w, h),ImageUtils.getStretched(BitmapUtils.getFromTexture("textures/gui/newgui/buttons/border/hoverPress.png"), 3, 3, 2, 2, w, h), x, y, w, h, action)

}
var Intro = {}

Intro.firstScreen = ModPEGUI.screen();
Intro.firstScreen.dialogBox = ModPEGUI.contentPanel(4, 180, 450, 80);
Intro.firstScreen.dialogBox.widget.setBackgroundDrawable(Background.dialog.hollow3(450, 80))
Intro.firstScreen.dialogBox.renderOn(Intro.firstScreen)
Intro.readyText = ModPEGUI.label(introDialog1[pr], 20, 0, 400, 250, "#ffffff", true)
Intro.readyText.renderOn(Intro.firstScreen.dialogBox)
Intro.ready = ModPEGUI.borderButton(380, 160, 100, 40, function(){pr++
if(pr<introDialog1.length){
Intro.ready.widget.setText(introAnswers1[pr])
Intro.readyText.widget.setText(introDialog1[pr]);
}
if(pr+1>introDialog1.length){Intro.firstScreen.close();var noti = ModPEGUI.notification(ImageUtils.getDrawable(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/entity/steve.png"),8, 8, 8, 8), 32, 32)), "Look in the eBook", "open your PeeperCreepers");noti.show(ImageUtils.getDrawable(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/entity/creeper/creeper.png"),8, 8, 8, 8), 32, 32)), "New Mission!", "Open your PeeperCreepers")}})
ModPEGUI.setText(Intro.ready.widget, introAnswers1[pr], true, "#ffffff", 7)
Intro.ready.renderOn(Intro.firstScreen)
/*Ask screen
Intro.path = ModPEGUI.screen();
Intro.path.greifer = ModPEGUI.borderButton()
Intro.path.greifer.renderOn(Intro.path)
Intro.path.grinder = ModPEGUI.borderButton()
Intro.path.grinder.renderOn(Intro.path)
Intro.path.builder = ModPEGUI.borderButton()
Intro.path.builder.renderOn(Intro.path)
Intro.path.redstone = ModPEGUI.borderButton()
Intro.path.redstone.renderOn(Intro.path)
Intro.path.notsure = ModPEGUI.borderButton()
Intro.path.notsure.renderOn(Intro.path)
//Are you sure screen
Intro.isSure = function(path){
Intro.path.close();
Intro.sure = ModPEGUI.screen();
Intro.sure.button = ModPEGUI.borderButton()

}*/


function useItem(x, y, z, i, b){
if(i==280){
var levo = Level.spawnMob(x, y+1, z, EntityType.VILLAGER, "textures/entity/steve.png");
Entity.setRenderType(levo, PetModel(0, 0, 0).renderType)

ent.push({e:levo, time:10, mX:-6, mY:2, mZ:-6, down:true})
}
}

PetModel = function(oo, x, z){
renderer = Renderer.createHumanoidRenderer()
var model = renderer.getModel()
var body = model.getPart("body").clear();
var leg = model.getPart("rightLeg").clear();
var leg2 = model.getPart("leftLeg").clear();
var head = model.getPart("head").clear()
var rarm = model.getPart("rightArm").clear();
var larm = model.getPart("leftArm").clear();
	body.setTextureSize(64, 64)
	body.setTextureOffset(0, 0, false)
	body.addBox(-4, -4+oo, -4, 8, 8, 8)
	body.setTextureOffset(8, 8, false)
	body.addBox(x, -2, z, 2, 2, 2)
return renderer
}
Math.lucky = function(min,max){
		return min+Math.round(Math.random()*(max-min));
};

function modTick(){
for(let i of ent){
levo  = i.e
if(i.mX == -6)
i.mZ++
if(i.mZ == 4)
i.mX++
if(i.mX == 4)
i.mZ--
if(i.mZ == -6)
i.mX--
if(i.mY==4)
i.down = true
if(i.mY==-4)
i.down = false

if(i.down==true){
i.mY--
}else{
i.mY++
}

Entity.setRenderType(levo, PetModel(i.mY, i.mX, i.mZ).renderType)
}
}
