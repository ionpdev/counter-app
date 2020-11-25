// Pure Functions Rules

// 1. Have Input Parameters
// 2. No Stateful Values
// 3. Return Based on Input
// 4. No Side Effects
import h from "hyperscript";
import hh from "hyperscript-helpers";

const { div, button } = hh(h);

const initModel = 0;

function view(model) {
  return div([
    div({ className: "mv2" }, `Count: ${model}`),
    button(
      { className: "pv1 ph2 mr2", onclick: () => console.log("+ clicked") },
      "+"
    ),
    button(
      { className: "pv1 ph2", onclick: () => console.log("- clicked") },
      "-"
    ),
  ]);
}

const rootNode = document.getElementById("app");

rootNode.appendChild(view(initModel));
