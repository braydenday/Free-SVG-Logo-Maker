// Runs the application using imports from lib/
const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle } = require("./lib/shapes");

// contructor with 3 methods for rendering and setting the text/shape elements in the SVG. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version
class Svg {
    constructor() {
        this.textElement = ''
        this.shapeElement = ''
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="50" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render()

    }
}

// questions prompting you for text, text color, shape and shape color
const questions = [
    {
        type: "input",
        name: "text",
        message: "enter up to (3) characters:",
    },
    {
        type: "input",
        name: "tcolor",
        message: "enter a color keyword for the text:",
    },
    { // this needs to be shape-color
        type: "input",
        name: "scolor",
        message: "enter a color keyword for the shape:",
    },
    { // this needs to be shape
        type: "list",
        name: "shape",
        message: "which shape do you prefer:",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// function to write the data to the file
function writeToFile(fileName, data) {
	console.log("writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("successfully created a logo.svg!");
    });
}
