export const formatNumber = (number) => {
    const num = Number(number);
    if (isNaN(num)) return number;
    return num.toLocaleString('fr-FR').replace(/\s/g, '.');
}