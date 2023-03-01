# random-selector
 A simple random choice selector. Chooses randomly between comma-delimited choices user types into the text area.

[Live Demo](https://ephemeral-caramel-547ca9.netlify.app/)

# Description

I have an eager interest in the theoretical concept of randomness and its applications, such as PRNG (Pseudo Random Number Generators).

Wanted to apply it to a random selector application that chooses randomly from a set of options.

The PRNG used here is the [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister), whose period length is chosen to be a Mersenne prime. (Credits to Makomoto Matsumoto and Takuji Nishimura).

Here is the PRNG implementation I will be depending on: [`mersenne-twister.js`](https://gist.github.com/banksean/300494) (Credits to [Sean McCullough](https://gist.github.com/banksean) who encapsulated it). 

Changes I made to it was convert it to ES Class, then export it as a module to be imported to my `script.js` to use. 

# Technologies 

HTML5, CSS3, JavaScript

# How to use

1. Type any amount of choices separated by a comma. 
  - ***Any amount of whitespaces are allowed!***
2. Press `[Enter]` to initiate the random selection process.
3. The selected choice is highlighted below the textbox.

Note: Must run a live server since modules only work via HTTP(s), not locally. 

# How to run locally

1. Clone this repo (or download as zip on GitHub)
2. Use VS Code Liver Server Extension to open up `index.html`

# Specifications

- [x] Simple UI with textbox input to put choices in
- [x] Have choices update dynamically below as tags
- [x] Button that initiates tha random selection
- [x] Highlight the selected choice
- [x] Mobile Ready
- [x] Responsive Design

## Notes on making this

- For the choices to show up as ***Tags*** below the text area. 

It is contained within like this:

```html
<div id="tags">
  <span class="tag">Choice 1</span>
  <span class="tag highlight">Choice 2</span>
  <span class="tag">Choice 3</span>
</div>
```

where selected choice has a class of `highlight`. 

# Issue 1) How to use `mersenne.js` in my `script.js`

I would like to substitute `Math.random()`, so the usage would be: 

```js
/* If you want to use this as a substitute for Math.random(), use the random()
method like so: */

var m = new MersenneTwister();
var randomNumber = m.random();
```

But the issue was how? 

With my experience with modules, I decided to convert this:

```js
var MersenneTwister = function(seed) {
  if (seed == undefined) {
    seed = new Date().getTime();
  } 
  /* Period parameters */  
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
 
  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

  this.init_genrand(seed);
}

// ... more code below
```

to a **ES2015 class**. Then **export** it, by adding this line at the bottom of `mersenne.js`

```js
export { MersenneTwister };
```

Now in `script.js`, we can import it like this:

```js
import { MersenneTwister } from "./modules/mersenne.js";
```

Now I can use the class to generate a random number:

```js
let m = new MersenneTwister();
console.log(m.random()* 10);
```

But first I would have to add the `mersenne.js` script in the `index.html` like so:

```html
  <script type="module" src="modules/mersenne.js"></script>
```

# Issue 2) `Uncaught SyntaxError`: Cannot use import statement outtside a module (at *script.js:1:1*)

This is what showed up in my developer tools. This was a challenge that took me longer than I expected to solve, mostly because I had the positive constraints of trying to keep things simple (keep it in the Browser rather than use `Node.js` or `Express`). 

***In short, I just had to specify my entry point as a module in the HTML page.*** 

In `index.html`: 
```html
  <script type="module" src="script.js"></script>
```

And within `script.js` the module code `mersenne.js` is evaluated only the first time when imported. (No need to load it as an external script in the HTML file). So **delete** this line:

```html
  <script type="module" src="modules/mersenne.js"></script>
```

Now upon testing it worked! I'm so glad!

How did I figure it out? It was thanks to [javascript.info](https://javascript.info/modules-intro) for helping me review and master the basics. 

The journey started off from looking up the error, to various websites, and then this highly viewed [Stack Overflow Post](https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import) and browsing through every answer trying to fit my simple yet positive constraints. 

One of the answers mentioned that they forgot the `type="module"` `script` tag. To my chagrin, it was also my issue but for the wrong `src`. So then I went back to the tutorial link above and reread the article twice to make sure I understood, then I figured out it was just this line all along.

```html
<script type="module" src="script.js"></script>
```

# Takeaway:  

- When loading another script (a.k.a module) using the special directives `export` and `import` you must indicate to the browser that a script should be treated as a module by using the attribute `<script type="module">`

- I have to go back and master the basics when I come across a problem