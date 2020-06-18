// 페이지가 로드되면 10000개의 임의의 단어를 생성
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

// 선택된 단어들을 tagname:boolean 형식으로 저장, 추가 버튼을 눌러 우측 컴포넌트에 추가된 단어는 False, 추가예정인 단어는 True
var selectedWords = {}


// 추가 버튼 이벤트리스너
add.addEventListener('click', addWords)


// length 5의 랜덤문자열 생성
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

// 추가할 단어를 임의로 선택할 때의 동작, 빨간색으로 바꾸고 selectedWords에 추가하거나 color 속성값을 없애고 selectedWords에서도 삭제함
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