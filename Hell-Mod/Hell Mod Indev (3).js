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
//Variable
var selectedSlot
UI = {
	
		loadUI:function(){
		this.benchmark.selectedSlot = null
		UI.benchmark.screen = ModPEGUI.screen();
		this.benchmark.UI = ModPEGUI.contentPanel(20, 40, 210, 225);
		this.benchmark.UI.widget.setBackgroundDrawable(Background.dialog.hollow3(210, 225))
			this.benchmark.UI.renderOn(UI.benchmark.screen);
			this.benchmark.UItitle = ModPEGUI.label("Inventory",8,10,80,8,"#555555",false);
			this.benchmark.UItitle.renderOn(this.benchmark.UI)
			this.benchmark.craftUI = ModPEGUI.contentPanel(240, 40, 232, 225);
		this.benchmark.craftUI.widget.setBackgroundDrawable(ImageUtils.getStretched(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),0,106,15,15), 7, 7, 2, 2,200, 200))
			this.benchmark.craftUI.renderOn(UI.benchmark.screen);
			this.benchmark.craftUItitle = ModPEGUI.label("Nether Forger",8,10,80,8,"#555555",false);
			this.benchmark.craftUItitle.renderOn(this.benchmark.craftUI)
			},
		craftBench:function(){
			var cX = 0
			var cY= 0
			for(s=0; s<9; s++){
				this.benchmark.slots[s] ={}
				cX++
				if(s==0||s==3||s==6){
				cX = 0.25
				if(s==0){
				cY = cY + 0.5 * 64
				}else{
				cY = cY + 1 * 64
				}
				}
				if(s<4){
				UI.benchmark.slots[s].ui = customGUI.imageButton(null,null, null, null, cX * 64, cY + 8, 32, 32, function(){UI.benchmark.screen.close();});
			UI.benchmark.slots[s].ui.renderOn(UI.benchmark.craftUI);
				}else if(s>4){
				UI.benchmark.slots[s].ui = customGUI.imageButton(null,null, null, null, cX * 64, cY + 8, 32, 32, function(){UI.benchmark.screen.close();});
			UI.benchmark.slots[s].ui.renderOn(UI.benchmark.craftUI);
				}else{
				UI.benchmark.slots[s].ui = customGUI.imageButton(null,null, null, null, 240 + 3 * 64, 2, 36, 36, function(){UI.benchmark.screen.close();});
			UI.benchmark.slots[s].ui.renderOn(UI.benchmark.screen);
				}
			}
		},
		openBench:function(){
		var cX = 0
		var cY = 0
		for(c = 9;c <=44; c++){
			this.benchmark.slots[c] = {
				"id":Player.getInventorySlot(c),
				"count":Player.getInventorySlotCount(c),
				"data":Player.getInventorySlotData(c),
			}
				if(Item.getMaxDamage(Player.getInventorySlot(c))!==0){
					this.benchmark.slots[c].texture = "icons/" + Player.getInventorySlot(c) + ".png"
				}else{
					this.benchmark.slots[c].texture = "icons/" + Player.getInventorySlot(c) + "_" + Player.getInventorySlotData(c) + ".png"
				}
				if(c<=15){
					cY = 17
				}else if(c>15 && c<22){
					cY = 49
				}else if(c>21 && c<28){
					cY = 81
				}else if(c>27 && c<34){
					cY = 113
				}else if(c>33 && c<40){
					cY = 145
				}else{
				 cY = 177
				}
				cX++
				if(c==9||c==15||c==21||c==27||c==33||c==39||c==44){
					cX = 0.27
				}
				
			this.benchmark.slots[c].func = function(g){
			
			UI.benchmark.slots[g].ui.widget.setBackgroundDrawable(UI.benchmark.slotsUI.selected(UI.benchmark.slots[g].ui.texture))
				selectedSlot = this.benchmark.slots[c]
			}
				
			UI.benchmark.slots[c].ui = customGUI.imageButton(null,null, null, null, cX * 32, cY + 6, 32, 32, function(){UI.benchmark.screen.close();});
			UI.benchmark.slots[c].ui.renderOn(UI.benchmark.UI);
			}
		}
