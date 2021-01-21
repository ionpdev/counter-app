// Pure Functions Rules

// 1. Have Input Parameters
// 2. No Stateful Values
// 3. Return Based on Input
// 4. No Side Effects
// import h from "hyperscript";

// App Model:
// Data ?
// Number (count)
// Functions ?
// View
// Update
//

import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

const { div, button } = hh(h);

// Default value, initial model
const initModel = 0;

// App View Html
function view(dispatch, model) {
  return div([
    div({ className: "mv2" }, `Count: ${model}`),
    button(
      { className: "pv1 ph2 mr2", onclick: () => dispatch(MSGS.ADD) },
      "+"
    ),
    button(
      { className: "pv1 ph2", onclick: () => dispatch(MSGS.SUBTRACT) },
      "-"
    ),
  ]);
}

//
const MSGS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
};

//Update
function update(msg, model) {
  switch (msg) {
    case MSGS.ADD:
      return model + 1;
    case MSGS.SUBTRACT:
      return model - 1;
    default:
      return model;
  }
}

// impure code below
function app(initModel, update, view, node) {
  // model - state of our app
  let model = initModel;
  // current view
  let currentView = view(dispatch, model);
  //
  let rootNode = createElement(currentView);
  // showing the initial app view to the DOM
  node.appendChild(rootNode);

  //   model = update(msg, model)
  //   currentView = view(model)
  //   node.replaceChild(currentView)

  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    //
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    //
    currentView = updatedView;
  }
}

//DOM
const rootNode = document.getElementById("app");

app(initModel, update, view, rootNode);

// rootNode.appendChild(view(update("plus", initModel)));
