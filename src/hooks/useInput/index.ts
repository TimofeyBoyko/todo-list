import { useState, useCallback, ChangeEvent, KeyboardEvent } from "react";
import type { UseInputOptions, UseInputReturn } from "./useInput.types";

export type { UseInputOptions, UseInputReturn };

export const useInput = ({
  initialValue = "",
  validator = (value: string) => value.trim() !== "",
  onSubmit,
}: UseInputOptions = {}): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);

  // Determine if the current value is valid
  const isValid = validator(value);

  // Handle input change
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  // Handle key down events (specifically Enter key)
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && isValid && onSubmit) {
        onSubmit(value);
        setValue("");
      }
    },
    [value, isValid, onSubmit]
  );

  // Reset the input value
  const reset = useCallback(() => {
    setValue("");
  }, []);

  return {
    value,
    setValue,
    onChange,
    onKeyDown,
    isValid,
    reset,
  };
};
