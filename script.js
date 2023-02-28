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

/**
 * Highlights the given tag
 * @param {*} tag to highlight 
 */
function highlightTag(tag) {
  tag.classList.add('highlight');
}


/**
 * Removes the highlight of the given tag
 * @param {*} tag tag to remove highlight
 */
function removeHighlightTag(tag) {
  tag.classList.remove('highlight');
}

/**
 * 
 * @returns a random tag among the set of choices
 */
function pickRandomTag() {
  /* Get the node list of tags */
  const tags = document.querySelectorAll('.tag');
  /* Select a random index */
  return tags[0];
}

/**
 * Randomly selects a tag. Highlights tags until the last choice is selected. 
 */
function selectRandom(){
  const highlightInstances = 20; 
  const highlightTime = 100;   // in milliseconds

  /* The highlight animation that demonstrates the illusion of choice */
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      removeHighlightTag(randomTag);
    }, highlightTime)

  }, highlightTime);

  /* The actual selection */
  setTimeout(() => {
    // Stop the highlight interval
    clearInterval(interval);

    setTimeout( () => {
      const chosenOne = pickRandomTag();
      highlightTag(chosenOne)

    }, highlightTime)
  }, highlightInstances * highlightTime)
}

/* Event Listeners */
textArea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  /* Check if user hits 'Enter' key */
  if(e.key === 'Enter') {
    /* Clear the input after some time */
    setTimeout( () => {
      e.target.value = '';
    }, 10);
    
    selectRandom();
  }
});