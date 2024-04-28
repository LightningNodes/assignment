import styles from './GlimpseStat.module.scss'
import { formatToIndianNumber, formattedPrice, renderSymbolImage } from '../../utils/functions/functions'
import { T_AllContracts, T_HighLowPrice } from '../../types/contracts'

interface Props {
    symbol: string
    allContracts: T_AllContracts
    lowPrice: T_HighLowPrice
    highPrice: T_HighLowPrice

}

export default function GlimpseStat({symbol, allContracts, lowPrice, highPrice}:Props) {
    return (
        <div className={styles.data_wrapper} data-testid="glimpse">
            <div className={styles.prices}>
                <div className={styles.price_item}>
                    <p>Symbol Name</p>
                    <div className={styles.symbol_name}>
                        <img width="32" height="32" src={renderSymbolImage(symbol)} alt="icon" />
                        <p data-testid="symbol">{symbol}</p>
                    </div>
                </div>
                <div className={`${styles.price_item} ${styles.align_right}`}>
                    <p>Last Price (&#x20B9;)</p>
                    <p data-testid="last-price">{formattedPrice(allContracts[symbol]?.lastPrice ?? "0")}</p>
                </div>
            </div>
            <div className={styles.changes}>
                <div className={styles.left_data}>
                    <div className={styles.price_item}>
                        <p>24H Change %</p>
                        <p data-testid="percentage" style={{ color: parseFloat(allContracts[symbol]?.priceChangePercent ?? 0) > 0 ? 'rgb(9, 174, 163)' : 'rgb(243, 117, 88)' }}>{allContracts[symbol]?.priceChangePercent ?? 0}%</p>
                    </div>
                    <div className={styles.price_item}>
                        <p>24H Volume</p>
                        <p data-testid="volume">{formatToIndianNumber(allContracts[symbol]?.baseAssetVolume ?? "0")}</p>
                    </div>
                </div>
                <div className={styles.right_data}>
                    <div className={styles.price_item}>
                        <p>24H Low (&#x20B9;)</p>
                        <p data-testid="low-price">{formattedPrice(lowPrice[symbol]?.toString() ?? "0")}</p>
                    </div>
                    <div className={styles.price_item}>
                        <p>24H High (&#x20B9;)</p>
                        <p data-testid="high-price">{formattedPrice(highPrice[symbol]?.toString() ?? "0")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
