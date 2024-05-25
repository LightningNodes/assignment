import {formattedPrice, formatToIndianNumber,renderSymbolImage,shortenNumber} from './functions'

describe('Test functions', () => {
    it('formattedPrice', () => {
        expect(formattedPrice('123456')).toBe('₹1,23,456');
    });
    it('formatToIndianNumber', () => {
        expect(formatToIndianNumber('123456')).toBe('1,23,456');
    });
    it('shortenNumber', () => {
        expect(shortenNumber('219502.106')).toBe('2.195L');
    });
    it('renderSymbolImage with symbol name', () => {
        expect(renderSymbolImage('BTCINR')).toBe('https://pi42.com/_next/image?url=https://storage.googleapis.com/pi42-dev-static/contract-icons/btc.png&w=32&q=75');
    });
    it('renderSymbolImage with out symbol name ("")', () => {
        expect(renderSymbolImage('')).toBe('/crypto.png');
    });
});