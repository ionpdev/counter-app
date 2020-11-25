// Pure Functions Rules

// 1. Have Input Parameters
// 2. No Stateful Values
// 3. Return Based on Input
// 4. No Side Effects
import h from "hyperscript";
import hh from "hyperscript-helpers";

const { div, button } = hh(h);

// Default value, initial model
const initModel = 0;
//App View Html
function view(dispatch, model) {
  return div([
    div({ className: "mv2" }, `Count: ${model}`),
    button({ className: "pv1 ph2 mr2", onclick: () => dispatch("plus") }, "+"),
    button({ className: "pv1 ph2", onclick: () => dispatch("minus") }, "-"),
  ]);
}
//Update
function update(msg, model) {
  switch (msg) {
    case "plus":
      return model + 1;
    case "minus":
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
  // showing the initial app view to the DOM
  node.appendChild(currentView);

  //   model = update(msg, model)
  //   currentView = view(model)
  //   node.replaceChild(currentView)
  function dispatch() {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

//DOM
const rootNode = document.getElementById("app");

app(initModel, update, view, rootNode);

// rootNode.appendChild(view(update("plus", initModel)));
