import fs from "fs";

type ConductorProps = {
  mainArray: string[][];
  amountToMove: number;
  fromIndex: number;
  toIndex: number;
};
const conductor = ({
  mainArray,
  amountToMove,
  fromIndex,
  toIndex,
}: ConductorProps) => {
  for (let i = 0; i < amountToMove; i++) {
    const zeroIndexedFrom = fromIndex - 1;
    const zeroIndexedTo = toIndex - 1;
    if (!mainArray[zeroIndexedFrom] || !mainArray[zeroIndexedTo]) {
      return;
    }
    const topItem = mainArray[zeroIndexedFrom].shift();

    if (!topItem) {
      return;
    }
    mainArray[zeroIndexedTo].unshift(topItem);
  }
  console.log({ mainArray });
  return mainArray;
};

const conductor9001 = ({
  mainArray,
  amountToMove,
  fromIndex,
  toIndex,
}: ConductorProps) => {
  const zeroIndexedFrom = fromIndex - 1;
  const zeroIndexedTo = toIndex - 1;
  if (!mainArray[zeroIndexedFrom] || !mainArray[zeroIndexedTo]) {
    return;
  }
  const topItems = mainArray[zeroIndexedFrom].splice(0, amountToMove);

  if (!topItems) {
    return;
  }
  mainArray[zeroIndexedTo].unshift(...topItems);

  return mainArray;
};

const instructionParser = ({ str }: { str: string }) => {
  // this assumes that the instructions will always be move x from y to z
  const keyWords = {
    move: "move",
    from: "from",
    to: "to",
  };

  const splitInstructions = str.split(" ");
  if (
    !splitInstructions.includes(keyWords.move) &&
    !splitInstructions.includes(keyWords.from) &&
    splitInstructions.includes(keyWords.to)
  ) {
    throw new Error("Bad instructions");
  }
  return {
    move: splitInstructions[splitInstructions.indexOf(keyWords.move) + 1],
    from: splitInstructions[splitInstructions.indexOf(keyWords.from) + 1],
    to: splitInstructions[splitInstructions.indexOf(keyWords.to) + 1],
  };
};

const getTopCrates = () => {
  const rawData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const lineByLine = rawData.split(/\n/);
  const stackLine = lineByLine.find((line) => line.startsWith(" 1"));
  if (!stackLine) {
    throw new Error("Cant find stackline");
  }
  const stackIndexes = stackLine
    .split("")
    .map((element, index) => {
      if (element === " ") {
        return;
      }
      return index;
    })
    .filter((value): value is number => value !== undefined);

  const listArr: string[][] = [];

  const stack = lineByLine.slice(0, lineByLine.indexOf(stackLine));
  stack.map((line) =>
    stackIndexes.map((stackIndex, index) => {
      const crate = line.charAt(stackIndex);
      if (crate !== " ") {
        listArr[index]
          ? listArr[index].push(crate)
          : (listArr[index] = [crate]);
      }
    })
  );

  const instructions = lineByLine.slice(lineByLine.indexOf(stackLine) + 1);
  instructions.forEach((instruction) => {
    if (!instruction) {
      return;
    }
    const parsed = instructionParser({ str: instruction });
    // conductor({
    //   mainArray: listArr,
    //   amountToMove: Number(parsed.move),
    //   fromIndex: Number(parsed.from),
    //   toIndex: Number(parsed.to),
    // });
    conductor9001({
      mainArray: listArr,
      amountToMove: Number(parsed.move),
      fromIndex: Number(parsed.from),
      toIndex: Number(parsed.to),
    });
  });

  const priorityItems = listArr.map((list) => list[0]).join("");

  return priorityItems;
};

console.log(getTopCrates());
