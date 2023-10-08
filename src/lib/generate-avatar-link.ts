const seeds = [
  "Patches",
  "Midnight",
  "Toby",
  "Sam",
  "Abby",
  "Socks",
  "Cleo",
  "Felix",
  "Rocky",
  "Precious",
  "Garfield",
  "Zoey",
  "Sheba",
  "Maggie",
  "Sammy",
  "Spooky",
  "Kitty",
  "Loki",
  "Pepper",
  "Snowball",
];

const selectArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateAvatarLink = () => {
  return "https://api.dicebear.com/7.x/thumbs/svg?size=64&seed=" + selectArray(seeds);
};
