import { render } from "@testing-library/react";
import GlimpseStat from "./GlimpseStat";

const mockPropsData = {
    symbol: 'BTCINR',
    allContracts: {
        BTCINR: {
            baseAssetVolume: '1000000',
            lastPrice: '50000',
            marketPrice: '50000',
            priceChangePercent: '10',
        }
    },
    lowPrice: {
        BTCINR: 48000
    },
    highPrice: {
        BTCINR: 52000
    }

}

describe('Test for GlimpseStat component', () => {
    it('should render correctly', () => {
        const { getByTestId } = render(<GlimpseStat {...mockPropsData} />)
        expect(getByTestId('glimpse')).not.toBeNull()
    })
    it('should render data in proper format', () => {
        const { getByTestId } = render(<GlimpseStat {...mockPropsData} />)
        expect(getByTestId('symbol').textContent).toBe('BTCINR')
        expect(getByTestId('last-price').textContent).toBe('₹50,000')
        expect(getByTestId('percentage').textContent).toBe('10%')
        expect(getByTestId('volume').textContent).toBe('10,00,000')
        expect(getByTestId('low-price').textContent).toBe('₹48,000')
        expect(getByTestId('high-price').textContent).toBe('₹52,000')
    })
})