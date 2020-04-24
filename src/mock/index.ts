// @ts-nocheck
import fcMock from "./fc-mock";

const req = context => context.keys().map(context);
const options = req(require.context("./api/", true, /\.ts$/))
  .filter(e => e.default)
  .map(e => e.default);

options.forEach(option => {
  fcMock.load(option);
});
