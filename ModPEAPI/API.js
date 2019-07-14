// ModPE Stuff
// :: "Imports"
var Bitmap = android.graphics.Bitmap;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var File = java.io.File;
var Widget = android.widget;

// :: ======== [ Utils ] ========= :: \\

//:: Constants

var ObjectType = {
	BITMAP_GROUP = "bitmapGroup",
	BITMAP_DRAWABLE_GROUP = "bitmapDrawableGroup",
	MCButton = "minecraftButton",
	MCSwitch = "minecraftSwitch"
};

// :: Android GUI Requires this

var GuiContext


// :: All of the params are in Bitmap

var BitmapGroup = function (defaultNormal, defaultPressed,
	hoverNormal, hoverPressed){
		this.type = ObjectType.BITMAP_GROUP;
		this.recycled = false;
		this.defaultNormal = defaultNormal;
		this.defaultPressed = defaultPressed;
		this.hoverNormal = hoverNormal;
		this.hoverPressed = hoverPressed

	this.flushMemory = function() {
		this.defaultNormal.recycle();
		this.defaultPressed.recycle();
		this.hoverNormal.recycle();
		this.hoverPressed.recycle();
		this.recycled = true:
	}
}

// :: Convert BitmapGroup into a drawable for use in MCButtons and MCSwitches

var BitmapDrawableGroup = function(bitmapGroup) {
	if(bitmapGroup.recycled) throw new Error("param bitmapGroup has already recycled and no longer can be used :(");

	this.defaultNormal = new BitmapDrawable(bitmapGroup.defaultNormal);
	this.defaultPressed = new BitmapDrawable(bitmapGroup.defaultNormal);
	this.hoverNormal = new BitmapDrawable(bitmapGroup.hoverNormal);
	this.hoverPressed = new BitmapDrawable(bitmapGroup.hoverPressed);
	this.flushMemory(){
		bitmapGroup.flushMemory();
	}
}

// :: This avoids generating new NinePatches to avoid lack of memory
var NinePatchPool = [];

// :: NinePatches are used for UI Skinning, they are adjusting Bitmaps
var NinePatch = function(bitmap){
	// :: Used for checking
	this.baseBitmap;
	this.bitmap = bitmap;
	this.width = bitmap.getWidth();
	this.height = bitmap.getHeigth();

	this.flushMemory = function(){
		this.bitmap.recycle();
		NinePatchPool.splice(this, 1, 0);
	}
}

// :: Affogatoman's Method @github.com/if-Team
var GenerateNinePatch = function(bm, x, y, stretchWidth, stretchHeight, width, height){

	for(var ninePatch of NinePatchPool){
		if(bm == ninePatch.baseBitmap && ninePatch.width == width && ninePatch.height == height )
			return ninePatch;
	}

	var blank = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
    var part1 = Bitmap.createBitmap(bm, 0, 0, x, y);
    var part2 = Bitmap.createBitmap(bm, x, 0, stretchWidth, y);
    var part3 = Bitmap.createBitmap(bm, x+stretchWidth, 0, bm.getWidth()-x-stretchWidth, y);
    var part4 = Bitmap.createBitmap(bm, 0, y, x, stretchHeight);
    var part5 = Bitmap.createBitmap(bm, x, y, stretchWidth, stretchHeight);
    var part6 = Bitmap.createBitmap(bm, x+stretchWidth, y, bm.getWidth()-x-stretchWidth, stretchHeight);
    var part7 = Bitmap.createBitmap(bm, 0, y+stretchHeight, x, bm.getHeight()-y-stretchHeight);
    var part8 = Bitmap.createBitmap(bm, x, y+stretchHeight, stretchWidth, bm.getHeight()-y-stretchHeight);
    var part9 = Bitmap.createBitmap(bm, x+stretchWidth, y+stretchHeight, bm.getWidth()-x-stretchWidth, bm.getHeight()-y-stretchHeight);
    var canvas = new android.graphics.Canvas(blank);
    canvas.drawBitmap(part1, 0, 0, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part2, width-bm.getWidth()+stretchWidth, y, false), x, 0, null);
    canvas.drawBitmap(part3, width-bm.getWidth()+stretchWidth+x, 0, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part4, x, height-bm.getHeight()+stretchHeight, false), 0, y, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part5, width-bm.getWidth()+stretchWidth, height-bm.getHeight()+stretchHeight, false), x, y, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part6, part3.getWidth(), height-bm.getHeight()+stretchHeight, false), width-bm.getWidth()+stretchWidth+x, y, null);
    canvas.drawBitmap(part7, 0, height-bm.getHeight()+stretchHeight+y, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part8, width-bm.getWidth()+stretchWidth, part7.getHeight(), false), x, height-bm.getHeight()+stretchHeight+y, null);
    canvas.drawBitmap(part9, width-bm.getWidth()+stretchWidth+x, height-bm.getHeight()+stretchHeight+y, null);

    return new android.graphics.drawable.BitmapDrawable(blank);
}

// :: GUI
// Most of the objects (mostly buttons) here requires a BITMAP_DRAWABLE_GROUP/BitmapDrawableGroup

/** Creates a basic hoverable pressable GUI button  with click and hover functions
* @param imageGroup must be BITMAP_DRAWABLE_GROUP
*/


// :: StandardLayoutView
// :: Everything is scaled by screen aspect ratio;
var BasicLayoutView(x, y, width, height){
	this.layout = new Widget.RelativeLayout(GuiContext);
	this.params = Widget.RelativeLayout.LayoutParams(x, y, width, height);
	this.layout.setLayoutParams(this.params);
}

var MCButton = function(imageGroup, x, y, width, height){
	if(imageGroup.type != ObjectType.BITMAP_DRAWABLE_GROUP)
		throw new Error("A MCButton only accepts BitmapDrawableGroup objects and that's not what you put in the imageGroup param");

	this.layout = new BasicLayoutView(x, y, width, height);
	this.widget = this.layout.layout;

	this.setOnClickFunction() {

	}
	this.setOnHoverFunction() {

	}
	// :: Call this when a button is no longer will be used so you can save memory and performance :)
	this.dispose() {

	}
}

/** Creates a basic switch with onToggle functions and hover
* @param imageGroup must be BITMAP_DRAWABLE_GROUP
*/
var MCSwitch = function (imageGroup) {
	if(imageGroup.type != ObjectType.BITMAP_DRAWABLE_GROUP)
		throw new Error("A MCButton only accepts BitmapDrawableGroup objects and that's not what you put in the imageGroup param");

	// :: Call this when a switch is no longer will be used so you can save memory and performance :)
	this.dispose();
}

