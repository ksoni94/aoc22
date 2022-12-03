import fs from "fs";

const priorityOrder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getPriority = ({ letter }: { letter: string }) => {
  const index = priorityOrder.indexOf(letter);
  return index + 1;
};

const getSharedItem = ({
  compartmentOne,
  compartmentTwo,
}: {
  compartmentOne: string[];
  compartmentTwo: string[];
}): string => {
  for (const item of compartmentOne) {
    for (const itemTwo of compartmentTwo) {
      if (item === itemTwo) {
        return item;
      }
    }
  }
  return "";
};

const getBadgeType = ({
  groupOne,
  groupTwo,
  groupThree,
}: {
  groupOne: string[];
  groupTwo: string[];
  groupThree: string[];
}): string => {
  for (const item of groupOne) {
    for (const itemTwo of groupTwo) {
      for (const itemThree of groupThree) {
        if (item === itemTwo && item === itemThree) {
          return item;
        }
      }
    }
  }
  return "";
};

const findDuplicateItem = () => {
  const rawData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const allRucksackItems: string[] = rawData.split(/\n/);

  let sumOfPriorities = 0;

  allRucksackItems.map((ruckSack: string) => {
    // get half way mark
    const halfwayIndex = ruckSack.length / 2;
    const compartmentOne = ruckSack.slice(0, halfwayIndex).split("");
    const compartmentTwo = ruckSack
      .slice(halfwayIndex, ruckSack.length)
      .split("");

    const sharedItem = getSharedItem({ compartmentOne, compartmentTwo });
    const priorityNumber = getPriority({ letter: sharedItem });

    sumOfPriorities = sumOfPriorities + priorityNumber;
  });

  return sumOfPriorities;
};

const findBadgeType = () => {
  const rawData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const elfGroups = rawData.match(/(?=[\s\S])(?:.*\n?){1,3}/g);

  let sumOfPriorities = 0;
  elfGroups?.map((group) => {
    const individualGroups = group.split(/\n/);
    const groupOne = individualGroups[0].split("");
    const groupTwo = individualGroups[1].split("");
    const groupThree = individualGroups[2].split("");

    const badgeType = getBadgeType({ groupOne, groupTwo, groupThree });
    sumOfPriorities = sumOfPriorities + getPriority({ letter: badgeType });
  });

  return sumOfPriorities;
};

console.log(findBadgeType());
