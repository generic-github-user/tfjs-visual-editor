var nodeList = [

];
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
                  "elements": {
                        "main": document.createElement("div"),
                        "title": document.createElement("h4")
                  }
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
      document.querySelector("#editor").innerHTML = "";

      const main = node.elements.main;
      main.className = "node";
      main.style.width = node.display.dimensions.width + "px";
      main.style.height = node.display.dimensions.height + "px";
      main.style.left = node.display.position.x + "px";
      main.style.top = node.display.position.y + "px";
      main.style.id = node.id;

      node.elements.title.innerText = node.node.title;
      main.appendChild(node.elements.title);

      main.innerHTML += "\
            <a href='" + node.node.info + "' target='_blank'>\
                  <button class='mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-js-ripple-effect mdl-card__menu' id='" + "info-" + node.id + "'>\
                        <i class='material-icons'>info</i>\
                  </button>\
            </a>\
            <div class='mdl-tooltip' for='" + "info-" + node.id + "'>\
                  Documentation\
            </div>\
      ";
      node.node.data.inputs.forEach(
            (input) => {
                  color = dataTypes.find(x => x.dataType == input.dataTypes[0]).color;
                  main.innerHTML += "<div class='node-data' style='background-color:" + color + ";'></div>";
            }
      );
      node.node.data.outputs.forEach(
            (output) => {
                  color = dataTypes.find(x => x.dataType == output.dataTypes[0]).color;
                  main.innerHTML += "<div class='node-data' style='background-color:" + color + ";'></div>";
            }
      );

      nodeList.push(node);
      document.querySelector("#editor").appendChild(main);
}

console.log("Main editor script loaded. (script.js)");
