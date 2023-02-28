# random-selector
 A simple random choice selector. Chooses randomly between comma-delimited choices user types into the text area.

# Description

I have an eager interest in the theoretical concept of randomness and its applications, such as PRNG (Pseudo Random Number Generators).

Wanted to apply it to a random selector application that chooses randomly from a set of options.

The PRNG used here is the [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister), whose period length is chosen to be a Mersenne prime. (Credits to Makomoto Matsumoto and Takuji Nishimura).

Here is the implementation I will be depending on: [`mersenne-twister.js`](https://gist.github.com/banksean/300494) 

(Credits to [Sean McCullough](https://gist.github.com/banksean) who encapsulated it)

# Technologies 

HTML5, CSS3, JavaScript

# How to use

1. Type any amount of choices separated by a comma. 
  - ***Any amount of whitespaces are allowed!***
2. Press `[Enter]` to initiate the random selection process.
3. The selected choice is highlighted below the textbox.

# How to run locally

1. Clone this repo (or download as zip on GitHub)
2. Open up `index.html` on browser of choice and use

# Specifications

- [ ] Simple UI with textbox input to put choices in
- [ ] Have choices update dynamically below as tags
- [ ] Button that initiates tha random selection
- [ ] Highlight the selected choice