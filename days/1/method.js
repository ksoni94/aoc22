const fs = require("fs");

const elfCalories = () => {
  const allElves = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const elves = allElves.split(/\n\n/);
  const totalCaloriesPerElf = elves.map((elf) => {
    const calories = elf.split(/\n/);
    const totalCalories = calories.reduce((total, c) => total + Number(c), 0);
    return totalCalories;
  });

  const mostCalories = Math.max(...totalCaloriesPerElf);
  const sortedCalories = totalCaloriesPerElf.sort((a, b) => b - a);

  const topThreeCaloriesTotal =
    sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
  return { mostCalories, topThreeCaloriesTotal };
};

console.log(elfCalories());
