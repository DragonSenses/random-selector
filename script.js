const tagsElem = document.getElementById("tags");
const textArea = document.querySelector("#textarea");

/* Automatically focus on text area, puts cursor within and 
user can start typing */
textArea.focus();

/**
 * Creates the tags based on the user input of the textarea. 
 * Creates an array of strings delimited by commas and have whitespace\
 * trimmed off. 
 * @param {string} input 
 */
function createTags(input) {
  /* tags delimited by commas, can't be empty string, trim whitespace */
  const tags = 
    input.split(',')
         .filter(tag => tag.trim() !== '')
         .map(tag => tag.trim());

  console.log(tags);
  tagsElem.innerHTML = '';

  /* Add tags into HTML */
  tags.forEach(tag => {
    const tagElem = document.createElement("span");
    tagElem.classList.add('tag');
    tagElem.innerHTML= tag;
    tagsElem.appendChild(tagElem);
  })
}

/* Event Listeners */
textArea.addEventListener('keyup', (e) => {
  createTags(e.target.value);
});