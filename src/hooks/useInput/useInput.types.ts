import { ChangeEvent, KeyboardEvent } from 'react';

export type UseInputOptions = {
  initialValue?: string;
  validator?: (value: string) => boolean;
  onSubmit?: (value: string) => void;
};

export type UseInputReturn = {
  value: string;
  setValue: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  isValid: boolean;
  reset: () => void;
};
