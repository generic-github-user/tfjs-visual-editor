const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
function getLocation(element) {
      var rect = element.getBoundingClientRect();
      var location = {
            "x": (rect.left + rect.right) / 2,
            "y": (rect.top + rect.bottom) / 2
      }
      return location;
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
                              document.querySelector("#editor").innerHTML += node.element;
                        }

                        context.strokeStyle = "#FF0000";
                        context.lineWidth = 5;

                        const location1 = getLocation(document.getElementById(node.id).querySelector(".inputs-0"));
                        const location2 = getLocation(document.getElementById(node.id).querySelector(".inputs-1"));

                        context.beginPath();
                        context.moveTo(location1.x, location1.y);
                        context.lineTo(location2.x, location2.y);
                        context.stroke();
                  }
            );
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
      if (! nodeType) {
            console.error("Error: Unsupported node.");
            return false;
      }
      else {
            newNode = {
                  "node": nodeType,
                  "name": "",
                  "description": "",
                  "dataSources": [],
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
