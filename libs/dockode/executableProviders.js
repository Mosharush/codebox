export default {
  node: {
    name: "node",
    displayName: "JavaScript",
    docker: {
      image: "node",
      defaultTag: "19",
      command: "node -e '{code}'",
    },
    generator: {
      functionTemplate: `
function {name}({args}) {
  {body}
  
  return {return};
}
    `,
    },
  },
  php: {
    name: "php",
    displayName: "PHP",
    docker: {
      image: "php",
      defaultTag: "7.4",
      command: "php -r '{code}'",
    },
    generator: {
      varPrefix: "$",
      functionTemplate: `
function {name}({args}) {
  {body}
  
  return {return};
}
    `,
    },
  },
  python: {
    name: "python",
    displayName: "Python",
    docker: {
      image: "python",
      defaultTag: "3.6.5",
      command: "python -c '{code}'",
    },
    generator: {
      functionTemplate: `
def {name}({args}):
    {body}
    return {return}
    `,
    },
  },
};
