var grav = {};

grav.genBS = function(N, width, height) {
	var rand = function(min,max) {
		return Math.random() * (max - min) + min;
	}

	var bs = [];

	for(var i = 0; i < N; i++) {
		var body = {
			x: rand(0,width),
			y: rand(0,height),
			m: 1e8,
			vx: 0,
			vy: 0
		}
		if(i == 0) {
			body.x = width/2;
			body.y = height/2;
			body.m = 1e11;
		}
		bs.push(body);
	}

	return bs;
};

grav.regrav = function(bs, dt) {
	var G = 6.67384e-11;

	var xnew = [];
	var ynew = [];

	bs.forEach(function(body) {
		var ax, ay;
		ax = ay = 0.0;
		bs.forEach(function(body2) {
			var dx = body2.x - body.x;
			var dy = body2.y - body.y;
			var dist2 =  dx*dx + dy*dy;
			if(dist2 != 0.0) {
				var fx = (G*body.m*body2.m*dx)/dist2;
				var fy = (G*body.m*body2.m*dy)/dist2;
				ax += fx/body.m;
				ay += fx/body.m;
			}
		});
		xnew.push(body.x + dt*body.vx + 0.5*dt*dt*ax);
		ynew.push(body.y + dt*body.vy + 0.5*dt*dt*ay);
		body.vx += dt*ax;
		body.vy += dt*ay;
	});

	bs.forEach(function(body, i) {
		body.x = xnew[i];
		body.y = ynew[i];
	})

	return bs;
}