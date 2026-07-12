import {
  parse
} from "./chunk-BB5P3MDJ.js";
import "./chunk-3FP4H7UT.js";
import "./chunk-SULZWQOW.js";
import "./chunk-K646Q5B3.js";
import "./chunk-VOA7GPME.js";
import "./chunk-MQ3ABAYJ.js";
import "./chunk-2VJ7B5EH.js";
import "./chunk-O4PYG7LI.js";
import "./chunk-D665MDQE.js";
import "./chunk-KUCTEXYK.js";
import "./chunk-EPJ3TXSK.js";
import "./chunk-5CM5KW4T.js";
import {
  selectSvgElement
} from "./chunk-XUZMWDH2.js";
import {
  configureSvgSize
} from "./chunk-XBX54R3W.js";
import {
  __name,
  log
} from "./chunk-IPZHUWHO.js";
import "./chunk-Z7Z2NFES.js";
import "./chunk-23EXNVIM.js";
import "./chunk-FOQIPI7F.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-42DDH7IO.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.14.0" + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-42DDH7IO-UJBQKDNP.js.map
