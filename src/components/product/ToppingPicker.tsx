"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import type { Topping } from "@/types/topping";

type ToppingPickerProps = Readonly<{
  toppings: Topping[];
}>;

export function ToppingPicker({ toppings }: ToppingPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedCount = selectedIds.length;

  function toggleTopping(topping: Topping) {
    const id = String(topping.id);

    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="topping-picker">
      <Button
        className="topping-picker__open"
        type="button"
        variant="secondary"
        onClick={() => setIsOpen(true)}
      >
        トッピングを選択
      </Button>
      <p className="topping-picker__summary">
        {selectedCount > 0
          ? `選択中：${selectedCount}件`
          : "トッピングは未選択です"}
      </p>

      {selectedIds.map((id) => (
        <input key={id} name="toppingIds" type="hidden" value={id} />
      ))}

      {isOpen ? (
        <div
          className="topping-picker__overlay"
          onPointerDown={() => setIsOpen(false)}
        >
          <section
            aria-labelledby="topping-picker-title"
            className="topping-picker__panel"
            role="dialog"
            aria-modal="true"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <h2 id="topping-picker-title">トッピングの変更</h2>

            <div className="topping-picker__list">
              {toppings.map((topping) => {
                const id = String(topping.id);
                const checked = selectedIds.includes(id);

                return (
                  <label className="topping-choice" key={topping.id}>
                    <input
                      checked={checked}
                      type="checkbox"
                      onChange={() => toggleTopping(topping)}
                    />
                    <span className="topping-choice__icon" aria-hidden="true">
                      {checked ? "✓" : "+"}
                    </span>
                    <span className="topping-choice__name">{topping.name}</span>
                    <span className="topping-choice__price topping-choice__price--m">
                      +¥{topping.priceM.toLocaleString()}
                    </span>
                    <span className="topping-choice__price topping-choice__price--l">
                      +¥{topping.priceL.toLocaleString()}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