,
	benchmark:{
		slots:{},
		cSlots:{},
		slotsUI:{
		normal:function(texture, width, height){
				var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
					var canvas = new android.graphics.Canvas(blank);		
					canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/gui.png"),188, 184, 22, 22),0,0,null);//Slot
					
					var slot = ImageUtils.getStretched(blank, 1, 1, 1, 1, 32, 32).getBitmap();
					
					var slotCanvas = new android.graphics.Canvas(slot);		
					slotCanvas.drawBitmap(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/items/diamond.png"), 0, 0, 16, 16), 32, 32),6,6,null);
					return ImageUtils.getDrawable(slot)
			},
		selected:function(texture, width, height){
				var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
					var canvas = new android.graphics.Canvas(blank);		
					var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
					canvas.drawBitmap(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/items/diamond.png"),0,0,16,16), 16, 16),3, 3,null);//Panel
					canvas.drawBitmap(BitmapUtils.getScaled(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/gui.png"),0, 23, 22, 22),44, 44),0,0,null);
					return ImageUtils.getDrawable(blank)
			},
		empty:function(width, height){
			var blank = android.graphics.Bitmap.createBitmap(22,22,android.graphics.Bitmap.Config.ARGB_8888);
				var canvas = new android.graphics.Canvas(blank);		
				canvas.drawBitmap(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/gui.png"),188, 184, 22, 22),0,0,null);//Slot
				return ImageUtils.getStretched(blank, 1, 1, 1, 1, width, height)
		}
},
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
				selectedSlot.ui.widget.setBackgroundDrawable(UI.benchmark.slotsUI.empty());
				selectedSlot.amount = 0
				selectedSlot = null
			}else{
				selectedSlot.amount = selectedSlot.amount-1
			}
			//Pickup
			
		}else{
			selectedSlot = id;
		}
	}
}}

function useItem(x, y, z, i, b){
	if(b==1){
	for(c=0;c<=44;c++){
	if(c<4 || c>4 && c<9){
	UI.benchmark.slots[c].ui.widget.setBackgroundDrawable(UI.benchmark.slotsUI.empty(44, 44));
	UI.benchmark.slots[c].ui.backgrounds.default_hover = UI.benchmark.slotsUI.empty(44, 44);
	UI.benchmark.slots[c].ui.backgrounds.pressed_normal = UI.benchmark.slotsUI.empty(44, 44);
	UI.benchmark.slots[c].ui.backgrounds.pressed_hover = UI.benchmark.slotsUI.empty(44, 44);
	}else if(c>9){
	UI.benchmark.slots[c].ui.widget.setBackgroundDrawable(UI.benchmark.slotsUI.normal());
	UI.benchmark.slots[c].ui.backgrounds.default_hover = UI.benchmark.slotsUI.empty(44, 44);
	UI.benchmark.slots[c].ui.backgrounds.pressed_normal = UI.benchmark.slotsUI.selected(null, 44, 44);
	UI.benchmark.slots[c].ui.backgrounds.pressed_hover = UI.benchmark.slotsUI.selected(null, 44, 44);
	}else{
	UI.benchmark.slots[c].ui.widget.setBackgroundDrawable(customGUI.extraSlot().normal());
	UI.benchmark.slots[c].ui.backgrounds.default_hover = UI.benchmark.slotsUI.empty(44, 44);
	UI.benchmark.slots[c].ui.backgrounds.pressed_normal = UI.benchmark.slotsUI.empty(44, 44);
	UI.benchmark.slots[c].ui.backgrounds.pressed_hover = UI.benchmark.slotsUI.empty(44, 44);
	
	
	}
	}
	UI.benchmark.screen.show();
	}

};
var customGUI = {
	imageButton:function(defaultNormal,defaultHover,pressedNormal,pressedHover,x,y,width,height,action){
		var helper = function(){
			var that = this;	
			this.backgrounds = {
				default_normal:defaultNormal,
				default_hover:defaultHover,
				pressed_normal:pressedNormal,
				pressed_hover:pressedHover
			};
			this.enabled = true;
			this.pressed = false;
			this.hover = false;		
			this.widget = GuiUtils.createLayoutView(new android.widget.Button(GuiData.context),x*GuiData.guiScale,y*GuiData.guiScale,width*GuiData.guiScale,height*GuiData.guiScale);	
			this.widget.setClickable(true);
			this.widget.setOnTouchListener(new android.view.View.OnTouchListener({onTouch:function(view,event){
				try{if(that.enabled){
					switch(event.getActionMasked()){
						case android.view.MotionEvent.ACTION_DOWN:{that.setPressed(true);that.setHover(true);break;}				
						case android.view.MotionEvent.ACTION_MOVE:{if(event.getX()<0||event.getY()<0||event.getX()>width*GuiData.guiScale||event.getY()>height*GuiData.guiScale){that.setPressed(false);that.setHover(false);var current = true;}else if(!current){that.setHover(true);}break;}					
						case android.view.MotionEvent.ACTION_UP:{that.setPressed(false);that.setHover(false);if(current!==false&&!(event.getX()<0||event.getY()<0||event.getX()>(width*GuiData.guiScale)||event.getY()>(height*GuiData.guiScale))){Level.playSoundEnt(Player.getEntity(),"random.click",8);typeof action === "function" ? action() : null;}var current = false;break;}
						case android.view.MotionEvent.ACTION_CANCEL:{that.setPressed(false);that.setHover(false);current = false;break;}				
					}
				}}catch(e){print(e)}
				return false;
			}}));	
			this.renderOn = function(panel){
				panel.widget.addView(this.widget);
			};
			this.setHover = function(hover){
				this.hover = hover;
				switch(hover){
					case true:that.widget.setBackgroundDrawable(that.pressed ? this.backgrounds.pressed_hover : this.backgrounds.default_hover);break;
					case false:that.widget.setBackgroundDrawable(that.pressed ? this.backgrounds.pressed_normal : this.backgrounds.default_normal);break;
				}			
			};
			this.setHover(false);
			this.setPressed = function(pressed){
				this.pressed = pressed;
				switch(pressed){
					case true:that.widget.setBackgroundDrawable(that.hover ? this.backgrounds.pressed_hover : this.backgrounds.pressed_normal);break;
					case false:that.widget.setBackgroundDrawable(that.hover ? this.backgrounds.default_hover : this.backgrounds.default_normal);break;
				}
			};
			this.setPressed(false);
			this.setEnabled = function(enabled){
				this.enabled = enabled;
				this.widget.setAlpha(enabled?1:0.4);
				this.widget.setClickable(enabled);
			};
			this.isEnabled = function(){
				return this.enabled;
			};
		}
		return new helper();
	},
	extraSlot:function(){
	var helper = function(texture){
	this.normal = function(){
	var blank = ImageUtils.getStretched(BitmapUtils.getTrimmed(BitmapUtils.getFromTexture("textures/gui/newgui/dialog-background-atlas.png"),0,106,15,15), 7, 7, 2, 2, 38, 38).getBitmap()
	var canvas = new android.graphics.Canvas(blank);
	canvas.drawBitmap(UI.benchmark.slotsUI.empty(32, 32).getBitmap(), 6, 6, null );
	return ImageUtils.getDrawable(blank)
	}
	}
	return new helper
	}
}

UI.loadUI();
UI.craftBench()
UI.openBench()