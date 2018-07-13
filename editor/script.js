
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
            "node": node,
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
            },
            "elements": {
                  "main": document.createElement("div"),
                  "title": document.createElement("h4"),
                  "information": document.createElement("button"),
                  "informationIcon": document.createElement("i")
            }
      };
      do {
            newNode.id = uuid();
      } while (nodeList.find(x => x.id == newNode.id) !== undefined)

      const main = newNode.elements.main;
      main.className = "node";
      main.style.width = newNode.display.dimensions.width + "px";
      main.style.height = newNode.display.dimensions.height + "px";
      main.style.left = newNode.display.position.x + "px";
      main.style.top = newNode.display.position.y + "px";
      main.style.id = newNode.id;

      newNode.elements.title.innerText = newNode.node.title;
      main.appendChild(newNode.elements.title);

      newNode.elements.information.className = "mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-js-ripple-effect mdl-card__menu";
      newNode.elements.informationIcon.innerText = "info";
      newNode.elements.informationIcon.className = "material-icons";
      newNode.elements.information.appendChild(newNode.elements.informationIcon);
      main.appendChild(newNode.elements.information)

      nodeList.push(newNode);
      document.querySelector("#editor").appendChild(main);
}
