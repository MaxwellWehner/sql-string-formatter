import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [wrappings, setWrappings] = useState({ prepend: '"', append: '"' });
  const [delimiter, setDelimiter] = useState(",");
  const [textCase, setTextCase] = useState("none");
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");

  const setUserValues = () => {
    const prependValue = document.getElementById("prepend");
    const appendValue = document.getElementById("append");
    const delimiterValue = document.getElementById("delimiter");
    const classType = document.getElementsByName("caseType");
    const inputData = document.getElementsByClassName("main-input")[0];
    setWrappings({
      prepend: `${prependValue.value}`,
      append: `${appendValue.value}`,
    });
    setDelimiter(`${delimiterValue.value}`);
    setInputData(inputData.value);
    for (let i = 0; i < 3; i++) {
      if (classType[i].checked) {
        switch (classType[i].id) {
          case "none":
            setTextCase("none");
            break;
          case "LowerCase":
            setTextCase("LowerCase");
            break;
          case "UpperCase":
            setTextCase("UpperCase");
            break;
          default:
            setTextCase("none");
            break;
        }
      }
    }
  };

  const convertText = () => {
    setUserValues();
    let finalData = "";
    let inputDataArr = inputData.split(/\r?\n/).map((word) => {
      return `${wrappings.prepend}${word}${wrappings.append}`;
    });

    if (textCase === "LowerCase") {
      finalData = inputDataArr
        .map((word) => {
          return word.toLowerCase();
        })
        .join(delimiter);
    } else if (textCase === "UpperCase") {
      finalData = inputDataArr
        .map((word) => {
          return word.toUpperCase();
        })
        .join(delimiter);
    } else {
      finalData = inputDataArr.join(delimiter);
    }
    setOutputData(finalData);
    console.log("complete", inputDataArr);
  };

  const clearBoxes = () => {
    const inputData = document.getElementsByClassName("main-input")[0];
    setInputData("");
    setOutputData("");
    inputData.value = "";
  };

  const copyOutput = () => {
    const outputData = document.getElementsByClassName("text-output")[0];
    outputData.select();
    outputData.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="prepend">Prepend: </label>
        <input
          type="text"
          id="prepend"
          name="prepend"
          defaultValue={wrappings.prepend}
          onChange={setUserValues}
        />
        <br />
        <label htmlFor="append">Append: </label>
        <input
          type="text"
          id="append"
          name="apend"
          defaultValue={wrappings.append}
          onChange={setUserValues}
        />
        <br />
        <label htmlFor="delimeter">Delimiter: </label>
        <input
          type="text"
          id="delimiter"
          name="delimiter"
          defaultValue={delimiter}
          onChange={setUserValues}
        />
      </form>
      <form>
        <p>Select Case Type:</p>
        <label htmlFor="none">No Change: </label>
        <input
          type="radio"
          id="none"
          name="caseType"
          defaultChecked={true}
          onChange={setUserValues}
        />
        <br />
        <label htmlFor="LowerCase">Lower Case: </label>
        <input
          type="radio"
          id="LowerCase"
          name="caseType"
          onChange={setUserValues}
        />
        <br />
        <label htmlFor="UpperCase">Upper Case: </label>
        <input
          type="radio"
          id="UpperCase"
          name="caseType"
          onChange={setUserValues}
        />
      </form>
      <br />
      <div classname="buttons">
        <button onClick={convertText}>Convert Text</button>
        <br />
        <button onClick={clearBoxes}>Clear All</button>
        <br />
        <button onClick={copyOutput}>Add to clipboard</button>
      </div>
      <br />
      <textarea
        type="text"
        className="main-input"
        onChange={setUserValues}
      ></textarea>
      <br />
      <textarea className="text-output" value={outputData}></textarea>
    </div>
  );
};

export default App;
