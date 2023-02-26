var buttonGrid = document.getElementById("buttonGrid");
	var buttons = buttonGrid.children;
	var pattern = [];
	var state = "train1";
	var buttonsMode = true;
	var loginattempts = 0;
	buttonGrid.onclick = togglePattern;
	var ok =false;
	
	window.onload = function() {
		localStorage.removeItem("testPattern");
		var savedPattern = localStorage.getItem("finalPattern");
	
	  	if (savedPattern) {
			document.getElementById("notification").innerHTML="Enter the Pattern";
			state="test";
		  	validatePattern();
		}
	};
	function storePattern(){
		if (window.localStorage) {
			if(state == "train1"){
				localStorage.testPattern1 = pattern;
				console.log("pattern1 set to : "+localStorage.testPattern1);
				document.getElementById("notification").innerHTML="Confirm Pattern";
				state = "train2";
				addControls();
			} else if(state == "train2"){
				localStorage.testPattern2 = pattern;
				console.log("pattern2 set to : "+localStorage.testPattern2);
				document.getElementById("notification").innerHTML="Pattern saved successfully.";
				state = "test";
				matchAndSetPattern();
			}
			 else if(state == "test"){
				localStorage.testPattern = pattern;
				validatePattern();
			}
		}
		resetGrid();
	}

	function addControls(){
		var controlBox = document.getElementById("controls");
		if(state == "train1"){
			controlBox.innerHTML="";
			var element = document.createElement("input");
			element.setAttribute("type", "button");
			element.setAttribute("value", "Retry");
			element.setAttribute("id", "cancelBtn");
			element.setAttribute("onclick", "cancelTraining()");
			controlBox.appendChild(element);

			element = document.createElement("input");
			element.setAttribute("type", "button");
			element.setAttribute("value", "Confirm");
			element.setAttribute("id", "continueBtn");
			element.setAttribute("onclick", "storePattern()");			
			element.setAttribute("disabled","true");
			controlBox.appendChild(element);
		} else if(state == "train2"){
			controlBox.innerHTML="";
			var element = document.createElement("input");
			element.setAttribute("type", "button");
			element.setAttribute("value", "Cancel");
			element.setAttribute("id", "cancelBtn");
			element.setAttribute("onclick", "cancelTraining()");
			controlBox.appendChild(element);

			element = document.createElement("input");
			element.setAttribute("type", "button");
			element.setAttribute("value", "Verify");
			element.setAttribute("id", "continueBtn");
			element.setAttribute("onclick", "storePattern()");			
			element.setAttribute("disabled","true");
			controlBox.appendChild(element);

		}
		else if(state == "test"){
			controlBox.innerHTML="";
			var element = document.createElement("input");
			element.setAttribute("type", "button");
			element.setAttribute("value", "Forgot");
			element.setAttribute("id", "continueBtn");
			element.setAttribute("onclick", "forgetPattern()");
			controlBox.appendChild(element);

		}
	}


	function cancelTraining(){
		state="train1";
		ok=false;
		document.getElementById("controls").innerHTML="";
		document.getElementById("notification").innerHTML="Set Pattern";
		resetGrid();
	}



	function forgetPattern()
	{
		ok=true;
		var ans = window.prompt("What is 40+50 ");
		if(ans == "4050")
		{
			window.confirm("Want to reset the pattern? ");
			validatePattern();
		}
		else{
			window.alert("Better Luck Next Time!!");
		}
	}

	function validPattern(){
		if(state == "test"){
			storePattern();
			validatePattern();
			return;
		}
		document.getElementById("continueBtn").removeAttribute("disabled");
	}
	
	function validatePattern(){
		
		if(state == "test" && window.localStorage){
			
			if(localStorage.finalPattern == localStorage.testPattern && ok){
				console.log("Correctamundo : "+localStorage.testPattern);
				loginattempts=0;
				cancelTraining();
			}
			else if(localStorage.finalPattern == localStorage.testPattern)
			{
				console.log("Correctamundo : "+localStorage.testPattern);
				loginattempts=0;
				document.getElementById("notification").innerHTML="Phone Unlocked";
				document.getElementById("continueBtn").disabled = true;

			} else {
				loginattempts++;
				if (loginattempts > 7) 
				{
					
					document.getElementById("continueBtn").disabled = true;
					 setTimeout(() => {
					document.getElementById("continueBtn").disabled = false;
					loginattempts = 0;}, 30000);
					document.getElementById("notification").innerHTML="Phone Locked. Try Again after 30 sec. ";
				} 
				else{
				console.log("Wrong pattern", loginattempts);
				document.getElementById("notification").innerHTML="Try Again";
			}

			}
		}
	}

	function matchAndSetPattern(){
		if(state == "test" && window.localStorage){
			if(localStorage.testPattern1 == localStorage.testPattern2){
				localStorage.finalPattern = localStorage.testPattern2;
				console.log("pattern set to : "+localStorage.finalPattern);
				document.getElementById("notification").innerHTML="Lock Pattern saved successfully.";
				addControls();
			} else {
				console.log("Patterns dont match");
				document.getElementById("notification").innerHTML="Patterns don't match.";
				state = "train2";
			}
		} 
	}

	function resetGrid(){
		pattern = [];
		for(var i=0;i<buttons.length;i++){
			buttons[i].onmouseover=null;
			buttons[i].classList.remove("selected");
		}

		buttonsMode=true;
	}

	function togglePattern(e){
		document.getElementById("notification").innerHTML="Click again when finished.";		

		if(buttonsMode==false){
			if(pattern.length > 3){
				document.getElementById("notification").innerHTML="Pattern recorded!";
				validPattern();
			} else {
				console.log("pattern too short ");
				document.getElementById("notification").innerHTML="Connect at least 4 dots. Try again:";
				setTimeout(resetGrid,800);
			}
			for(var i=0;i<buttons.length;i++){
				buttons[i].onmouseover=null;
			}
			return;
		}

		addControls();
		for(var i=0;i<buttons.length;i++){
			buttons[i].onmouseover=addToPattern;
		}

		var event = e || window.event
  		var target= 'target' in event? event.target : event.srcElement;
		target.classList.add("selected");
		if(pattern.indexOf(target.id) == -1 && target.id != ""){
			pattern.push(target.id);
		}
		buttonsMode=false;
	}

	function addToPattern(e){
	 	var event = e || window.event
  		var target= 'target' in event? event.target : event.srcElement;
		if(pattern.indexOf(target.id) == -1 && target.id != ""){
			pattern.push(target.id);
		}
		target.classList.add("selected")
		console.log("pattern " + pattern);
	}


