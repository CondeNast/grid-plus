import React from "react";
import styled from "styled-components";
import "./App.css";
import { parseGrid } from "./logic/logic";
import { buildGridJsx } from "./logic/logic-jsx";

const GridRoot = styled("div")`
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const GridRootSmall = styled("div")`
  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const Row = styled("div")`
  display: flex;
  flex-flow: row wrap;
`;
const Column = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: sans-serif;
  font-size: 2rem;
  font-weight: bold;
  background-image: linear-gradient(
    130deg,
    #6c52d9 0%,
    #1eaafc 85%,
    #3edfd7 100%
  );
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  color: #ffffff;
  border-radius: 4px;
  border: 6px solid #171717;
  box-sizing: border-box;
  color: white;
  margin: 0.5rem;
`;

const MainArticle = styled(Content)`
  top: 0;
  position: sticky;
  height: 100vh;
`;

const ContentBig = styled(Content)`
  height: 450px;
`;
const ContentMedium = styled(Content)`
  height: 350px;
`;
const ContentSmall = styled(Content)`
  height: 300px;
`;

const AdvertBox = styled(Content)`
  height: 500px;
  background-image: linear-gradient(
    130deg,
    #ffbc00 0%,
    #06f1e6 85%,
    #00f3ff 100%
  );
`;

const Content1 = () => <ContentBig>1</ContentBig>;
const Content2 = () => <ContentMedium>2</ContentMedium>;
const Content3 = () => <ContentSmall>3</ContentSmall>;
const Content4 = () => <ContentBig>4</ContentBig>;
const Advert = () => <AdvertBox>ADVERT</AdvertBox>;
const Advert2 = () => <AdvertBox>ADVERT 2</AdvertBox>;
const Content5 = () => <ContentBig>5</ContentBig>;
const Content6 = () => <ContentMedium>6</ContentMedium>;

// const gridTreeALTERNATE = parseGrid`
//   ${Content1} | ${Content2}
//   ${Content3} | ${Advert}
//   ${Content4} | ${Content5}
//   ${Advert2}  | ${Content6}
// `;

// const gridTreeNESTED = parseGrid`
//   ${Content1} | ${Content2} | ${Content3}
//               | ${Content4} | ${Content5}
//               | -------------------------
//               |  ${Advert}
//               | -------------------------
//               | ${Content6} | ${Content7}
// `;

// GRID FOR WIDE VIEWPORTS
const gridTree = parseGrid`
  ${Content1}
  ------------------------
  ${Content3} | ${Advert2}
  ${Advert}   | ${Content4}
  ${Content5} | ${Content6}
`;

// GRID FOR NARROW VIEWPORTS
const gridTreeSmall = parseGrid`
  ${Content1} | ${Content2}
  ${Content3} | ${Content4}
  -------------------------
  ${Advert}
  -------------------------
  ${Content5} | ${Content6}
`;

const Grid = buildGridJsx({
  gridTree,
  GridRoot,
  Row,
  Column,
});

const GridSmall = buildGridJsx({
  gridTree: gridTreeSmall,
  GridRoot: GridRootSmall,
  Row,
  Column,
});

function App() {
  return (
    <div className="App">
      <div class="surrounding">Other content, scroll down</div>

      <div class="container">
        <MainArticle>Article 1</MainArticle>
        <Grid />
        <GridSmall />
      </div>

      <div class="surrounding">More content</div>
    </div>
  );
}

export default App;
