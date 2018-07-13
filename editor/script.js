
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
function uuid() {
      function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var newNode;
var nodeHTML;
function add(node) {
      newNode = {
            "title": node.title,
            "name": "",
            "description": "",
            "id": uuid(),
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
      do {
            newNode.id = uuid();
      } while (nodeList.find(x => x.id == newNode.id))


      nodeHTML = "<div class='node' style='width:" + newNode.display.dimensions.width + "; height:" + newNode.display.dimensions.height + ";'>";
      nodeHTML += "<h4>" + node.title + "</h4>";
      nodeHTML += "</div>";
      document.querySelector("#editor").innerHTML += nodeHTML;

      nodeList.push(newNode);
}
