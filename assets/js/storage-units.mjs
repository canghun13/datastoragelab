export const TB_BYTES = 1_000_000_000_000;
export const TIB_BYTES = 1_099_511_627_776;

export function tbToTib(tb) { return tb * TB_BYTES / TIB_BYTES; }
export function gbToTb(gb) { return gb / 1000; }
export function formatTb(value) { return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} TB`; }
export function formatTib(value) { return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} TiB`; }
