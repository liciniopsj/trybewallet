const CURRENCIES_API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const response = await fetch(CURRENCIES_API_ENDPOINT);
  const data = await response.json();
  delete data.USDT;

  return data;
};

export default getCurrencies;
