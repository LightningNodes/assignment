// utils/formatting.ts

export const formatNumber = (num: string): string => {
    let [integer, decimal] = num.split('.');
    if (integer.length > 3) {
        const lastThree = integer.slice(-3);
        const rest = integer.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integer = `${rest},${lastThree}`;
    }
    return decimal ? `${integer}.${decimal}` : integer;
};