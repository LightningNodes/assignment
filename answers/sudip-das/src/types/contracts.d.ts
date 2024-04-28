export type T_Contract = {
    baseAssetVolume: string
    lastPrice:string
    marketPrice:string
    priceChangePercent:string
}

export type T_AllContracts = {
    [key: string]: T_Contract
}

export type T_ContractTable = {
    symbol: string
    lowPrice: string
    highPrice: string
} & T_Contract

export type T_HighLowPrice = {
    [key: string]: number
}