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
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
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
    {
        type: "input",
        name: "scolor",
        message: "enter a color keyword for the shape:",
    },
    {
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
// async function to check for the valid user responses, generate a new svg based on responses, and print/write the new svg
async function init() {
    console.log("starting init");
    var svgString = "";
    var svgFile = "logo.svg";

// wait for questions to be answered before prompting answers
    const answers = await inquirer.prompt(questions);

// if statement to check for user text input response is between 1-3 characters and error if otherwise
    var userText = "";
    if (answers.text.length > 0 && answers.text.length < 4) {
        userText = answers.text;
    } else {
        console.log("only use 1-3 Characters");
        return;
    }
    console.log("user text: [" + userText + "]");

//use the text color from input response
    fontColor = answers.tcolor;
    console.log("text color: [" + fontColor + "]");
//use the shape color from input response
    shapeColor = answers.scolor;
    console.log("shape color: [" + shapeColor + "]");
//use the shape from input response
    shapeType = answers.shape;
    console.log("entered shape = [" + shapeType + "]");

//if statements to generate new shape and set color based on the input response
    let userShape;
    if (shapeType === "square" || shapeType === "square") {
        userShape = new Square();
        console.log("square");
    }
    else if (shapeType === "sircle" || shapeType === "circle") {
        userShape = new Circle();
        console.log("circle");
    }
    else if (shapeType === "triangle" || shapeType === "triangle") {
        userShape = new Triangle();
        console.log("triangle");
    }
    else {
        console.log("wrong shape");
    }
    userShape.setColor(shapeColor);

//generate a new svg with the new shape and color
    var svg = new Svg();
    svg.setTextElement(userText, fontColor);
    svg.setShapeElement(userShape);
    svgString = svg.render();

    console.log("shape:\n\n" + svgString);
    writeToFile(svgFile, svgString);
}
init()