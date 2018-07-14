var nodeList = [

];

function update() {
      document.querySelector("#editor").innerHTML = "";

      nodeList.forEach(
            function (node) {
                  if (!document.getElementById(node.id)) {
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
<div class="node" ' + style + ' id="' + node.id + '">\
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

      console.log("Saving editor data to browser localStorage . . .");
      localStorage.setItem("tfjs-visual-editor", JSON.stringify(nodeList));
      console.log("Editor data saved:");
      console.log(nodeList);
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
            console.error("Sorry, but this node is not currently supported. It will be soon!");
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
      nodeList.push(node);
      update();
}

console.log("Main editor script loaded. (script.js)");
