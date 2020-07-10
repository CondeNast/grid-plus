export const trimBookends = (strings) => {
  const trimmedStrings = [...strings];
  trimmedStrings.shift();
  trimmedStrings.pop();
  return trimmedStrings;
};

export const trimSpaces = (entries) =>
  entries
    .map((entry) => (typeof entry === "string" ? entry.trim() : entry))
    .filter((entry) => entry !== "");

export const splitSeparators = (gridEntries) => {
  const output = [];

  gridEntries.forEach((entry) => {
    if (typeof entry === "string") {
      const split = entry.split(/(-)+/);
      output.push(...split);
    } else {
      output.push(entry);
    }
  });

  return output;
};

export const mergegridItemsAndSeparators = (gridItems, separators) => {
  const mergedArray = [];
  gridItems.forEach((cell, index) => (mergedArray[index * 2] = cell));
  separators.forEach(
    (separator, index) => (mergedArray[index * 2 + 1] = separator)
  );
  return mergedArray;
};

export const tagNewlines = (strings, newlineTag) =>
  strings.map((string) => string.replace(/(\n)+/g, newlineTag));

export const splitByNewline = (gridItemsAndSeparators, newlineTag) => {
  const linePartitions = [[]];
  let currentPartition = 0;

  gridItemsAndSeparators.forEach((cellOrSeparator) => {
    if (cellOrSeparator === newlineTag) {
      linePartitions.push([]);
      currentPartition++;
      return;
    }

    linePartitions[currentPartition].push(cellOrSeparator);
  });

  return linePartitions;
};
