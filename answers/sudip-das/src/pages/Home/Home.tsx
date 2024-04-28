import { useEffect, useState } from "react"
import { connectToPi42WebSocket, socket } from "../../utils/websocket/websocket"
import { T_AllContracts, T_ContractTable, T_HighLowPrice } from "../../types/contracts"
import styles from './Home.module.scss'
import { Spin, Table } from "antd"
import { useSearchParams } from "react-router-dom"
import { formatToIndianNumber, formattedPrice, renderSymbolImage, shortenNumber } from "../../utils/functions/functions"
import { TbBrandWhatsapp } from "react-icons/tb"
import GlimpseStat from "../../components/GlimpseStat"


const columns = [
    {
        title: 'Symbol Name',
        dataIndex: 'symbol',
        key: 'symbol',
        render: (text: string) => {
            return <div className={styles.symbol_name} data-testid="symbol-name">
                <img width="16" height="16" src={renderSymbolImage(text)} alt="icon" />
                {text}
            </div>
        }
    },
    {
        title: 'Last Price',
        dataIndex: 'lastPrice',
        key: 'lastPrice',
        render: (text: string) => {
            return <span data-testid="last-price">{formattedPrice(text)}</span>
        }
    },
    {
        title: '24H %',
        dataIndex: 'priceChangePercent',
        key: 'priceChangePercent',
        render: (text: string) => {
            return <span data-testid="price-percent" style={{ color: parseFloat(text) > 0 ? 'rgb(9, 174, 163)' : 'rgb(243, 117, 88)' }}>{text}%</span>
        },
        sorter: (a: T_ContractTable, b: T_ContractTable) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent),

    },
    {
        title: '24H Volume',
        dataIndex: 'baseAssetVolume',
        key: 'baseAssetVolume',
        render: (text: string) => {
            return <span data-testid="volume">{shortenNumber(text)}</span>
        }
    },
    {
        title: '24H Low',
        dataIndex: 'lowPrice',
        key: 'lowPrice',
        render: (lowestPrice: string) => {
            return <span>{formattedPrice(lowestPrice.toString())}</span>
        }
    },
    {
        title: '24H High',
        dataIndex: 'highPrice',
        key: 'highPrice',
        render: (highestPrice: string) => {
            return <span data-testid="high-price">{formattedPrice(highestPrice.toString())}</span>
        }
    },
    {
        title: 'Share',
        key: 'share',
        render: (_: unknown, allData: T_ContractTable) => {
            return <div data-testid="share" className={styles.share}>
                <TbBrandWhatsapp onClick={(e) => {
                    e.stopPropagation()
                    handleShare(allData)
                }} className={styles.whatsapp} />
            </div>
        }
    }
]


const handleShare = (contract: T_ContractTable) => {
    const shareContent = `Welcome to Pi42! Today's update on ${contract.symbol}.\nsymbol name: ${contract.symbol}\nlast price: ${formattedPrice(contract.lastPrice)}\n24 hour change percentage: ${contract.priceChangePercent}%\n24 hour volume: ${formatToIndianNumber(contract.baseAssetVolume)}\n24 hour high: ${formattedPrice(contract.highPrice)}\n24 hour low: ${formattedPrice(contract.lowPrice)}`;

    // Check if WhatsApp is supported, otherwise provide download option
    try {
        const url = `whatsapp://send?text=${encodeURIComponent(shareContent)}`;
        window.open(url, '_blank');
    } catch (error) {
        const blob = new Blob([shareContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pi42.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
}

export default function Home() {
    const [allContracts, setAllContracts] = useState<T_AllContracts>({} as T_AllContracts)
    const [highPrice, setHighPrice] = useState<T_HighLowPrice>({} as T_HighLowPrice)
    const [data, setData] = useState<T_ContractTable[]>([])
    const [lowPrice, setLowPrice] = useState<T_HighLowPrice>({} as T_HighLowPrice)
    const [searchParams, setSearchParams] = useSearchParams();
    const symbol = searchParams.get('symbol') ?? "" as string

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/auth'
    }
    useEffect(() => {
        connectToPi42WebSocket((data: T_AllContracts) => {
            setSearchParams({ symbol: symbol ? symbol : Object.keys(data)[0] })
            setAllContracts(data)
            Object.keys(data).forEach((symbol) => {
                setLowPrice((prev) => {
                    const d = prev[symbol]
                    return {
                        ...prev,
                        [symbol]: d ? Math.min(d, Math.abs(Math.trunc(((parseFloat(data[symbol]?.marketPrice) * Math.abs(parseFloat(data[symbol]?.priceChangePercent))) / 100) - parseFloat(data[symbol]?.marketPrice)))) : parseInt(data[symbol]?.marketPrice)
                    } as T_HighLowPrice
                })
                setHighPrice((prev) => {
                    const d = prev[symbol]
                    return {
                        ...prev,
                        [symbol]: d ? Math.max(d, Math.abs(Math.trunc(((parseFloat(data[symbol]?.marketPrice) * Math.abs(parseFloat(data[symbol]?.priceChangePercent))) / 100) + parseFloat(data[symbol]?.marketPrice)))): parseInt(data[symbol]?.marketPrice)
                    } as T_HighLowPrice
                })
            })
            
        })
    }, [setSearchParams, symbol])

    useEffect(() => {
        setData(Object.keys(allContracts).map((symbol) => {
            return {
                symbol,
                lowPrice: lowPrice[symbol].toString(),
                highPrice: highPrice[symbol].toString(),
                key: symbol,
                ...allContracts[symbol]
            }
        }))
    }, [highPrice, lowPrice,allContracts])
    return (
        <div className={styles.body_wrapper}>
            <div className={styles.header}>
                <div className={styles.header_top}>
                    <h1 className={styles.heading}>Welcome to Pi42!</h1>
                    <div data-testid="logout" className={styles.logout} onClick={handleLogout}>Logout</div>
                </div>
                <p className={styles.para}>Today's update on {symbol}.</p>
            </div>
            <div className={styles.body}>
                <div className={styles.table}>
                    <GlimpseStat symbol={symbol} allContracts={allContracts} lowPrice={lowPrice} highPrice={highPrice} />
                </div>
            </div>
            <div className={`${styles.body} ${styles.list}`}>
                <div className={styles.table}>
                    {socket.connected ?
                        <div data-testid="table">
                            <Table data-testid="data-table" columns={columns} dataSource={data}
                                pagination={false}
                                onRow={(record) => {
                                    return {
                                        onClick: () => {
                                            setSearchParams({ symbol: record.symbol })
                                        },
                                        className: symbol === record.symbol ? styles.selected : '',
                                    }
                                }}
                            />
                        </div>
                    :
                        <div data-testid="spinner">
                            <Spin rootClassName={styles.spinner} size="large" tip={
                                <p>Fetching data ...</p>
                            }>
                                <div className="content" />
                            </Spin>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
