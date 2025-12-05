export const formatPrice = (price: number) =>
    `USD ${price.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    })}`