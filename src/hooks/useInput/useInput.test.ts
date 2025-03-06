import { renderHook, act } from "@testing-library/react";
import { jest } from "@jest/globals";
import { useInput } from ".";

describe("useInput Hook", () => {
  it("should initialize with empty string by default", () => {
    const { result } = renderHook(() => useInput());

    expect(result.current.value).toBe("");
    expect(result.current.isValid).toBe(false);
  });

  it("should initialize with provided initial value", () => {
    const { result } = renderHook(() => useInput({ initialValue: "test" }));

    expect(result.current.value).toBe("test");
    expect(result.current.isValid).toBe(true);
  });

  it("should update value on change", () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.onChange({
        target: { value: "new value" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe("new value");
    expect(result.current.isValid).toBe(true);
  });

  it("should reset value", () => {
    const { result } = renderHook(() => useInput({ initialValue: "test" }));

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe("");
    expect(result.current.isValid).toBe(false);
  });

  it("should call onSubmit when Enter key is pressed and input is valid", () => {
    const onSubmitMock = jest.fn();
    const { result } = renderHook(() =>
      useInput({
        initialValue: "test",
        onSubmit: onSubmitMock,
      })
    );

    act(() => {
      result.current.onKeyDown({
        key: "Enter",
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(onSubmitMock).toHaveBeenCalledWith("test");
    expect(result.current.value).toBe("");
  });

  it("should not call onSubmit when Enter key is pressed but input is invalid", () => {
    const onSubmitMock = jest.fn();
    const { result } = renderHook(() =>
      useInput({
        initialValue: "",
        onSubmit: onSubmitMock,
      })
    );

    act(() => {
      result.current.onKeyDown({
        key: "Enter",
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should not call onSubmit when a key other than Enter is pressed", () => {
    const onSubmitMock = jest.fn();
    const { result } = renderHook(() =>
      useInput({
        initialValue: "test",
        onSubmit: onSubmitMock,
      })
    );

    act(() => {
      result.current.onKeyDown({
        key: "a",
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(result.current.value).toBe("test");
  });

  it("should use custom validator if provided", () => {
    const customValidator = (value: string) => value.length > 3;
    const { result } = renderHook(() =>
      useInput({
        initialValue: "abc",
        validator: customValidator,
      })
    );

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.onChange({
        target: { value: "abcd" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBe(true);
  });
});
