import time
import requests
import datetime as DT
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/time')
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
    histo_response = requests.get(f'{base_url}/assets/{id}/history?interval=d1&end={today}&start={one_week_ago}')
    currency['histo'] = histo_response.json()['data']

  return jsonify(currencies)