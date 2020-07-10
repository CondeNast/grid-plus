import React from "react";

export const buildGridJsx = ({ gridTree, GridRoot, Row, Column }) => {
  const mappedGridTree = {};

  gridTree.forEach((treeNode) => {
    mappedGridTree[treeNode.id] = treeNode;
  });

  const getJsxChildren = (parentNode) => {
    if (parentNode.type === "root_node") {
      console.log("ROOT", parentNode);
      return () => (
        <GridRoot>
          {parentNode.children.map((childId) =>
            getJsxChildren(mappedGridTree[childId])()
          )}
        </GridRoot>
      );
    }

    if (parentNode.type === "row") {
      console.log("ROW", parentNode);
      return () => (
        <Row key={parentNode.id}>
          {parentNode.children.map((childId) =>
            getJsxChildren(mappedGridTree[childId])()
          )}
        </Row>
      );
    }

    if (parentNode.type === "column") {
      console.log("COL", parentNode);
      return () => (
        <Column key={parentNode.id}>
          {parentNode.children.map((childId) =>
            getJsxChildren(mappedGridTree[childId])()
          )}
        </Column>
      );
    }

    console.log("CONTENT", parentNode);
    return () => ({ ...parentNode.children(), key: parentNode.id });
  };

  const rootNode = mappedGridTree.root_node;

  return getJsxChildren(rootNode);
};
