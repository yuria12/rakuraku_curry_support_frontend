import type { ButtonHTMLAttributes } from "react";

type QuantityStepperProps = Readonly<{
  decrementDisabled?: boolean;
  decrementButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  incrementButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  onDecrement?: () => void;
  onIncrement?: () => void;
  value: number;
}>;

export function QuantityStepper({
  decrementDisabled = false,
  decrementButtonProps,
  incrementButtonProps,
  onDecrement,
  onIncrement,
  value,
}: QuantityStepperProps) {
  return (
    <div className="quantity-stepper" aria-label="数量">
      <button
        aria-label="数量を減らす"
        disabled={decrementDisabled}
        type="button"
        onClick={onDecrement}
        {...decrementButtonProps}
      >
        -
      </button>
      <span aria-label={`現在の数量：${value}`}>{value}</span>
      <button
        aria-label="数量を増やす"
        type="button"
        onClick={onIncrement}
        {...incrementButtonProps}
      >
        +
      </button>
    </div>
  );
}
