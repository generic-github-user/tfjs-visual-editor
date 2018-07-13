
console.log("script.js loaded.");

const nodes = {
      "tensors": {
            "tensor": {
                  // We could get the title from the HTML menu, but that would be somewhat messy
                  "title": "Tensor"
            },
            "scalar": {
                  "title": "Scalar"
            }
      }
}

var nodeHTML;
const add = function (node) {
      nodeHTML = "<div class='node'>";
      nodeHTML += "<h4>" + node.title + "</h4>";
      nodeHTML += "</div>";
      document.querySelector("#editor").innerHTML += nodeHTML;
}
