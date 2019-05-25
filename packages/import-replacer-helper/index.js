const {createMacro} = require('babel-plugin-macros');

module.exports = {
  createReplacerMacro,
};

function createReplacerMacro(config) {
  const {
    getPath,
    defaultNamespaceImport,
  } = config;

  return createMacro(replacerMacro);

  function replacerMacro({references, babel}) {
    const {types} = babel;

    forEach(references, (referenceInstances, referenceName) => {
      if (referenceName !== 'default') {
        throw new TypeError(`Named imports are not implemented yet. Please use "${defaultNamespaceImport}" for now.`);
      }
      forEach(referenceInstances, reference => {
        switch (reference.type) {
          case 'JSXIdentifier':
            if (!types.isJSXOpeningElement(reference.parentPath.parentPath)) {
              break;
            }
            if (!types.isJSXMemberExpression(reference.parentPath)) {
              throw new TypeError(`Unexpected parent node type: ${reference.parentPath.type}`);
            }

            const id = replaceReference(reference, types, types.JSXIdentifier, getPath);

            const jsxOpeningElement = reference.parentPath.parentPath.node;
            if (jsxOpeningElement.selfClosing) {
              break;
            }

            const jsxElementPath = reference.parentPath.parentPath.parentPath;
            const jsxClosingElementNamePath = jsxElementPath.get('closingElement.name');
            jsxClosingElementNamePath.replaceWith(types.JSXIdentifier(id));
            break;
          case 'Identifier':
            if (
              types.isTSQualifiedName(reference.parentPath)
              || types.isQualifiedTypeIdentifier(reference.parentPath)
            ) {
              break;
            }
            if (!types.isMemberExpression(reference.parentPath)) {
              throw new TypeError(`Unexpected parent node type: ${reference.parentPath.type}`);
            }
            replaceReference(reference, types, types.Identifier, getPath);
            break;
          default:
            throw new TypeError(`Unsupported reference type ${reference.type}`);
        }
      });
    });
  }
}

function forEach(collection, iterator) {
  if (!collection) {
    return;
  }
  if (Array.isArray(collection)) {
    return collection.forEach(iterator);
  }
  Object.keys(collection)
    .forEach(key => iterator(collection[key], key, collection));
}

function replaceReference(reference, types, replacementType, replacer) {
  const name = reference.container.property.name;
  const id = insertImport(reference, types, name, replacer);
  reference.parentPath.replaceWith(replacementType(id));
  return id;
}

function insertImport(reference, types, name, replacer) {
  const {scope} = reference.findParent(path => path.type === 'Program');
  const identifier = scope.generateUidIdentifier(name);
  const ast = types.importDeclaration(
    [types.importDefaultSpecifier(identifier)],
    types.stringLiteral(replacer(name)),
  );
  scope.block.body.unshift(ast);
  return identifier.name;
}
