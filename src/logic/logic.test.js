import { parseGrid } from "./logic";

describe("parseGrid()", () => {
  // describe("given a grid with no entries", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid``;
  //   });

  //   it("should return the parsed grid an empty array", () => {
  //     const expected = [];
  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe("given a grid with one entry", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1}
  //     `;
  //   });

  //   it("should return the parsed grid as the one entry without any wrapper", () => {
  //     const expected = [1];
  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe("given a grid without row separators, with one column", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1}
  //       ${2}
  //       ${3}
  //     `;
  //   });

  //   it("should return the parsed grid as one column containing the entries", () => {
  //     const expected = [
  //       {
  //         type: "column",
  //         items: [1, 2, 3],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });

  describe("given a grid without row separators, with multiple columns", () => {
    let result;

    beforeEach(() => {
      result = parseGrid`
        ${1} | ${2} | ${3}
        ${4} | ${5} | ${6}
      `;
    });

    it("should return the parsed grid as a row with one column per entry", () => {
      const expected = [
        {
          type: "row",
          items: [
            {
              type: "column",
              items: [1],
            },
            {
              type: "column",
              items: [2],
            },
            {
              type: "column",
              items: [3],
            },
          ],
        },
      ];
      expect(result).toEqual(expected);
    });
  });

  // describe("given a grid without row separators, with columns", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1} | ${2}
  //       ${3} | ${4}
  //       ${5} | ${6}
  //     `;
  //   });

  //   it("should return the parsed grid as a row with two columns containing the entries", () => {
  //     const expected = [
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [1, 3, 5],
  //           },
  //           {
  //             type: "column",
  //             items: [2, 4, 6],
  //           },
  //         ],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe("given a grid with one row separator", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1} | ${2}
  //       ${3} | ${4}
  //       -----------
  //       ${5} | ${6}
  //       ${7} | ${8}
  //     `;
  //   });

  //   it("should return the parsed grid as two rows each with two columns", () => {
  //     const expected = [
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [1, 3],
  //           },
  //           {
  //             type: "column",
  //             items: [2, 4],
  //           },
  //         ],
  //       },
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [5, 7],
  //           },
  //           {
  //             type: "column",
  //             items: [6, 8],
  //           },
  //         ],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe("given a grid with multiple row separators", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       ${1} | ${2}
  //       ${3} | ${4}
  //       -----------
  //       ${5} | ${6}
  //       ${7} | ${8}
  //       -----------
  //       ${9} | ${10}
  //     `;
  //   });

  //   it("should return the parsed grid with the additional rows", () => {
  //     const expected = [
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [1, 3],
  //           },
  //           {
  //             type: "column",
  //             items: [2, 4],
  //           },
  //         ],
  //       },
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [5, 7],
  //           },
  //           {
  //             type: "column",
  //             items: [6, 8],
  //           },
  //         ],
  //       },
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [9],
  //           },
  //           {
  //             type: "column",
  //             items: [10],
  //           },
  //         ],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe("given a grid with a dot as cell content", () => {
  //   let result;

  //   beforeEach(() => {
  //     result = parseGrid`
  //       .    | ${2}
  //       ${3} | .
  //       ${5} | ${6}
  //     `;
  //   });

  //   it("should return a dot for that cell", () => {
  //     const expected = [
  //       {
  //         type: "row",
  //         items: [
  //           {
  //             type: "column",
  //             items: [".", 3, 5],
  //           },
  //           {
  //             type: "column",
  //             items: [2, ".", 6],
  //           },
  //         ],
  //       },
  //     ];
  //     expect(result).toEqual(expected);
  //   });
  // });

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
