
console.log("script.js loaded.");

const dataTypes = [
      {
            "dataType": "array",
            "name": "Array",
            "color": "#0F0"
      },
      {
            "dataType": "string",
            "name": "String",
            "color": "#F00"
      },
      {
            "dataType": "tensor",
            "name": "Tensor"
      },
      {
            "dataType": "number",
            "name": "Number",
            "color": "#00F"
      },
      {
            "dataType": "boolean",
            "name": "Boolean"
      },
      {
            "dataType": "scalar",
            "name": "Scalar"
      }
];
const nodes = {
      "tensors": {
            "tensor": {
                  // We could get the title from the HTML menu, but that would be somewhat messy
                  "title": "Tensor",
                  "data": {
                        "inputs": [
                              {
                                    "parameterName": "Values",
                                    "dataTypes": [
                                          "array"
                                    ],
                                    "optional": false
                              },
                              {
                                    "parameterName": "Shape",
                                    "dataTypes": [
                                          "array"
                                    ],
                                    "optional": true
                              },
                              {
                                    "parameterName": "Data type",
                                    "dataTypes": [
                                          "string"
                                    ],
                                    "optional": true
                              }
                        ],
                        "outputs": [
                              {
                                    "outputName": "Output",
                                    "dataTypes": [
                                          "tensor"
                                    ]
                              }
                        ]
                  },
                  "information": "https://js.tensorflow.org/api/latest/index.html#tensor"
            },
            "scalar": {
                  "title": "Scalar",
                  "data": {
                        "inputs": [
                              {
                                    "parameterName": "Value",
                                    "dataTypes": [
                                          "number",
                                          "boolean"
                                    ],
                                    "optional": false
                              },
                              {
                                    "parameterName": "Data type",
                                    "dataTypes": [
                                          "string"
                                    ],
                                    "optional": true
                              }
                        ],
                        "outputs": [
                              {
                                    "outputName": "Output",
                                    "dataTypes": [
                                          "scalar"
                                    ]
                              }
                        ]
                  },
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
function clone(object) {
      return JSON.parse(JSON.stringify(object));
}

var newNode;
var nodeHTML;
var color;
function add(node) {
      newNode = {
            "node": node,
            "name": "",
            "description": "",
            "dataSources": [],
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
                  "title": document.createElement("h4")
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

      main.innerHTML += "\
            <a href='" + newNode.node.information + "' target='_blank'>\
                  <button class='mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-js-ripple-effect mdl-card__menu' id='" + "info-" + newNode.id + "'>\
                        <i class='material-icons'>info</i>\
                  </button>\
            </a>\
            <div class='mdl-tooltip' for='" + "info-" + newNode.id + "'>\
                  Documentation\
            </div>\
      ";
      newNode.node.data.inputs.forEach(
            (input) => {
                  color = dataTypes.find(x => x.dataType == input.dataTypes[0]).color;
                  main.innerHTML += "<div class='node-data' style='background-color:" + color + ";'></div>";
            }
      );
      newNode.node.data.outputs.forEach(
            (output) => {
                  color = dataTypes.find(x => x.dataType == output.dataTypes[0]).color;
                  main.innerHTML += "<div class='node-data' style='background-color:" + color + ";'></div>";
            }
      );

      nodeList.push(newNode);
      document.querySelector("#editor").appendChild(main);
}
