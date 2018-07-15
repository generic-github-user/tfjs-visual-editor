var nodeList = [

];

const dialogs = {
      "error": {
            // "unsupported": {
                  "node": document.querySelector("#dialog-error-unsupported-node")
            // }
      }
}

if (!dialogs.error.node.showModal) {
      dialogPolyfill.registerDialog(dialog);
}
dialogs.error.node.querySelector(".close")
.addEventListener("click", function() {
      dialogs.error.node.close();
});

function save() {
      console.log("Saving editor data to browser localStorage . . .");
      localStorage.setItem("tfjs-visual-editor", JSON.stringify(nodeList));
      console.log("Editor data saved:");
      console.log(nodeList);
}

const container = "editor";
const editor = document.querySelector("#editor");
const welcome = '<h1 class="center" id="welcome">Welcome to TensorFlow.js Visual Editor!<br />Add some nodes to get started.</h1>';
function update() {
      if (nodeList.length == 0) {
            editor.innerHTML = welcome;
      }
      else {
            if (document.querySelector("#welcome")) {
                  editor.innerHTML = "";
            }

            nodeList.forEach(
                  function (node) {
                        if (node && !document.getElementById(node.id)) {
                              var inputs = "";
                              node.node.data.inputs.forEach(
                                    (input) => {
                                          color = dataTypes.find(x => x.dataType == input.dataTypes[0]).color;
                                          inputs += "<div class='node-data' style='background-color:" + color + ";'></div>";
                                    }
                              );
                              var outputs = "";
                              node.node.data.outputs.forEach(
                                    (output) => {
                                          color = dataTypes.find(x => x.dataType == output.dataTypes[0]).color;
                                          outputs += "<div class='node-data' style='background-color:" + color + ";'></div>";
                                    }
                              );

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
