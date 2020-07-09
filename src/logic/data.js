const teasers = () => {};
const externalAds = () => {};
const sponsoredTeasers = () => {};
const createGrid = () => {};

const sevenTeasers = [
  {
    maxViewportWidth: 500,
    grid: createGrid`
      ${teasers(2)}
      ${teasers(3)}
      ${teasers(4)}
      ${teasers(5)}
      ${externalAds(1)}
      ${sponsoredTeasers(1)}
      ${teasers(6)}
    `,
  },
  {
    maxViewportWidth: 800,
    grid: createGrid`
      ${teasers(2)}          | ${teasers(3)}
      ${teasers(4)}          | ${teasers(5)}
      --------------------------------------
      ${externalAds(1)}      | ${externalAds(1)}
      --------------------------------------
      ${sponsoredTeasers(1)} | ${teasers(6)}
    `,
  },
  {
    maxViewportWidth: null,
    grid: createGrid`
      ${teasers(2)}          | ${teasers(3)}
      ${teasers(4)}          | ${externalAds(1)}
      ${teasers(5)}          | ${teasers(6)}
      ${sponsoredTeasers(1)} | .
    `,
  },
];

const sixTeasers = [
  {
    maxViewportWidth: 500,
    grid: createGrid`
      ${teasers(2)}
      ${teasers(3)}
      ${teasers(4)}
      ${teasers(5)}
      ${externalAds(1)}
      ${sponsoredTeasers(1)}
    `,
  },
  {
    maxViewportWidth: 800,
    grid: createGrid`
      ${teasers(2)} | ${teasers(3)}
      ${teasers(4)} | ${teasers(5)}
      ---
      ${externalAds(1)} | ${externalAds(1)}
      ---
      ${sponsoredTeasers(1)} | .
    `,
  },
  {
    maxViewportWidth: null,
    grid: createGrid`
      ${teasers(2)} | ${teasers(3)}
      ${teasers(4)} | ${externalAds(1)}
      ${teasers(5)} | ${sponsoredTeasers(1)}
    `,
  },
];

const fiveTeasers = [
  {
    maxViewportWidth: 500,
    grid: createGrid`
      ${teasers(2)}
      ${teasers(3)}
      ${teasers(4)}
      ${teasers(5)}
      ${externalAds(1)}
    `,
  },
  {
    maxViewportWidth: 800,
    grid: createGrid`
      ${teasers(2)} | ${teasers(3)}
      ${teasers(4)} | ${teasers(5)}
      ---
      ${externalAds(1)} | ${externalAds(1)}
    `,
  },
  {
    maxViewportWidth: null,
    grid: createGrid`
      ${teasers(2)} | ${teasers(3)}
      ${teasers(4)} | ${externalAds(1)}
      ${teasers(5)} | .
    `,
  },
];
