const svg = document.querySelector("#svg");
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", window.innerHeight);

const selection = {
      "nodes": [

      ],
      "connections": [

      ]
}

var nodeList = [

];

const dialogs = {
      "error": {
            // "unsupported": {
                  "node": document.querySelector("#dialog-error-unsupported-node")
            // }
      },
      "warning": {
            // "delete": {
                  "all": document.querySelector("#dialog-warning-delete-all")
            // }
      }
}

// if (!dialogs.error.node.showModal) {
//       dialogPolyfill.registerDialog(dialog);
// }
dialogs.error.node.querySelector(".close")
.addEventListener("click", function() {
      dialogs.error.node.close();
});

// if (!dialogs.warning.all.showModal) {
//       dialogPolyfill.registerDialog(dialog);
// }
dialogs.warning.all.querySelector(".confirm")
.addEventListener("click", function() {
      deleteAll();
      dialogs.warning.all.close();
});
dialogs.warning.all.querySelector(".close")
.addEventListener("click", function() {
      dialogs.warning.all.close();
});

// Delete all nodes
function deleteAll() {
      console.log("Deleting all nodes...");
      nodeList = [];
      update();
      save();
      console.log("All nodes deleted.");
}
function save() {
      console.log("Saving editor data to browser localStorage . . .");
      localStorage.setItem("tfjs-visual-editor", JSON.stringify(nodeList));
      console.log("Editor data saved:");
      console.log(nodeList);
}
var rect;
var position;
function getPosition(element) {
      rect = element.getBoundingClientRect();
      position = {
            "x": (rect.left + rect.right) / 2,
            "y": (rect.top + rect.bottom) / 2
      }
      return position;
}
// The connections must be updated if the starting or ending node moves
function updateConnections() {
      for (var i = 0; i < nodeList.length; i ++) {
            for (var j = 0; j < nodeList[i].dataSources.length; j ++) {
                  const path = svg.querySelector("#connection-" + nodeList[i].id + "-" + j);
                  const startNode = document.getElementById(/*nodeList[i].dataSources[j].node.id*/nodeList[0].id);
                  const endNode = document.getElementById(nodeList[1].id);
                  const startPosition = getPosition(startNode.querySelector(".outputs-" + /*nodeList[i].dataSources[j].output*/"0"));
                  const endPosition = getPosition(endNode.querySelector(".inputs-0"));
                  path.setAttributeNS(null, "d", 'M ' + startPosition.x + ' ' + startPosition.y + ' C 20 20, 40 20, ' + endPosition.x + ' ' + endPosition.y);
            }
      }
}

const container = "editor";
const editor = document.querySelector("#editor");
const welcome = '<h1 class="center" id="welcome">Welcome to TensorFlow.js Visual Editor!<br />Add some nodes to get started.</h1>';
function update() {
      if (nodeList.length == 0) {
            if (!editor.querySelector("#welcome")) {
                  editor.innerHTML = welcome;
            }
            if (!document.querySelector("#delete-all").disabled) {
                  document.querySelector("#delete-all").disabled = true;
            }
      }
      else {
            if (editor.querySelector("#welcome")) {
                  editor.innerHTML = "";
            }
            if (document.querySelector("#delete-all").disabled) {
                  document.querySelector("#delete-all").disabled = false;
            }

            nodeList.forEach(
                  function (node) {
                        if (!document.getElementById(node.id)) {
                              var inputs = "";
                              for (var i = 0; i < node.node.data.inputs.length; i ++) {
                                    color = dataTypes.find(x => x.dataType == node.node.data.inputs[i].dataTypes[0]).color;
                                    inputs += "<div class='node-data inputs-" + i + "' style='background-color:" + color + ";'></div>";
                              }
                              var outputs = "";
                              for (var i = 0; i < node.node.data.outputs.length; i ++) {
                                    color = dataTypes.find(x => x.dataType == node.node.data.outputs[i].dataType).color;
                                    outputs += "<div class='node-data outputs-" + i + "' style='background-color:" + color + ";'></div>";
                              }

const style = 'style="\
width: ' + node.display.dimensions.width + 'px; \
height: ' + node.display.dimensions.height + 'px; \
left: ' + node.display.position.x + 'px; \
top: ' + node.display.position.y + 'px;\
"';

node.element = '\
<div class="node" ' + style + ' id="' + node.id + '" onmousedown="mydragg.startMoving(this, container, event);" onmouseup="mydragg.stopMoving(container);">\
<h4>' + node.node.title + '</h4>\
' + inputs + '\
' + outputs + '\
<a href="' + node.node.info + '" target="_blank" class="mdl-card__menu" id="' + 'info-' + node.id + '">\
<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-js-ripple-effect">\
<i class="material-icons">info</i>\
</button>\
</a>\
<div class="mdl-tooltip" for="' + 'info-' + node.id + '">\
Documentation\
</div>\
</div>';

                              document.querySelector("#editor").innerHTML += node.element;
                        }


                  }
            );
            nodeList.forEach(
                  function (node) {
                        for (var i = 0; i < node.dataSources.length; i ++) {
                              const id = "connection-" + node.id + "-" + i;
                              if (!document.getElementById(id)) {
                                    // const path = document.createElementNS("http://www.w3.org/1999/xhtml", "path");
                                    // path.setAttributeNS(null, "id", "connection-" + node.id + "-" + i);
                                    // path.setAttributeNS(null, "stroke", "black");
                                    // path.setAttributeNS(null, "stroke-width", "5");
                                    // path.setAttributeNS(null, "fill", "transparent");
                                    // path.setAttributeNS(null, "d", "");
                                    // svg.appendChild(path);
                                    svg.innerHTML += '<path id="' + id + '" stroke="black" stroke-width="5" fill="transparent"></path>';
                              }
                        };
                  }
            );
            updateConnections();
      }
}

function UUID() {
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

const savedData = localStorage.getItem("tfjs-visual-editor");
if (savedData) {
      nodeList = JSON.parse(savedData);
      update();
}

var newNode;
function getNodeInfo(nodeType) {
      if (!nodeType) {
            console.error("Error: Unsupported node.");
            return false;
      }
      else {
            newNode = {
                  "node": nodeType,
                  "name": "",
                  "description": "",
                  "dataSources": [
                        {
                              "node": null,
                              "output": 1
                        }
                  ],
                  "id": UUID(),
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
                  "element": ""
            };

            do {
                  newNode.id = UUID();
            }
            while (nodeList.find(x => x.id == newNode.id) !== undefined)

            return newNode;
      }
}

var color;
function addNode(node) {
      if (!node) {
            dialogs.error.node.showModal();
      }
      else {
            nodeList.push(node);
            update();
            save();
      }
}

console.log("Main editor script loaded. (script.js)");
