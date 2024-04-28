/**
 * @typedef T_Contract - to store the contract details
 * @typedef T_ContractTable - to store the contract details in table format
 * @typedef T_HighLowPrice - to store the high and low price of the contract
 * @typedef T_AllContracts - to store all the contract details
 */

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