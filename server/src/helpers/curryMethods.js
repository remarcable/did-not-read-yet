export function curryMethods(methodsObj = {}, ...params) {
    const curriedMethods = {};
    Object.keys(methodsObj).forEach(methodName => {
        const functionToBeCurried = methodsObj[methodName];

        if (typeof functionToBeCurried !== 'function') {
            throw new Error('Tried to curry something that is not a function');
        }

        curriedMethods[methodName] = functionToBeCurried(...params);
    });

    return curriedMethods;
}
