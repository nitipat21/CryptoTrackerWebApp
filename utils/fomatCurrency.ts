const formatMoney = (number:number) => {
    return number.toLocaleString('en-US', { style: 'currency', currency: "aud" });
};

export default formatMoney;