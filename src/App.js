import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [wrappings, setWrappings] = useState({ prepend: "", append: "" });
  const [delimiter, setDelimiter] = useState(",");
  const [textCase, setTextCase] = useState("none");
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const setUserValues = () => {
    const prependValue = document.getElementById("prepend");
    const appendValue = document.getElementById("append");
    const delimiterValue = document.getElementById("delimiter");
    const caseType = document.getElementsByName("caseType");
    const inputData = document.getElementsByClassName("main-input")[0];
    const trimedChecked = document.getElementById("trimCheck");
    const defaults = document.getElementsByName("defaults");

    setWrappings({
      prepend: `${prependValue.value}`,
      append: `${appendValue.value}`,
    });
    setDelimiter(`${delimiterValue.value}`);
    setInputData(inputData.value);
    setIsChecked(trimedChecked.checked);
    for (let i = 0; i < 3; i++) {
      if (caseType[i].checked) {
        switch (caseType[i].id) {
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

    for (let i = 0; i < 6; i++) {
      if (defaults[i].checked) {
        switch (defaults[i].id) {
          case "typeIn":
            break;
          case "blank":
            setWrappings({ prepend: "", append: "" });
            prependValue.value = "";
            appendValue.value = "";
            break;
          case "'":
            setWrappings({ prepend: "'", append: "'" });
            prependValue.value = "'";
            appendValue.value = "'";
            break;
          case '"':
            setWrappings({ prepend: '"', append: '"' });
            prependValue.value = '"';
            appendValue.value = '"';
            break;
          case "()":
            setWrappings({ prepend: "(", append: ")" });
            prependValue.value = "(";
            appendValue.value = ")";
            break;
          case "[]":
            setWrappings({ prepend: "[", append: "]" });
            prependValue.value = "[";
            appendValue.value = "]";
            break;
          default:
            setWrappings({ prepend: "", append: "" });
            prependValue.value = "";
            appendValue.value = "";
            break;
        }
      }
    }
  };

  const convertText = () => {
    setUserValues();
    let finalData = "";
    let trimedDataArr;
    let apendedDataArr;
    let inputDataArr = inputData.split(/\r?\n/);
    let inputDataArrNoSpace = inputDataArr.filter(function (word) {
      return word !== "";
    });

    if (isChecked) {
      trimedDataArr = inputDataArrNoSpace.map((word) => {
        return word.trim();
      });
    } else {
      trimedDataArr = [...inputDataArrNoSpace];
    }

    apendedDataArr = trimedDataArr.map((word) => {
      return wrappings.prepend + word + wrappings.append;
    });

    if (textCase === "LowerCase") {
      finalData = apendedDataArr
        .map((word) => {
          return word.toLowerCase();
        })
        .join(delimiter);
    } else if (textCase === "UpperCase") {
      finalData = apendedDataArr
        .map((word) => {
          return word.toUpperCase();
        })
        .join(delimiter);
    } else {
      finalData = apendedDataArr.join(delimiter);
    }
    setOutputData(finalData);
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

  const setToTypeIn = () => {
    const typeIn = document.getElementById("typeIn");
    typeIn.checked = true;
  };

  return (
    <div className="App">
      <div className="formContainer">
        <div className="formTop">
          <form className="attach">
            <label htmlFor="prepend">Prepend: </label>
            <input
              type="text"
              id="prepend"
              defaultValue={wrappings.prepend}
              onChange={setUserValues}
              onClick={setToTypeIn}
            />
            <label htmlFor="append">Append: </label>
            <input
              type="text"
              id="append"
              defaultValue={wrappings.append}
              onChange={setUserValues}
              onClick={setToTypeIn}
            />
            <label htmlFor="delimeter">Delimiter: </label>
            <input
              type="text"
              id="delimiter"
              defaultValue={delimiter}
              onChange={setUserValues}
            />
          </form>
          <form className="case">
            <label>Select Case Type:</label>

            <input
              type="radio"
              id="none"
              name="caseType"
              defaultChecked={true}
              onChange={setUserValues}
            />
            <label htmlFor="none">No Change</label>

            <input
              type="radio"
              id="LowerCase"
              name="caseType"
              onChange={setUserValues}
            />
            <label htmlFor="LowerCase">Lower Case</label>

            <input
              type="radio"
              id="UpperCase"
              name="caseType"
              onChange={setUserValues}
            />
            <label htmlFor="UpperCase">Upper Case</label>
          </form>
          <form className="defaults">
            <label>Select a defalut prefix and suffix:</label>

            <input
              type="radio"
              id="typeIn"
              name="defaults"
              defaultChecked={true}
              onChange={setUserValues}
              hidden
            />

            <input
              type="radio"
              id="blank"
              name="defaults"
              onChange={setUserValues}
            />
            <label htmlFor="blank">Blank</label>

            <input
              type="radio"
              id="'"
              name="defaults"
              onChange={setUserValues}
            />
            <label htmlFor="'">'single quote'</label>

            <input
              type="radio"
              id='"'
              name="defaults"
              onChange={setUserValues}
            />
            <label htmlFor='"'>"double quote"</label>

            <input
              type="radio"
              id="()"
              name="defaults"
              onChange={setUserValues}
            />
            <label htmlFor="()">(parentheses)</label>

            <input
              type="radio"
              id="[]"
              name="defaults"
              onChange={setUserValues}
            />
            <label htmlFor="[]">[brackets]</label>
          </form>
          <input type="checkbox" id="trimCheck" onChange={setUserValues} />
          <label htmlFor="trimCheck">Trim WhiteSpace</label>
        </div>
        <div className="buttons">
          <button onClick={convertText}>Convert Text</button>
          <br />
          <button onClick={copyOutput}>Add to clipboard</button>
          <br />
          <button onClick={clearBoxes}>Clear All</button>
        </div>
      </div>
      <textarea
        type="text"
        className="main-input"
        onChange={setUserValues}
      ></textarea>
      <br />
      <textarea className="text-output" value={outputData} readOnly></textarea>
    </div>
  );
};

export default App;
