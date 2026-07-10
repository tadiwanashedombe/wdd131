const article  = document.querySelector('article');

article.innerHTML = 'innerHTML supports <strong>HTMl</strong> tags.Th e textContent does not.';
//Change inline css
article.style.textAlign = 'right';
// change attribute element
article.setAttribute('class','active');

// Create an alememt
const paragraph = document.createElement('p');
article.appendChild(paragraph);
paragraph.innerHTML = 'Hello world addition!';

//remove an element
article.removeChild(paragraph);
// article.remove();