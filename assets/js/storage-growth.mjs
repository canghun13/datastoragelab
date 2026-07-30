export function compoundGrowth(current, ratePercent, years) { return current * (1 + ratePercent / 100) ** years; }
export function annualGrowth(current, amount, years) { return current + amount * years; }
export function withHeadroom(value, percent) { return value * (1 + percent / 100); }
