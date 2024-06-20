export function convertNumber(number) {
    let numberNaN = number.replace(",", ".");
    return numberNaN
}

export function checkNaN(number) {
    if (isNaN(number)) return false
    else return true;
}