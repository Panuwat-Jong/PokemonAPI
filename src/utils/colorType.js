export const typeColorsArray = [
  {
    name: "grass",
    color: "#a8ff98",
  },
  {
    name: "poison",
    color: "#d6a2e4",
  },
  {
    name: "normal",
    color: "#dcdcdc",
  },
  {
    name: "fire",
    color: "#ffb971",
  },
  {
    name: "water",
    color: "#8cc4e2",
  },
  {
    name: "electric",
    color: "#ffe662",
  },
  {
    name: "ice",
    color: "#8cf5e4",
  },
  {
    name: "fighting",
    color: "#da7589",
  },
  {
    name: "ground",
    color: "#e69a74",
  },
  {
    name: "flying",
    color: "#BBC9e4",
  },
  {
    name: "psychic",
    color: "#ffa5da",
  },
  {
    name: "bug",
    color: "#bae05f",
  },
  {
    name: "rock",
    color: "#c9bb8a",
  },
  {
    name: "ghost",
    color: "#8291e0",
  },
  {
    name: "dark",
    color: "#8e8c94",
  },
  {
    name: "dragon",
    color: "#88a2e8",
  },
  {
    name: "steel",
    color: "#9fb8b9",
  },
  {
    name: "fairy",
    color: "#fdb9e9",
  },
];

export const colorType = {
  typeColor: (data) => {
    let resultColors = [];
    data.map((item) => {
      const types = item.type.name;
      for (const type of typeColorsArray) {
        if (type.name === types) {
          resultColors.push(type.color);
        }
      }
    });
    return resultColors;
  },
};
