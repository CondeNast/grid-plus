// split grid into rows
// split rows into columns
// convert inter-column and cross-column spanning cells into single cell with multiple FR units
// combine co-located columns
// create media queries for each config object
// add flex order and display: none; for each config object
// calculate if any columns can be combined to reach goal order e.g. mobile

export const parseGrid = (templateStrings, ...cells) => {
  if (cells.length === 0) return [];
  if (cells.length === 1) return cells;

  const newlineTag = "_NEWLINE_";

  const templateStrings__noBookends = trimBookends(templateStrings);
  const templateStrings__newlineTags = tagNewlines(
    templateStrings__noBookends,
    newlineTag
  );

  const cellsAndSeparators = mergeCellsAndSeparators(
    cells,
    templateStrings__newlineTags
  );

  const cellsAndSeparators__splitSeparators = splitSeparators(
    cellsAndSeparators
  );

  const cellsAndSeparators__noSpaces = trimSpaces(
    cellsAndSeparators__splitSeparators
  );
  const arrayGrid = splitByNewline(cellsAndSeparators__noSpaces, newlineTag);
  console.log(arrayGrid);
  const gridSchema = buildGridSchema(arrayGrid);

  // const a = [
  //   { type: "row", items: [{ type: "column", items: [1] }] },
  //   { type: "row", items: [{ type: "column", items: [2] }] },
  //   { type: "row", items: [{ type: "column", items: [3] }] },
  // ];

  return gridSchema;
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

const mergeCellsAndSeparators = (cells, separators) => {
  const mergedArray = [];
  cells.forEach((cell, index) => (mergedArray[index * 2] = cell));
  separators.forEach(
    (separator, index) => (mergedArray[index * 2 + 1] = separator)
  );
  return mergedArray;
};

const splitByNewline = (cellsAndSeparators, newlineTag) => {
  const linePartitions = [[]];
  let currentPartition = 0;

  cellsAndSeparators.forEach((cellOrSeparator) => {
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

const buildGridSchema = (arrayGrid) => {
  const gridSchema = [
    {
      type: "root_node",
      children: []
    }
  ];

  // const example = [
  //   {
  //     type: "column",
  //     id: "2345",
  //     children: ["2345", "346"],
  //   }
  // ]

  arrayGrid.forEach((gridLine, lineIndex) => {
    gridLine.forEach((cell, columnIndex) => {
      
      // create new grid schema entry like example above
      // give it a type of 'cell' and an ID of lineIndex-columnIndex

      // if cell above is undefined OR the cell to the left is undefined:
      // create a new column and give it an ID
      // add the current cell ID to the column's children array
      // create a new row and give it an ID
      // add the new column ID to the new row's children array
      // add the new row's ID to the root node's children array

      // if cell above is another cell:
      // find the column that lists that cell above in its children IDs
      // add the curent cell ID to the same column's children

      // if cell above is a row separator: (SHOULD ALWAYS BE THE CASE. MIGHT NOT NEED THE IF.)
      // find the column that lists that cell TWO the left in its children IDs
      // find the row that lists that column in its children IDs
      // create a new column and give it an ID
      // add the current cell ID to the column's children array
      // add the new column ID to the existing row's children array


      /////// OLD CODE
      // const lineAbove = arrayGrid[lineIndex + 1];
      // const cellAbove = lineAbove ? lineAbove[columnIndex] : undefined;
      // if (cellAbove !== "-" && cellAbove !== undefined) {
      //   const targetColumnForNewCell = gridSchema.find(entry => entry.children.includes(cellAbove.id));
      //   targetColumnForNewCell.items.push(cell);
      //   // ADD CELL ROW ID AND COLUMN ID TO MATCH CELL ABOVE
      // } else {
      //   const cellToTheLeft = arrayGrid[lineIndex][columnIndex - 1];
      //   let targetRowForNewColumn;
      //   let cellRowId;

      //   if (cellToTheLeft === "|") {
      //     const cellTwoToTheLeft = arrayGrid[lineIndex][columnIndex - 2];
      //     targetRowForNewColumn = getRowById(cellTwoToTheLeft.rowId);
      //     cell.rowId = cellTwoToTheLeft.rowId;
      //   } else {
      //     targetRowForNewColumn = {
      //       type: "row",
      //       rowId: TODO_RANDOM,
      //       items: [],
      //     };
      //     gridSchema.push(targetRowForNewColumn);
      //   }

      //   targetRowForNewColumn.items.push({
      //     type: "column",
      //     columnId: TODO_RANDOM,
      //     items: [cell],
      //   });

        // ADD CELL ROW ID TO MATCH CELL TO THE LEFT, OR RANDOM IF NEW
        // ADD COLUMN ID TO BE NEW RANDOM ONE
      }
    });

    // const gridLineWithoutSeparators = gridLine.filter((cell) => cell !== "|");

    // gridLineWithoutSeparators.forEach((cell) => {
    //   newGridSchemaEntry.items.push({ type: "column", items: [cell] });
    // });

    // gridSchema.push(newGridSchemaEntry);
  });

  return gridSchema;
};

const splitByColumn = (inputGrid) => {};

const splitByRow = (inputGrid) => {};
