import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CoinList } from "../cryptoAPI/api";
import { selectCurrencyState } from "../store/cryptoSlice";

const ResultTable = () => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;