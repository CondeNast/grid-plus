// convert inter-column and cross-column spanning gridItems into single cell with multiple FR units
// combine co-located columns
// create media queries for each config object
// add flex order and display: none; for each config object
// calculate if any columns can be combined to reach goal order e.g. mobile

export const parseGrid = (templateStrings, ...gridItems) => {
  const newlineTag = "_NEWLINE_";

  const templateStrings__noBookends = trimBookends(templateStrings);
  const templateStrings__newlineTags = tagNewlines(
    templateStrings__noBookends,
    newlineTag
  );

  const gridItemsAndSeparators = mergegridItemsAndSeparators(
    gridItems,
    templateStrings__newlineTags
  );

  const gridItemsAndSeparators__splitSeparators = splitSeparators(
    gridItemsAndSeparators
  );

  const gridItemsAndSeparators__noSpaces = trimSpaces(
    gridItemsAndSeparators__splitSeparators
  );

  const gridStructureArray = splitByNewline(
    gridItemsAndSeparators__noSpaces,
    newlineTag
  );
  const gridTree = buildgridTree(gridStructureArray, gridItems);

  return gridTree;
};

const trimBookends = (strings) => {
  const trimmedStrings = [...strings];
  trimmedStrings.shift();
  trimmedStrings.pop();
  return trimmedStrings;
};

const trimSpaces = (entries) =>
  entries
    .map((entry) => (typeof entry === "string" ? entry.trim() : entry))
    .filter((entry) => entry !== "");

const splitSeparators = (gridEntries) => {
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

const mergegridItemsAndSeparators = (gridItems, separators) => {
  const mergedArray = [];
  gridItems.forEach((cell, index) => (mergedArray[index * 2] = cell));
  separators.forEach(
    (separator, index) => (mergedArray[index * 2 + 1] = separator)
  );
  return mergedArray;
};

const splitByNewline = (gridItemsAndSeparators, newlineTag) => {
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

const tagNewlines = (strings, newlineTag) =>
  strings.map((string) => string.replace(/(\n)+/g, newlineTag));

const buildgridTree = (gridStructureArray, gridItems) => {
  // set up the grid tree with a root node
  const gridTree = [];

  const rootNode = {
    type: "root_node",
    children: [],
  };

  gridTree.push(rootNode);

  gridStructureArray.forEach((gridLine, lineIndex) => {
    gridLine.forEach((cell, columnIndex) => {
      // if separator, skip
      if (!gridItems.includes(cell)) {
        return;
      }

      // every new grid item will require some common actions
      const cellCoordinates = `${lineIndex}-${columnIndex}`;

      const newContent = {
        type: "content",
        id: cellCoordinates,
        children: cell,
      };

      gridTree.push(newContent);

      const lineAbove = gridStructureArray[lineIndex - 1];
      const cellAbove = lineAbove ? lineAbove[columnIndex] : undefined;
      const cellToTheLeft = gridLine[columnIndex - 1];

      // if new row and new column, create those entries and link together
      if (
        (cellToTheLeft === undefined && cellAbove === undefined) ||
        (cellToTheLeft === undefined && cellAbove === "-")
      ) {
        const newColumn = {
          type: "column",
          id: `col-${cellCoordinates}`,
          children: [newContent.id],
        };

        const newRow = {
          type: "row",
          id: `row-${cellCoordinates}`,
          children: [newColumn.id],
        };

        rootNode.children.push(newRow.id);
        gridTree.push(newRow, newColumn);
        return;
      }

      // if cell above is a grid item (not a separator), add the new grid item to that column
      if (gridItems.includes(cellAbove)) {
        const cellAboveCoordinates = `${lineIndex - 1}-${columnIndex}`;
        const targetColumn = gridTree.find(
          (entry) =>
            entry.type === "column" &&
            entry.children.includes(cellAboveCoordinates)
        );
        targetColumn.children.push(newContent.id);
        return;
      }

      // else create a new column on the current row
      const cellTwoToTheLeftCoordinates = `${lineIndex}-${columnIndex - 2}`;
      const columnToTheLeft = gridTree.find(
        (entry) =>
          entry.type === "column" &&
          entry.children.includes(cellTwoToTheLeftCoordinates)
      );
      const targetRow = gridTree.find(
        (entry) =>
          entry.type === "row" && entry.children.includes(columnToTheLeft.id)
      );

      const newColumn = {
        type: "column",
        id: `col-${cellCoordinates}`,
        children: [newContent.id],
      };

      targetRow.children.push(newColumn.id);
      gridTree.push(newColumn);
    });
  });

  return gridTree;
};
