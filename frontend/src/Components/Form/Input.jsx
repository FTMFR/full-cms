import React, { useEffect, useReducer } from "react";
import "./input.css";
import validator from "../../validators/validator";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      // console.log(action.value, 'inputs');
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
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
    // console.log(),
  });

  const { value, isValid } = mainInput;
  const { id, onInputHandler } = props;

  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);

    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validations: props.validations,
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
