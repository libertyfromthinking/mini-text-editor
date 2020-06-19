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
var addBtn = document.getElementById('add')
var undoBtn = document.getElementById('undo')
var redoBtn = document.getElementById('redo')
var added = document.getElementById('added')
var close = document.getElementsByClassName('close')

// 선택된 단어들을 tagname:boolean 형식으로 저장, 추가 버튼을 눌러 우측 컴포넌트에 추가된 단어는 False, 추가예정인 단어는 True
var selectedWords = {}
var undoStack = Array()
var redoStack = Array()

// 추가 버튼 이벤트리스너
addBtn.addEventListener('click', addWords)
// 실행취소 버튼 이벤트리스너
undoBtn.addEventListener('click', undo)
// 재실행 버튼 이벤트리스너
redoBtn.addEventListener('click', redo)

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
	if (this.style.color=="#f58720"){
		this.style.color=""
		delete selectedWords[this.className]
		
	} else if(this.style.color==""){
		this.style.color="#f58720"
		selectedWords[this.className] = true
		
	}
	undoStack.push({'select':this.className})
}

// 추가 버튼을 눌렀을 때의 동작, 해당 노드를 복사해 우측 컴포넌트에 자식노드로 추가함
function addWords(){
	if(Object.keys(selectedWords).length){
		for(var i in selectedWords){
			el = document.getElementsByClassName(i)[0]
			el_cp = el.cloneNode(true)
			el.style.color = 'red';
			el.style.fontWeight = 'bold';
			el_cp.style.color = ''
			el_cp.innerHTML += '<button class="close">X</button><br/>'
			added.appendChild(el_cp)
			
		}
		for(var i=0; i<close.length; i++){
			close[i].addEventListener('click', removeWord)
		}
		undoStack.push({'add':selectedWords})
		selectedWords = {}
	}else{
		alert('단어를 선택해주십시오.')
	}
}
	
// 복사된 노드의 옆에 X 버튼을 눌렀을 때의 동작, 부모노드인 복사된노드를 찾아서 삭제 후 기존의 노드르 원래 색깔로 돌림
function removeWord(){
	clsName = this.parentNode.className
	remove = document.getElementsByClassName(clsName)
	added.removeChild(remove[1])
	remove[0].style.color = ""
	remove[0].style.fontWeight = ""
	undoStack.push({'remove':clsName})
}

// 실행취소, 스택을 만들고 {'동작':객체 또는 클래스네임} 같은 객체형식으로 하나씩 pop해서 사용, 하나의 동작이나 redo를 사용하면 스택에 하나씩 push
function undo(){
	if(undoStack.length>0){
		switch(Object.keys(undoStack[undoStack.length-1])[0]){ 
			case 'remove':
				// 삭제
				selectedWords_temp = selectedWords
				selectedWords = {}
				clsName = undoStack.pop()['remove']
				selectedWords[clsName] = true
				addBtn.click()
				undoStack.pop()
				redoStack.push({'remove':clsName})
				selectedWords = selectedWords_temp
				break
			case 'add':
				// 추가
				obj = undoStack.pop()['add']
				redoStack.push({'add':obj})
				
				for(var i in obj){
					remove = document.getElementsByClassName(i)[1].childNodes[1].click()
					undoStack.pop()
				}
				break
			case 'select':
				// 선택, 선택해제 
				clsName = undoStack.pop()['select']
				document.getElementsByClassName(clsName)[0].click()
				redoStack.push(undoStack.pop())
				break
		}
	}else{
		alert('실행할 동작이 없습니다.')
	}
}

// 재실행 버튼, undo와 마찬가지로 스택을 만들고 요소로 객체를 사용하며 undo와는 반대로 작동함, undo가 실행될 때만 스택에 push
function redo(){
	if(redoStack.length>0){
		// console.log(Object.keys(redoStack[redoStack.length-1]))
		switch (Object.keys(redoStack[redoStack.length-1])[0]){
			case 'remove':
				// 삭제
				clsName = redoStack.pop()['remove']
				document.getElementsByClassName(clsName)[1].childNodes[1].click()
				break
			case 'add':
				// 추가
				selectedWords_temp = selectedWords;
				selectedWords = {}
				selectedWords = redoStack.pop()['add']
				addBtn.click()
				selectedWords = selectedWords_temp
				break
			case 'select':
				// 선택, 선택해제
				clsName = redoStack.pop()['select']
				document.getElementsByClassName(clsName)[0].click()
				break
		}
	}else{
		alert('실행할 동작이 없습니다.')
	}
}