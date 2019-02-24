// Intigrates with lock screen on line 186


var clock = document.getElementById('clock'),
		cliked = false,
		randMinPos = 0,
		randHourPos = 0,
		minCorrect = false,
		hourCorrect = false;

$(document).ready(function(){
	
	var randomTime = new Date();
	updateRandomTime(randomTime);
	
	setInterval(function(){updateTime();}, 50);
	
	function updateTime() 
	{
		var d = new Date();
		var s = getSec(d);
		var m = getMin(d);
		var h = getHour(d);
		
		$(".s-hand").css("transform", "translate(-50%, -100%) rotate(" + s*6 + "deg)");
		$(".m-hand").css("transform", "translate(-50%, -100%) rotate(" + m*6 + "deg)");
		$(".h-hand").css("transform", "translate(-50%, -100%) rotate(" + (h*30 + m*0.5) + "deg)");
	}
	
	function calcAngle(hand)
	{
		var el = document.getElementById(hand);
		var st = window.getComputedStyle(el, null);
		var tr = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform") ||
         "FAIL";
		
		var values = tr.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];

		var scale = Math.sqrt(a*a + b*b);
		var sin = b/scale;
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

		if(hand = "h-handRand")
		{
			console.log('Rotation of orange hand: ' + angle + 'deg');
		}
		
		if(hand = "h-hand")
		{
				console.log('Rotation of black hand: ' + angle + 'deg');
		}
		return angle;
	}
	
	function updateRandomTime(d) 
	{
		var m = getMin(d);
		clock.randMinPos = m;
		var h = getHour(d);
		clock.randHourPos = h;
		var randHour = getRandomHour();
		var randMin = getRandomMin();
		
		$(".m-handRand").css("transform", "translate(-50%, -100%) rotate(" + randMin*6 + "deg)");
		$(".h-handRand").css("transform", "translate(-50%, -100%) rotate(" + (randHour*30 + randMin*0.5) + "deg)");
	}
	
	function getRandomHour()
	{
		var tempDate = new Date();
		var h = getHour(tempDate);
		
		var randomHour = Math.floor(Math.random() * 23);
		
		while(randomHour == h)
		{
			randomHour = Math.floor(Math.random() * 23);
		}
		
		return randomHour;
	}
	
		function getRandomMin()
	{
		var tempDate = new Date();
		var m = getMin(tempDate);
		
		var randomMin = Math.floor(Math.random() * 59);
		
		while(randomMin == m)
		{
			randomMin = Math.floor(Math.random() * 59);
		}
		
		return randomMin;
	}
	
	function getHour(d)
	{
		var hour = d.getHours();

			if(hour >= 12) 
			{
				hour = hour-12;
			}

			if(hour == 0) 
			{
				h = 12;
			}
			return hour;
	}
	
	function getMin(d)
	{
		return d.getMinutes();
	}
	
	function getSec(d)
	{
		return d.getSeconds() + (d.getMilliseconds()/1000);
	}	
	
	function areHandsAligned (whichHand)
	{
		if (whichHand == "hour")
		{
			if(calcAngle("h-hand") == calcAngle("h-handRand"))
			{
				return true;
				alert ("match!");
			}
			return false;
		}
		
		if (whichHand == "min")
		{
				if(calcAngle("m-hand") == calcAngle("m-handRand"))
			{
				return true;
				alert ("match!");
			}
			return false;
		}
	}
	
	// Rotate the hands clockwise until in position
	clock.onmousedown = function(){
		
		if(hourCorrect == false)
		{
    	timeout = setInterval(function(){
				clock.randMinPos += 1;
				clock.randHourPos += 1;

				$(".h-handRand").css("transform", "translate(-50%, -100%) rotate(" + (clock.randHourPos*1 + clock.randMinPos*0.5) + "deg)");

				// if hands are aligned set hourCorrect = true
				if(areHandsAligned("hour"))
				{
					hourCorrect = true;		
				}
			}, 10);
		}
			
			// if the hour hand IS "locked in" then move the minute hand
			if(hourCorrect == true && minCorrect == false)
				{
					timeout = setInterval(function(){
						clock.randMinPos += 1;
						$(".m-handRand").css("transform", "translate(-50%, -100%) rotate(" + clock.randMinPos*6 + "deg)");
				
						// if hands are aligned set minCorrect = true
						if(areHandsAligned("min"))
						{
							minCorrect = true;	
							
							location.reload();
							
						}
					}, 50);
				}
		};
	
	clock.onmouseup = function(){
    clearInterval(timeout);
	};
});