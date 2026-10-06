// Eber's poster system (his IG posts): every display letter takes the next
// colour in a fixed sequence. The fourth step is the ink colour, so on black
// it reads white and on paper it reads black.
export const CYCLE = ['var(--eber-red)', 'var(--eber-yellow)', 'var(--eber-blue)', 'currentColor'];

// Colour for the n-th visible letter (spaces and punctuation don't advance it)
export const cycleColor = (n) => CYCLE[n % CYCLE.length];

export const isLetter = (char) => /[\p{L}\p{N}]/u.test(char);

export const countLetters = (text) => Array.from(text).filter(isLetter).length;
