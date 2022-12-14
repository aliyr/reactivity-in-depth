import babel from '@babel/core';

const code = '<div>1</div>';

const output = babel.transformSync(code, {
    plugins: [
        function myCustomPlugin() {
            var t = babel.types;
            return {
                visitor: {
                    JSXElement(path) {
                        var openingElement = path.node.openingElement;
                        //tagname is name of tag like div, p etc
                        var tagName = openingElement.name.name;
                        // arguments for React.createElement function
                        var args = [];
                        //adds "div" or any tag as a string as one of the argument
                        args.push(t.stringLiteral(tagName));
                        // as we are considering props as null for now
                        var attribs = t.nullLiteral();
                        //push props or other attributes which is null for now
                        args.push(attribs);
                        // order in AST Top to bottom -> (CallExpression => MemberExpression => Identifiers)
                        // below are the steps to create a callExpression
                        var callee = t.identifier("h"); //object
                        var callExpression = t.callExpression(callee, args);
                        //now add children as a third argument
                        callExpression.arguments = callExpression.arguments.concat(path.node.children);
                        // replace jsxElement node with the call expression node made above
                        path.replaceWith(callExpression, path.node);
                    },
                },
            };
        },
        '@babel/plugin-syntax-jsx'
    ],
});

console.log(output.code)
