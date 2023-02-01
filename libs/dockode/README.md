# Lib: @c/dockode (Docker Code)

This lib used to run docker commands in nodejs and provider a sandbox wrapper and security.

Also, this lib manage executable languages providers and compilers.

## How to use

Run code in multiple languages:

```js
const dockode = require("@c/dockode");
const resultNode = await dockode.run("node", 'console.log("Hello world")');
const resultPhp = await dockode.run("php", 'echo "Hello world";');
const resultPy = await dockode.run("python", 'print("Hello world")');
```

Get provider by language:

```js
const dockode = require("@c/dockode");
const provider = dockode.getProvider("node");
```

## Add a new provider

On `./executableProviders.js` add a new provider:

```js
{
    name: "python",
    displayName: "Python",
    docker: {
        image: "python",
        defaultTag: "3.6.5",
        command: "python -c '{code}'"
    },
    generator: {
        functionTemplate: `
            ...template
        `,
        varPrefix: "$" // optional
    }

}
```

| Property                   | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| name                       | The name of the provider                                       |
| displayName                | The display name of the provider                               |
| docker.image               | The docker image                                               |
| docker.defaultTag          | The default tag (version) of the docker image                  |
| docker.command             | The docker command to run inline code                          |
| generator.functionTemplate | The template of the language function for UI                   |
| generator.varPrefix        | optional - added prefix before any arg for languages like $PHP |

### Happy coding!
