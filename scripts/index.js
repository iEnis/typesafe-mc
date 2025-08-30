#!/usr/bin/env node
import Wrapper from "./Wrapper.js";
import tsmc from "./cmd.js";
console.clear();
Wrapper.intro("Typesafe-MC");
const modules = Wrapper.moduleCheck();
const install = await Wrapper.confirm({
  message: "Would you like to install the patched '@minecraft/server-ui' module?",
  initialValue: true
});
if (!install) Wrapper.exit("Canceled installation!");
await Wrapper.spinner("Installing patched '@minecraft/server-ui' module", async () => {
  tsmc["@minecraft/server-ui"]();
  return true;
});
