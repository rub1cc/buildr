const adjectives = [
  "adorable",
  "brave",
  "cute",
  "bright",
  "beautiful",
  "cheerful",
  "clever",
  "colorful",
  "famous",
  "fancy",
  "sparkling",
  "powerful",
];

const nouns = [
  "actor",
  "cat",
  "bear",
  "doctor",
  "potato",
  "parrot",
  "crayon",
  "flower",
  "dream",
  "diamond",
  "agent",
  "author",
];

const selectArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateSlug = () => {
  return `${selectArray(adjectives)}-${selectArray(
    nouns
  )}-${getRandomIntInclusive(10000, 99999)}`;
};
