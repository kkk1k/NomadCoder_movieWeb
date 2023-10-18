import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoin(json);
        setLoading(false);
      });
  }, []);
  const [value, setValue] = useState(0);
  const onchange = (event) =>{
    setValue(event.target.value)
  }
  const [money, getMoney] = useState(0);
  const changeMoney = (e) => getMoney(e.target.value);
  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? null : <h2>{coin.length}</h2>}

      {loading ? (
        <strong>Loading~</strong>
      ) : (
        <select onChange={changeMoney}>
          {coin.map((item, index) => (
            <option key={index} value={item.quotes.USD.price}>
              {item.name},({item.symbol}): ${(item.quotes.USD.price)} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <input value = {value} onChange={onchange} text="number" placeholder="write how much"></input>
      </div>
      <hr />
    
      <h2>{value === 0 ? "0" : value/money}</h2>
    </div>
  );
}

export default App;
