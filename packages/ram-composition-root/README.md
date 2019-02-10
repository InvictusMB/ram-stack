# ram-stack/composition-root macro

`composition-root` is a [Babel macro](https://github.com/kentcdodds/babel-plugin-macros) for defining an application composition root and autowiring.
 It is intended to streamline setting up a convention based application structure and automate populating of a [Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) container.

Application structure is represented as a set of rules describing where to locate the files, how to get exported things from them and, eventually, how to register those things in a container. All the files following the configured convention will be automatically picked by Babel during compilation.

See [Sample app](../ram-sample-app/README.md) for a reference setup of [React](https://reactjs.org/) [Awilix](https://github.com/jeffijoe/awilix#readme) [MobX](https://mobx.js.org/) application.
