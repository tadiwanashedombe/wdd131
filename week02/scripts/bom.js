// select elements from the DOM
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// wait for button clicks
button.addEventListener("click", function () {
	// Check if the user entered something
	if (input.value != "") {
		// create list item and give it the value of the input
		const li = document.createElement("li");
		li.textContent = input.value;
		// create a button and add a click event listener
		const deletebtn = document.createElement("button");
		deletebtn.textContent = "❌";
        
		deletebtn.addEventListener("click", function () {
			list.removeChild(li);
			input.focus();
		});
		// add the button to the list item
		li.appendChild(deletebtn);
		// OUTPUT: finally display the completed list item to the unordered list
		list.appendChild(li);
		// clear the user input field
		input.value = "";
	}
	// focus the user back to the input field
	input.focus();
});
