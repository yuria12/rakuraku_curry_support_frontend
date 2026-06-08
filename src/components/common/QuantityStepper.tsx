type QuantityStepperProps = Readonly<{
  value: number;
}>;

export function QuantityStepper({ value }: QuantityStepperProps) {
  return (
    <div className="quantity-stepper" aria-label="数量">
      <button aria-label="数量を減らす" type="button">
        -
      </button>
      <span>{value}</span>
      <button aria-label="数量を増やす" type="button">
        +
      </button>
    </div>
  );
}
