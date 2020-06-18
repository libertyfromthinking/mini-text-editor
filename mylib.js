window.onload = function(){
	wordArr = Array();
	for(var i=0; i<10000; i++){
		randomWord = document.createElement('span')
		randomWord.innerHTML = randomString()+' '
		words.appendChild(randomWord)
		randomWord.className = String(i)
		randomWord.addEventListener("click",changeToRed)
	}
	
}


var words = document.getElementById('words')
var add = document.getElementById('add')
var undo = document.getElementById('undo')
var redo = document.getElementById('redo')
var added = document.getElementById('added')
var close = document.getElementsByClassName('close')
var selectedWords = {}

add.addEventListener('click', addWords)



function randomString() {
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var string_length = 5;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
	var rnum = Math.floor(Math.random() * chars.length);
	randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
	}


function changeToRed(){
	if (this.style.color=="red"){
		this.style.color=""
		delete selectedWords[this.className]
	} else if(this.style.color==""){
		this.style.color="red"
		selectedWords[this.className] = true
	}
	
	
}

function addWords(){
	for(var i in selectedWords){
		if(selectedWords[i]){
			el = document.getElementsByClassName(i)[0]
			el.style.color = 'green'
			el_cp = el.cloneNode(true)
			el_cp.innerHTML += '<button class="close">X</button><br/>'
			added.appendChild(el_cp)
			selectedWords[i] = false
		}
	}
	for(var i=0; i<close.length; i++){
		close[i].addEventListener('click', removeWord)
	}
}
	

function removeWord(){
	remove = document.getElementsByClassName(this.parentNode.className)
	added.removeChild(remove[1])
	remove[0].style.color = ""
	
}