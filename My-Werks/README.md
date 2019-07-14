# My-Works
My Work-In-Progress Works, will keep this organized.

#BlockImageLoader
A Generator of 3D inventory model of blocks
By Affogatoman,
#
Made top, left, right textures into a new bitmap with transparent space. I haven't tested this yet but you could try by doing:
importing it in a texture pack and adding this to your script

 eval("" + new java.lang.String("textures/<your directory>/<Block Image Loader JS file>") + ""),
or local directory (add to script):

//(i don't know if apache commons is installed indefault in android)
 eval(""+ org.apache.commons.io.FileUtils.readFileToString(<directory> /BlockImageLoader.js) +"")

 // if not, use this instead,
 eval("" + new java.lang.String(Files.readAllBytes(Paths.get("<directory>"))) + "")
original link:
https://github.com/if-Team/ModPE-Scripts/tree/master/BlockImageLoader

Present Juliano Here Againnnnn!
=============================
AH YES! This was the great times where I was actually learning how to actually do things better now (atleast in ModPE JS).
I had a notebook where I just write things for my mod plans and it was fun and I really loved some of the little bits of lore in "Skin Shop.js" file, I'm pretty sure it was inspired by the splash text in the Minecraft title screen and TF2. Good old times! I might make another mod again :) I hope I still have that quirky humour ... atleast deep inside 🥴

The Block Image Generator is just me trial-and-error-ing, I had no idea how matrixes works lmao... but I still hoped that I could make a dynamic inventory GUI in ModPE, might give it a shot ;).
