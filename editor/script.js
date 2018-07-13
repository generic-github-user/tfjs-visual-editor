
console.log("script.js loaded.");

const nodes = {
      "tensors": {
            "tensor": {
                  // We could get the title from the HTML menu, but that would be somewhat messy
                  "title": "Tensor",
                  "information": "https://js.tensorflow.org/api/latest/index.html#tensor"
            },
            "scalar": {
                  "title": "Scalar",
                  "information": "https://js.tensorflow.org/api/latest/index.html#scalar"
            }
      }
}

const nodeList = [

];

var newNode;
var nodeHTML;
const add = function (node) {
      newNode = {
            "title": node.title,
            "name": "",
            "description": "",
            "display": {
                  "position": {
                        "x": 200,
                        "y": 200
                  },
                  "dimensions": {
                        "width": 400,
                        "height": 200
                  }
            }
      };


      nodeHTML = "<div class='node' style='width:" + newNode.display.dimensions.width + "; height:" + newNode.display.dimensions.height + ";'>";
      nodeHTML += "<h4>" + node.title + "</h4>";
      nodeHTML += "</div>";
      document.querySelector("#editor").innerHTML += nodeHTML;

      nodeList.push(newNode);
}
