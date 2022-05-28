import requests
import datetime as DT
from flask import Flask, jsonify
from flask_caching import Cache

app = Flask(__name__)

config = {
    "DEBUG": True,          
    "CACHE_TYPE": "SimpleCache", 
    "CACHE_DEFAULT_TIMEOUT": 300
}
app.config.from_mapping(config)
cache = Cache(app)

@app.route('/api/data')
@cache.cached(timeout=3600)
def get_current_time():
  base_url = 'https://api.coincap.io/v2'
  n_cryptos = 7

  coincap_response = requests.get(f'{base_url}/assets?limit={n_cryptos}')
  currencies = coincap_response.json()['data']

  today = DT.datetime.now()
  one_week_ago = today - DT.timedelta(days=7)
  today = int(today.timestamp())*1000
  one_week_ago = int(one_week_ago.timestamp())*1000
  
  for currency in currencies:
    id = currency['id']
    histo_response = requests.get(f'{base_url}/assets/{id}/history?interval=h1&end={today}&start={one_week_ago}')
    currency['histo'] = histo_response.json()['data']

  return jsonify(currencies)