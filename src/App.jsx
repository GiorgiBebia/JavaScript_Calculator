import { useState } from "react";
import "./index.css";

const buttons = [
  { id: "clear", label: "AC" },
  { id: "divide", label: "/" },
  { id: "multiply", label: "*" },
  { id: "seven", label: "7" },
  { id: "eight", label: "8" },
  { id: "nine", label: "9" },
  { id: "subtract", label: "-" },
  { id: "four", label: "4" },
  { id: "five", label: "5" },
  { id: "six", label: "6" },
  { id: "add", label: "+" },
  { id: "one", label: "1" },
  { id: "two", label: "2" },
  { id: "three", label: "3" },
  { id: "equals", label: "=" },
  { id: "zero", label: "0" },
  { id: "decimal", label: "." },
];

const isOperator = /[*/+-]/;

function App() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClick = (label) => {
    if (label === "AC") {
      setInput("0");
      setFormula("");
      setEvaluated(false);
      return;
    }

    if (label === "=") {
      let expression = formula;
      if (isOperator.test(expression.slice(-1))) {
        expression = expression.slice(0, -1);
      }
      try {
        const result = eval(expression);
        const rounded = parseFloat(result.toFixed(10)).toString();
        setInput(rounded);
        setFormula(expression + "=" + rounded);
        setEvaluated(true);
      } catch {
        setInput("Error");
        setFormula("");
        setEvaluated(true);
      }
      return;
    }

    if (/\d/.test(label)) {
      if (evaluated) {
        setInput(label);
        setFormula(label);
        setEvaluated(false);
      } else {
        if (input === "0" && label === "0") return;
        if ((input === "0" && !input.includes(".")) || isOperator.test(input)) {
          setInput(label);
          setFormula((prev) =>
            isOperator.test(prev.slice(-1)) ? prev + label : label
          );
        } else {
          setInput((prev) => prev + label);
          setFormula((prev) => prev + label);
        }
      }
    }

    if (label === ".") {
      if (evaluated) {
        setInput("0.");
        setFormula("0.");
        setEvaluated(false);
      } else if (!input.includes(".")) {
        setInput((prev) => prev + ".");
        setFormula((prev) => prev + ".");
      }
    }

    if (isOperator.test(label)) {
      if (evaluated) {
        setFormula(input + label);
        setInput(label);
        setEvaluated(false);
      } else {
        if (isOperator.test(input)) {
          if (label === "-" && input !== "-") {
            setFormula((prev) => prev + label);
            setInput(label);
          } else {
            setFormula((prev) =>
              /[*/+]-$/.test(prev)
                ? prev.slice(0, -2) + label
                : prev.slice(0, -1) + label
            );
            setInput(label);
          }
        } else {
          setFormula((prev) => prev + label);
          setInput(label);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-80">
        <div
          id="display"
          className="bg-black text-lime-400 text-right text-2xl p-4 rounded mb-4 font-mono break-words"
        >
          {input}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map(({ id, label }) => (
            < button
              key={id}
              id={id}
              onClick={() => handleClick(label)}
              className={`p-4 text-xl rounded text-white font-semibold ${id === "clear"
                ? "bg-red-600 hover:bg-red-700 col-span-2"
                : id === "equals"
                  ? "bg-green-600 hover:bg-green-700 row-span-2"
                  : id === "zero"
                    ? "col-span-2 bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

      </div>
    </div >
  );
}

export default App;
