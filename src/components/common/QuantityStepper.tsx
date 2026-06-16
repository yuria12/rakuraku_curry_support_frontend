type QuantityStepperProps = Readonly<{
  decrementDisabled?: boolean;
  onDecrement?: () => void;
  onIncrement?: () => void;
  value: number;
}>;

export function QuantityStepper({
  decrementDisabled = false,
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
      >
        -
      </button>
      <span>{value}</span>
      <button aria-label="数量を増やす" type="button" onClick={onIncrement}>
        +
      </button>
    </div>
  );
}
