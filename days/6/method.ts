import fs from "fs";

// pt 1
// const NUMBER_OF_UNIQUE_CHARACTERS_NEEDED = 4;

// pt 2
const NUMBER_OF_UNIQUE_CHARACTERS_NEEDED = 14;

const getRawDataArray = () => {
  return fs.readFileSync(__dirname + "/input.txt", "utf-8").split("");
};

const getStartOfPacketMarker = () => {
  const packetArray = getRawDataArray();

  let indexOfMarker = 0;
  for (let i = 0; i < packetArray.length; i++) {
    if (i < NUMBER_OF_UNIQUE_CHARACTERS_NEEDED) {
      continue;
    }
    const section = packetArray.slice(
      i - NUMBER_OF_UNIQUE_CHARACTERS_NEEDED,
      i
    );
    const duplicateExists = section.filter(
      (item, index) => section.indexOf(item) !== index
    );

    if (duplicateExists.length === 0) {
      indexOfMarker = i;
      break;
    }
  }

  return indexOfMarker;
};

console.log(getStartOfPacketMarker());
