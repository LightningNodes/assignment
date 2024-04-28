/**
 * Functions are used to perform a specific task.
 * @constant formattedPrice - to format the price to Indian currency
 * @constant formatToIndianNumber - to format the number to Indian number format
 * @constant shortenNumber - to shorten the number
 * @constant renderSymbolImage - to render the symbol image
 * @returns 
 */

export const formattedPrice = (price:string)=>{
    const formatPriceToNumber = parseInt(price)
    return formatPriceToNumber.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });
}

export const formatToIndianNumber = (number:string)=>{
    const parts = number.split('.')
    if (parts.length > 1) {
        return parseInt(parts[0]).toLocaleString('en-IN') + '.' + parts[1]
    }
    return parseInt(number).toLocaleString('en-IN')
}

export const shortenNumber = (number:string)=>{
    const num = parseFloat(number)
    if (num >= 10000000) {
        return (num / 10000000).toFixed(3) + 'Cr';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(3) + 'L';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(3) + 'K';
    } else {
        return num.toFixed(3);
    }
}


export const renderSymbolImage = (symbolName:string)=>{
    if(symbolName){
        const symbolNameLower = symbolName.replace(/INR/g, '').toLowerCase()
        return `https://pi42.com/_next/image?url=https://storage.googleapis.com/pi42-dev-static/contract-icons/${symbolNameLower}.png&w=32&q=75`
    }
    return '/crypto.png'
}