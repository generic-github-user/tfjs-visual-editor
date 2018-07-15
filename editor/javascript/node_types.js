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
                                    "dataTypes": "tensor"
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
                                    "dataType": "scalar"
                              }
                        ]
                  },
                  "info": "https://js.tensorflow.org/api/latest/index.html#scalar"
            },
            "tensor1d": {
                  "title": "Tensor1D",
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
                                    // Technically tensor1d
                                    "dataType": "tensor"
                              }
                        ]
                  },
                  "info": "https://js.tensorflow.org/api/latest/index.html#tensor1d"
            },
            "tensor2d": {
                  "title": "Tensor2D",
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
                                    "dataType": "tensor"
                              }
                        ]
                  },
                  "info": "https://js.tensorflow.org/api/latest/index.html#tensor2d"
            },
            "tensor3d": {
                  "title": "Tensor3D",
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
                                    "dataType": "tensor"
                              }
                        ]
                  },
                  "info": "https://js.tensorflow.org/api/latest/index.html#tensor3d"
            },
            "tensor4d": {
                  "title": "Tensor4D",
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
                                    "dataType": "tensor"
                              }
                        ]
                  },
                  "info": "https://js.tensorflow.org/api/latest/index.html#tensor4d"
            },
            "tensor5d": {
                  "title": "Tensor5D",
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
                                    "dataType": "tensor"
                              }
                        ]
                  },
                  "info": "https://js.tensorflow.org/api/latest/index.html#tensor5d"
            }
      }
}

console.log("Node types loaded. (node_types.js)");
