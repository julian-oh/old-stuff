

Spawn = {
	Farland_ENDEREYE:function(x, y, z){
		specialMobs.push[{
			"entity":eye,
			"AI":function(){
				var selector = Utils.rnd(2)
				var mob = this.entity
				this.move = function(){
						var target = Level.spawnMob(x + Utils.rnd(30, true), y + Utils.rnd(30, true), z + Utils.rnd(30, true), Entity.PIG)
						Entity.setRenderType(Entity.PIG, emptyModel)
						Utils.throwEntity(mob, target, mob)
						Entity.remove(target)
				}
				if(selector == 1)
					this.move()
			}
		}]
	}
}


Utils = {
	author: "Desno365",
	rnd:function(value, negative){
		if(negative==true)
		return Math.round(Math.random()*(value * 2)) - value
		else if
		return Math.round(Math.random()*(value)) + 1
	},
	checkEntityProximity:function(b,a,c,d){
		return Level.checkProximityOfPoints(Entity.getX(b),Entity.getY(b),Entity.getZ(b),Entity.getX(a),Entity.getY(a),Entity.getZ(a),c,d)
		},
	checkProximityOfPoints:function(c,e,h,b,d,g,a,f){
		if(f==null)
			f=a
		if(!(Math.abs(c-b)<=a))
			return false
		if(!(Math.abs(e-d)<=f))
			return false
		if(!(Math.abs(h-g)<=a))
			return false
		return true
	},
	inRange:function(attacker, victim){
		return Level.checkEntityProximity(victim,attacker,10,3)
		},
	throwEntity:function(attacker, victim, projectile){
		var e=Math.atan2((Entity.getZ(attacker)-Entity.getZ(victim)),(Entity.getX(attacker)-Entity.getX(victim)));
		var c=Utils.getVector((java.lang.Math.toDegrees(e)-90),0);Level.playSoundEnt(attacker,"random.bow",1000,0);
			Entity.setPosition(projectile ,Entity.getX(attacker)+(-c.x*1.1),Entity.getY(attacker)+1,Entity.getZ(attacker)+(-c.z*1.1));
			Entity.setVelX(projectile,-c.x*1.8);
			Entity.setVelY(projectile,c.y*1.8);
			Entity.setVelZ(projectile,-c.z*1.8);
	},
	Position:function(a,c,b){
		this.x=a; 
		this.y=c; 
		this.z=b
		},
	Vector:function(a,c,b){
		this.x=a; 
		this.y=c; 
		this.z=b}, 
	getVector:function(c,b){
		var a=new Utils.Vector(); 
		a.y=-Math.sin(java.lang.Math.toRadians(b)); 
		a.x=-Math.sin(java.lang.Math.toRadians(c))*Math.cos(java.lang.Math.toRadians(b)); 
		a.z=Math.cos(java.lang.Math.toRadians(c))*Math.cos(java.lang.Math.toRadians(b)); 
		return a}; 
}