import { curryMethods } from './curryMethods';

describe('curryMethods(methodsObj = {}, ...params)', () => {
    it('returns an object', () => {
        expect(curryMethods()).toBeInstanceOf(Object);
    });

    it('curries a single function with the provided param', () => {
        const methodsObj = {
            myFunc: jest.fn(() => () => {}), // returns a function
        };

        const paramToBeCurried = { _id: 5, mongo: {} };

        curryMethods(methodsObj, paramToBeCurried);

        expect(methodsObj.myFunc).toBeCalledWith(paramToBeCurried);
    });

    it('works with multiple functions and multiple params', () => {
        const methodsObj = {
            myFunc1: param => () => param,
            myFunc2: (param, param2) => () => param2,
        };

        const param1 = 10;
        const param2 = 20;

        const curriedMethods = curryMethods(methodsObj, param1, param2);

        expect(curriedMethods.myFunc1()).toBe(param1);
        expect(curriedMethods.myFunc2()).toBe(param2);
    });

    it('throws if a key in methodsObj is not a function', () => {
        const methodsObj = {
            notAFunction: 'hello',
        };

        expect(() => curryMethods(methodsObj)).toThrow();
    });
});
