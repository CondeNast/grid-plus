import React from "react";
import styled from "styled-components";
import TestRenderer from "react-test-renderer";
import { buildGridJsx } from "./logic-jsx";

const GridRoot = styled("div")``;
const Row = styled("div")``;
const Column = styled("div")``;

describe("buildGridJsx()", () => {
  describe("given a grid tree with a root node only", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
          children: [],
        },
      ];
      result = buildGridJsx({
        gridTree,
        GridRoot,
        Row,
        Column,
      });
    });

    it("should return an empty fragment", () => {
      expect(result()).toMatchObject(<GridRoot />);
    });
  });

  describe("given a grid tree with root_node > row > column > one content", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
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
          children: () => <div>One</div>,
        },
      ];
      result = buildGridJsx({
        gridTree,
        GridRoot,
        Row,
        Column,
      });
    });

    it("should return the correct JSX", () => {
      const resultRendered = TestRenderer.create(result()).toJSON();
      const expectedRendered = TestRenderer.create(
        <GridRoot>
          <Row>
            <Column>
              <div>One</div>
            </Column>
          </Row>
        </GridRoot>
      ).toJSON();

      expect(resultRendered).toEqual(expectedRendered);
    });
  });

  describe("given a grid without row separators, with one column", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
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
          children: () => <div>One</div>,
        },
        {
          type: "content",
          id: "1-0",
          children: () => <div>Two</div>,
        },
        {
          type: "content",
          id: "2-0",
          children: () => <div>Three</div>,
        },
      ];
      result = buildGridJsx({
        gridTree,
        GridRoot,
        Row,
        Column,
      });
    });

    it("should return the correct JSX", () => {
      const resultRendered = TestRenderer.create(result()).toJSON();
      const expectedRendered = TestRenderer.create(
        <GridRoot>
          <Row>
            <Column>
              <div>One</div>
              <div>Two</div>
              <div>Three</div>
            </Column>
          </Row>
        </GridRoot>
      ).toJSON();

      expect(resultRendered).toEqual(expectedRendered);
    });
  });

  describe("given a grid without row separators, with multiple Column", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
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
          children: () => <div>One</div>,
        },
        {
          type: "content",
          id: "1-0",
          children: () => <div>Four</div>,
        },
        {
          type: "content",
          id: "0-2",
          children: () => <div>Two</div>,
        },
        {
          type: "content",
          id: "1-2",
          children: () => <div>Five</div>,
        },
        {
          type: "content",
          id: "0-4",
          children: () => <div>Three</div>,
        },
        {
          type: "content",
          id: "1-4",
          children: () => <div>Six</div>,
        },
      ];

      result = buildGridJsx({
        gridTree,
        GridRoot,

        Row,
        Column,
      });
    });

    it("should return the correct JSX", () => {
      const resultRendered = TestRenderer.create(result()).toJSON();
      const expectedRendered = TestRenderer.create(
        <GridRoot>
          <Row>
            <Column>
              <div>One</div>
              <div>Four</div>
            </Column>
            <Column>
              <div>Two</div>
              <div>Five</div>
            </Column>
            <Column>
              <div>Three</div>
              <div>Six</div>
            </Column>
          </Row>
        </GridRoot>
      ).toJSON();

      expect(resultRendered).toEqual(expectedRendered);
    });
  });

  describe("given a grid with one row separator", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
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
          children: () => <div>One</div>,
        },
        {
          type: "content",
          id: "1-0",
          children: () => <div>Three</div>,
        },
        {
          type: "content",
          id: "0-2",
          children: () => <div>Two</div>,
        },
        {
          type: "content",
          id: "1-2",
          children: () => <div>Four</div>,
        },
        {
          type: "content",
          id: "3-0",
          children: () => <div>Five</div>,
        },
        {
          type: "content",
          id: "4-0",
          children: () => <div>Seven</div>,
        },
        {
          type: "content",
          id: "3-2",
          children: () => <div>Six</div>,
        },
        {
          type: "content",
          id: "4-2",
          children: () => <div>Eight</div>,
        },
      ];
      result = buildGridJsx({
        gridTree,
        GridRoot,
        Row,
        Column,
      });
    });

    it("should return the correct JSX", () => {
      const resultRendered = TestRenderer.create(result()).toJSON();
      const expectedRendered = TestRenderer.create(
        <GridRoot>
          <Row>
            <Column>
              <div>One</div>
              <div>Three</div>
            </Column>
            <Column>
              <div>Two</div>
              <div>Four</div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div>Five</div>
              <div>Seven</div>
            </Column>
            <Column>
              <div>Six</div>
              <div>Eight</div>
            </Column>
          </Row>
        </GridRoot>
      ).toJSON();

      expect(resultRendered).toEqual(expectedRendered);
    });
  });

  describe("given a grid with multiple row separators", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
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
          children: () => <div>One</div>,
        },
        {
          type: "content",
          id: "0-2",
          children: () => <div>Two</div>,
        },
        {
          type: "content",
          id: "2-0",
          children: () => <div>Three</div>,
        },
        {
          type: "content",
          id: "2-2",
          children: () => <div>Four</div>,
        },
        {
          type: "content",
          id: "4-0",
          children: () => <div>Five</div>,
        },
        {
          type: "content",
          id: "4-2",
          children: () => <div>Six</div>,
        },
      ];
      result = buildGridJsx({
        gridTree,
        GridRoot,
        Row,
        Column,
      });
    });

    it("should return the correct JSX", () => {
      const resultRendered = TestRenderer.create(result()).toJSON();
      const expectedRendered = TestRenderer.create(
        <GridRoot>
          <Row>
            <Column>
              <div>One</div>
            </Column>
            <Column>
              <div>Two</div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div>Three</div>
            </Column>
            <Column>
              <div>Four</div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div>Five</div>
            </Column>
            <Column>
              <div>Six</div>
            </Column>
          </Row>
        </GridRoot>
      ).toJSON();

      expect(resultRendered).toEqual(expectedRendered);
    });
  });

  describe("given a grid with different column structures in each row", () => {
    let result;

    beforeEach(() => {
      const gridTree = [
        {
          type: "root_node",
          id: "root_node",
          children: ["row-0-0", "row-3-0", "row-5-0"],
        },
        {
          type: "row",
          id: "row-0-0",
          children: ["col-0-0", "col-0-2"],
        },
        {
          type: "row",
          id: "row-3-0",
          children: ["col-3-0", "col-3-2", "col-3-4"],
        },
        {
          type: "row",
          id: "row-5-0",
          children: ["col-5-0"],
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
          children: ["3-0"],
        },
        {
          type: "column",
          id: "col-3-2",
          children: ["3-2"],
        },
        {
          type: "column",
          id: "col-3-4",
          children: ["3-4"],
        },
        {
          type: "column",
          id: "col-5-0",
          children: ["5-0"],
        },
        {
          type: "content",
          id: "0-0",
          children: () => <div>One</div>,
        },
        {
          type: "content",
          id: "0-2",
          children: () => <div>Two</div>,
        },
        {
          type: "content",
          id: "1-0",
          children: () => <div>Three</div>,
        },
        {
          type: "content",
          id: "1-2",
          children: () => <div>Four</div>,
        },
        {
          type: "content",
          id: "3-0",
          children: () => <div>Five</div>,
        },
        {
          type: "content",
          id: "3-2",
          children: () => <div>Six</div>,
        },
        {
          type: "content",
          id: "3-4",
          children: () => <div>Seven</div>,
        },
        {
          type: "content",
          id: "5-0",
          children: () => <div>Eight</div>,
        },
      ];
      result = buildGridJsx({
        gridTree,
        GridRoot,
        Row,
        Column,
      });
    });

    it("should return the correct JSX", () => {
      const resultRendered = TestRenderer.create(result()).toJSON();
      const expectedRendered = TestRenderer.create(
        <GridRoot>
          <Row>
            <Column>
              <div>One</div>
              <div>Three</div>
            </Column>
            <Column>
              <div>Two</div>
              <div>Four</div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div>Five</div>
            </Column>
            <Column>
              <div>Six</div>
            </Column>
            <Column>
              <div>Seven</div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div>Eight</div>
            </Column>
          </Row>
        </GridRoot>
      ).toJSON();

      expect(resultRendered).toEqual(expectedRendered);
    });
  });
});
