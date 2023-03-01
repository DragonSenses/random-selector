import { MersenneTwister } from "./modules/mersenne.js";

const tagsElem = document.getElementById("tags");
const textArea = document.querySelector("#textarea");

/* Pseudo-Random Number Generator */
const PRNG = new MersenneTwister();

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
  if(tag === undefined){
    return;
  }

  tag.classList.add('highlight');
}


/**
 * Removes the highlight of the given tag
 * @param {*} tag tag to remove highlight
 */
function removeHighlightTag(tag) {
  if(tag === undefined){
    return;
  }
  
  tag.classList.remove('highlight');
}

/**
 * 
 * @returns a random tag among the set of choices
 */
function pickRandomTag() {
  /* Get the node list of tags */
  const tags = document.querySelectorAll('.tag');
  /* Select a node tag from a random index */
  return tags[Math.floor(PRNG.random() * tags.length)];
}

/**
 * Randomly selects a tag. Highlights tags until the last choice is selected. 
 */
function selectRandom(){
  const highlightInstances = 35; 
  const highlightTime = 90;   // in milliseconds

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
    /* Error checking - if text area is empty and user presses Enter */
    if(document.querySelectorAll('.tag').length == 0) { return false; }

    /* Clear the input after some time */
    setTimeout( () => {
      e.target.value = '';
    }, 10);
  
    selectRandom();
  }
});