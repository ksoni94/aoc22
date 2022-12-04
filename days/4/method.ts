import fs from "fs";

const getRange = ({ start, end }: { start: string; end: string }) => {
  const startNumber = Number(start);
  const endNumber = Number(end);
  const range: number[] = [];
  for (let i = startNumber; i <= endNumber; i++) {
    range.push(i);
  }

  return range;
};

const getNumberOfPairsWithFullOverlap = () => {
  const rawData = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const pairs = rawData.split(/\n/);

  let numberOfPairsWithFullOverlap = 0;
  let numberOfPairsWithPartialOverlap = 0;

  pairs.map((pair) => {
    const individualRanges = pair.split(",");
    const pairOneStart = individualRanges[0].split("-")[0];
    const pairOneEnd = individualRanges[0].split("-")[1];

    const pairTwoStart = individualRanges[1].split("-")[0];
    const pairTwoEnd = individualRanges[1].split("-")[1];

    const pairOneRange = getRange({ start: pairOneStart, end: pairOneEnd });
    const pairTwoRange = getRange({ start: pairTwoStart, end: pairTwoEnd });

    const pairOneRangeIsInPairTwo = pairOneRange.every((num) =>
      pairTwoRange.includes(num)
    );
    const pairTwoRangeIsInPairOne = pairTwoRange.every((num) =>
      pairOneRange.includes(num)
    );

    const pairOnePartialRangeIsInPairTwo = pairOneRange.some((num) =>
      pairTwoRange.includes(num)
    );
    const pairTwoPartialRangeIsInPairOne = pairTwoRange.some((num) =>
      pairOneRange.includes(num)
    );

    if (pairOneRangeIsInPairTwo || pairTwoRangeIsInPairOne) {
      numberOfPairsWithFullOverlap++;
    }
    if (pairOnePartialRangeIsInPairTwo || pairTwoPartialRangeIsInPairOne) {
      numberOfPairsWithPartialOverlap++;
    }
  });
  return { numberOfPairsWithFullOverlap, numberOfPairsWithPartialOverlap };
};

console.log(getNumberOfPairsWithFullOverlap());
