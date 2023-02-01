module.exports.functions = [
  {
    id: 1,
    name: "sum",
    displayName: "Sum two numbers",
    args: [
      {
        name: "a",
        type: "int",
      },
      {
        name: "b",
        type: "int",
      },
    ],
    return: {
      type: "int",
      test: "(args) => args.reduce((a, b) => a + b, 0)",
      argsGlue: " + ",
    },
  },
  {
    id: 2,
    name: "isEquals",
    displayName: "Check if two numbers are equal",
    args: [
      {
        name: "a",
        type: "int",
      },
      {
        name: "b",
        type: "int",
      },
    ],
    return: {
      type: "bool",
      test: "([a, b) => a === b",
      argsGlue: " === ",
    },
  },
];
