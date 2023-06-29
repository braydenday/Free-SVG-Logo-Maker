// Runs the application using imports from lib/

const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Square, Circle } = require("./lib/shapes");

// rendering and setting the text/shape elements in the SVG. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version
function writeToFile(fileName, answers) {
  let svgString = "";
  svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;

// if statements to generate new shape and set color based on the input response
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

// generate a new svg with the new shape and color
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// questions prompting you for text, text color, shape and shape color. then an if statement to check for user text input response is between 1-3 characters and error if otherwise
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "text",
        message: "enter up to (3) characters:",
      },
      {
        type: "input",
        name: "textColor",
        message: "enter a color keyword for the text:",
      },
      {
        type: "input",
        name: "shapeBackgroundColor",
        message: "enter a color keyword for the shape:",
      },
      {
        type: "list",
        name: "shape",
        message: "which shape do you prefer:",
        choices: ["Triangle", "Square", "Circle"],
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("only use 1-3 Characters");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}
promptUser();