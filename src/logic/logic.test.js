import { parseGrid } from "./logic";

const sortByGridId = (gridStructureArray) =>
  gridStructureArray.sort((a, b) => {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  });

describe("parseGrid()", () => {
  describe("given a grid with no entries", () => {
    let result;

    beforeEach(() => {
      result = parseGrid``;
    });

    it("should return an array with only a root node", () => {
      const expected = [
        {
          type: "root_node",
          children: [],
        },
      ];
      expect(result).toEqual(expected);
    });
  });

  describe("given a grid with one entry", () => {
    let result;

    beforeEach(() => {
      result = parseGrid`
        ${1}
      `;
    });

    it("should return one root > row > column > content", () => {
      const expected = [
        {
          type: "root_node",
          children: ["row-0-0"],
        },
        {
          type: "row",
          id: "row-0-0",
          children: ["col-0-0"],
        },
        {
          type: "column",
          id: "col-0-0",
          children: ["0-0"],
        },
        {
          type: "content",
          id: "0-0",
          children: 1,
        },
      ];

      expect(sortByGridId(result)).toEqual(sortByGridId(expected));
    });
  });

  describe("given a grid without row separators, with one column", () => {
    let result;

    beforeEach(() => {
      result = parseGrid`
        ${1}
        ${2}
        ${3}
      `;
    });

    it("should return one root > row > column > cells > content", () => {
      const expected = [
        {
          type: "root_node",
          children: ["row-0-0"],
        },
        {
          type: "row",
          id: "row-0-0",
          children: ["col-0-0"],
        },
        {
          type: "column",
          id: "col-0-0",
          children: ["0-0", "1-0", "2-0"],
        },
        {
          type: "content",
          id: "0-0",
          children: 1,
        },
        {
          type: "content",
          id: "1-0",
          children: 2,
        },
        {
          type: "content",
          id: "2-0",
          children: 3,
        },
      ];

      expect(sortByGridId(result)).toEqual(sortByGridId(expected));
    });
  });

  describe("given a grid without row separators, with multiple columns", () => {
    let result;

    beforeEach(() => {
      result = parseGrid`
        ${1} | ${2} | ${3}
        ${4} | ${5} | ${6}
      `;
    });

    it("should return a row with multiple columns, each with content", () => {
      const expected = [
        {
          type: "root_node",
          children: ["row-0-0"],
        },
        {
          type: "row",
          id: "row-0-0",
          children: ["col-0-0", "col-0-2", "col-0-4"],
        },
        {
          type: "column",
          id: "col-0-0",
          children: ["0-0", "1-0"],
        },
        {
          type: "column",
          id: "col-0-2",
          children: ["0-2", "1-2"],
        },
        {
          type: "column",
          id: "col-0-4",
          children: ["0-4", "1-4"],
        },
        {
          type: "content",
          id: "0-0",
          children: 1,
        },
        {
          type: "content",
          id: "1-0",
          children: 4,
        },
        {
          type: "content",
          id: "0-2",
          children: 2,
        },
        {
          type: "content",
          id: "1-2",
          children: 5,
        },
        {
          type: "content",
          id: "0-4",
          children: 3,
        },
        {
          type: "content",
          id: "1-4",
          children: 6,
        },
      ];

      expect(sortByGridId(result)).toEqual(sortByGridId(expected));
    });
  });

  describe("given a grid with one row separator", () => {
    let result;

    beforeEach(() => {
      result = parseGrid`
        ${1} | ${2}
        ${3} | ${4}
        -----------
        ${5} | ${6}
        ${7} | ${8}
      `;
    });

    it("should return the parsed grid as two rows each with two columns", () => {
      const expected = [
        {
          type: "root_node",
          children: ["row-0-0", "row-3-0"],
        },
        {
          type: "row",
          id: "row-0-0",
          children: ["col-0-0", "col-0-2"],
        },
        {
          type: "row",
          id: "row-3-0",
          children: ["col-3-0", "col-3-2"],
        },
        {
          type: "column",
          id: "col-0-0",
          children: ["0-0", "1-0"],
        },
        {
          type: "column",
          id: "col-0-2",
          children: ["0-2", "1-2"],
        },
        {
          type: "column",
          id: "col-3-0",
          children: ["3-0", "4-0"],
        },
        {
          type: "column",
          id: "col-3-2",
          children: ["3-2", "4-2"],
        },
        {
          type: "content",
          id: "0-0",
          children: 1,
        },
        {
          type: "content",
          id: "1-0",
          children: 3,
        },
        {
          type: "content",
          id: "0-2",
          children: 2,
        },
        {
          type: "content",
          id: "1-2",
          children: 4,
        },
        {
          type: "content",
          id: "3-0",
          children: 5,
        },
        {
          type: "content",
          id: "4-0",
          children: 7,
        },
        {
          type: "content",
          id: "3-2",
          children: 6,
        },
        {
          type: "content",
          id: "4-2",
          children: 8,
        },
      ];
      expect(sortByGridId(result)).toEqual(sortByGridId(expected));
    });
  });

  describe("given a grid with multiple row separators", () => {
    let result;

    beforeEach(() => {
      result = parseGrid`
        ${1} | ${2}
        -----------
        ${3} | ${4}
        -----------
        ${5} | ${6}
      `;
    });

    it("should return the parsed grid with the additional rows", () => {
      const expected = [
        {
          type: "root_node",
          children: ["row-0-0", "row-2-0", "row-4-0"],
        },
        {
          type: "row",
          id: "row-0-0",
          children: ["col-0-0", "col-0-2"],
        },
        {
          type: "row",
          id: "row-2-0",
          children: ["col-2-0", "col-2-2"],
        },
        {
          type: "row",
          id: "row-4-0",
          children: ["col-4-0", "col-4-2"],
        },
        {
          type: "column",
          id: "col-0-0",
          children: ["0-0"],
        },
        {
          type: "column",
          id: "col-0-2",
          children: ["0-2"],
        },
        {
          type: "column",
          id: "col-2-0",
          children: ["2-0"],
        },
        {
          type: "column",
          id: "col-2-2",
          children: ["2-2"],
        },
        {
          type: "column",
          id: "col-4-0",
          children: ["4-0"],
        },
        {
          type: "column",
          id: "col-4-2",
          children: ["4-2"],
        },
        {
          type: "content",
          id: "0-0",
          children: 1,
        },
        {
          type: "content",
          id: "0-2",
          children: 2,
        },
        {
          type: "content",
          id: "2-0",
          children: 3,
        },
        {
          type: "content",
          id: "2-2",
          children: 4,
        },
        {
          type: "content",
          id: "4-0",
          children: 5,
        },
        {
          type: "content",
          id: "4-2",
          children: 6,
        },
      ];
      expect(sortByGridId(result)).toEqual(sortByGridId(expected));
    });
  });

  // describe("given a grid without any content between row separators", () => {
  //   let result;

  //   beforeEach(() => {
  //     try {
  //       result = parseGrid`
  //       ${1} | ${2}
  //       -----------

  //       -----------
  //       ${3} | ${4}
  //     `;
  //     } catch (err) {
  //       result = err;
  //     }
  //   });

  //   it("should throw an error", () => {
  //     expect(result instanceof Error).toBe(true);
  //     expect(result.message).toBe("Empty row found");
  //   });
  // });

  // describe("given a grid without any content between column separators", () => {
  //   let result;

  //   beforeEach(() => {
  //     try {
  //       result = parseGrid`
  //       ${1} | | ${2}
  //       ${3} | | ${4}
  //     `;
  //     } catch (err) {
  //       result = err;
  //     }
  //   });

  //   it("should throw an error", () => {
  //     expect(result instanceof Error).toBe(true);
  //     expect(result.message).toBe("Empty column found");
  //   });
  // });

  // describe("given any invalid grid content (not a separator, dot, or template content)", () => {
  //   let result;

  //   beforeEach(() => {
  //     try {
  //       result = parseGrid`
  //       ${1} | Invalid
  //       ${3} | ${4}
  //     `;
  //     } catch (err) {
  //       result = err;
  //     }
  //   });

  //   it("should throw an error", () => {
  //     expect(result instanceof Error).toBe(true);
  //     expect(result.message).toBe("Invalid grid content found");
  //   });
  // });

  //////// FUTURE FUNCTIONALITY

  // describe("given a complex grid with a column separator that overrides the row separator", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1}  | ${2}  | ${3}  | ${4}
  //       ${5}  | ${6}  | ${7}  | ${8}
  //       --------------|--------------
  //       ${9}  | ${10} | ${11} | ${12}
  //       ${13} | ${14} | ${15} | ${16}
  //     `;
  //   });

  //   it("should return the parsed grid as two columns, each with two rows, each with two columns", () => {
  //     const expected = [
  //       {
  //         type: "column",
  //         items: [
  //           {
  //             type: "row",
  //             items: [
  //               {
  //                 type: "column",
  //                 items: [1, 5],
  //               },
  //               {
  //                 type: "column",
  //                 items: [2, 6],
  //               },
  //             ],
  //           },
  //           {
  //             type: "row",
  //             items: [
  //               {
  //                 type: "column",
  //                 items: [9, 13],
  //               },
  //               {
  //                 type: "column",
  //                 items: [10, 14],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         type: "column",
  //         items: [
  //           {
  //             type: "row",
  //             items: [
  //               {
  //                 type: "column",
  //                 items: [3, 7],
  //               },
  //               {
  //                 type: "column",
  //                 items: [4, 8],
  //               },
  //             ],
  //           },
  //           {
  //             type: "row",
  //             items: [
  //               {
  //                 type: "column",
  //                 items: [11, 15],
  //               },
  //               {
  //                 type: "column",
  //                 items: [12, 16],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe("given a complex grid with a row separator that overrides the column separator", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1}  | ${2}  | ${3}  | ${4}
  //       ${5}  | ${6}  | ${7}  | ${8}
  //       -----------------------------
  //       ${9}  | ${10} | ${11} | ${12}
  //       ${13} | ${14} | ${15} | ${16}
  //     `;
  //   });

  //   it("should return the parsed grid as two rows, each with four columns", () => {
  //     const expected = [
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [1, 5],
  //           },
  //           {
  //             type: "column",
  //             items: [2, 6],
  //           },
  //           {
  //             type: "column",
  //             items: [3, 7],
  //           },
  //           {
  //             type: "column",
  //             items: [4, 8],
  //           },
  //         ],
  //       },
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [9, 13],
  //           },
  //           {
  //             type: "column",
  //             items: [10, 14],
  //           },
  //           {
  //             type: "column",
  //             items: [11, 15],
  //           },
  //           {
  //             type: "column",
  //             items: [12, 16],
  //           },
  //         ],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });
});
