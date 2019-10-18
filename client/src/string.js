
export function capitalize(str) {
    // Return parameter string with first character capitalized.
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function oxford(arr) {
    return Array.isArray(arr) && arr.length > 1 ? arr
        .join(", ")
        .replace(/ ((?:.(?!, ))+)$/, ' and $1') : arr;
}