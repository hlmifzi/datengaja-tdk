import { useEffect, useState } from "react";
import { string } from "prop-types";

function parseLocaleNumber(stringNumber) {
  return parseFloat(
    stringNumber
      .replace(new RegExp("\\.", "g"), "")
      .replace(new RegExp("\\,"), ".")
  );
}

function useParseNumber(number) {
  const format = number => new Intl.NumberFormat("id-ID").format(number);
  const [newNumber, setNewNumber] = useState(number);
  const [formatedNumber, setFormatedNumber] = useState("");

  const setNumber = stringNumber => {
    let lastNumber = index => stringNumber.slice(-index);
    if (stringNumber) {
      if (lastNumber(1) === ",") {
        let isRemove = stringNumber.length <= newNumber.toString().length;
        if (formatedNumber.includes(",") && !isRemove) {
          stringNumber = stringNumber.substring(0, stringNumber.length - 1);
        }

        if (isRemove && formatedNumber.slice(-1) === ",") {
          stringNumber = stringNumber.substring(0, stringNumber.length - 1);
        }
        setFormatedNumber(stringNumber);
        setNewNumber(parseLocaleNumber(stringNumber));
      } else if (lastNumber(2) === ",0") {
        setFormatedNumber(stringNumber);
        setNewNumber(parseLocaleNumber(stringNumber));
      } else if (lastNumber(1) === "0" && formatedNumber.includes(",")) {
        setFormatedNumber(stringNumber);
      } else {
        setNewNumber(parseLocaleNumber(stringNumber));
      }
    } else {
      setNewNumber(parseLocaleNumber("0"));
    }
  };

  useEffect(() => {
    setFormatedNumber(format(newNumber));
  }, [newNumber]);

  useEffect(() => {
    setNewNumber(number);
  }, [number]);

  return {
    number: newNumber,
    formatedNumber,
    setNumber
  };
}

export default useParseNumber;
