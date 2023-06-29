// Jest tests for shapes

// require/access for all 3 shapes code to be tested from the shapes js file
const { Circle, Square, Triangle } = require("./shapes")

// circle test... just duplicate for each shape with a new color (square and triangle)
describe('Circle', () => {
    test('renders correctly', () => {
        const shape = new Circle();
        var color = ('green')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}">`);
    });
});