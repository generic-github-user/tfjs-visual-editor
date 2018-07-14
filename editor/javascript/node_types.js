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
                  "info": "https://js.tensorflow.org/api/latest/index.html#tensor"
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
                  "info": "https://js.tensorflow.org/api/latest/index.html#scalar"
            }
      }
}

console.log("Node types loaded. (node_types.js)");
