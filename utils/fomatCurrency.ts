const formatMoney = (number:number, currency:string) => {
    return number.toLocaleString('en-US', { style: 'currency', currency: currency });
};

export default formatMoney;