import { useState, useCallback } from "react";

export default function useQuantity(initialValue, min, max) {
  const [quantity, setQuantity] = useState(initialValue);

  const handlePlus = useCallback(() => {
    if (quantity < max) setQuantity(quantity + 1);
  }, [quantity, max]);

  const handleMinus = useCallback(() => {
    if (quantity > min) setQuantity(quantity- 1);
  }, [quantity, min]);

  const handleTypeQuantity = useCallback((value) => {
    let amount = Number(value);
    if (amount >= min && amount <= max) {
        setQuantity(amount);
      } else if (amount < min) {
        setQuantity(min);
      } else if (amount > max) {
        setQuantity(max);
      }

    setQuantity(amount);
  }, [min, max]);

  return {quantity, handleMinus, handlePlus, handleTypeQuantity};
}
