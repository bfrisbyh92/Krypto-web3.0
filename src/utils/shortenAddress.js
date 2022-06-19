export const shortenAddress = (address) => {
    return `${address.slice(0,12)}...${address.slice(address.length - 7)}`
}