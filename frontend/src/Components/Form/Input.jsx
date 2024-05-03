import React, { useReducer } from "react";
import "./input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    }
    default: {
      return state;
    }
  }
};

const Input = (props) => {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const onChangeHandler = (e) => {
    console.log(e.target.value);

    dispatch({
      type: "CHANGE",
      value: e.target.value,
      isValid: true,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={` ${mainInput.isValid ? "success" : "error"} ${
          props.className
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={` ${mainInput.isValid ? "success" : "error"} ${
          props.className
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    );

  return <>{element}</>;
};

export default Input;
