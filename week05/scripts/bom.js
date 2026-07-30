// select elements from the DOM
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");
let chaptersArray = getChaptersList() || [];

function setChaptersList(){
	// set key,value for localStorage
	localStorage.setItem('BOMList', JSON.stringify(chaptersArray));
}
function getChaptersList(){
	// get value for localStorage
	return JSON.parse(localStorage.getItem('BOMList'));
}

function displayList(item){
	// create list item for value
	let li = document.createElement('li');
	// create delete button for each list element
	let deletebtn = document.createElement('button');
	
	//add input value to list
	li.textContent = item;
	// add ❌ to delete button
	deletebtn.textContent = "❌";
	// add class delete to btn
	deletebtn.classList.add('delete')
	// add button to list item
	li.append(deletebtn);
	// add list item to the whole list
	list.append(li);

	// deletebtbn event listener 'click' functionality
	deletebtn.addEventListener('click',function(){
		// remove list item 
		list.removeChild(li);
		// remove chaptter from arr and localStorage
		deleteChapter(li.textContent);
		// focus on the input field
		input.focus();
	});
}


function deleteChapter(chapter){
	chapter = chapter.slice(0,chapter.length -1);	
	chaptersArray = chaptersArray.filter(item => item !== chapter);
	setChaptersList();
}
// wait for button clicks
button.addEventListener("click", function () {
	// Check if the user entered something
	if (input.value != "") {
		// display input
		displayList(input.value);
		//add input to arr 
		chaptersArray.push(input.value);
		setChaptersList();
		// clear input field
		input.value = '';
		// focus the user back to the input field
		input.focus();
	}

});

chaptersArray.forEach(chapter => {
	displayList(chapter);

});
