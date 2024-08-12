export function formatNumWithCommas(number) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
}

export function twoDecimalPlaces(number) {
    return number.toFixed(2);
}

export function dateToString(date) {
    return new Date(date).toLocaleDateString();
}