#!/usr/bin/env node

const { join } = require("path");
const telescope = require("@osmonauts/telescope").default;

telescope({
  protoDirs: ["StatesetNetwork/proto", "StatesetNetwork/third_party/proto"],
  outPath: join(__dirname, "/../src/dan"),
  options: {
    includeAminos: true,
    includeLCDClient: false,
  },
});
