import requests
import datetime

webapp_url = 'https://a890-5-165-233-177.eu.ngrok.io'

def clearTables():
    res = requests.post(url=f'{webapp_url}/clean/delbase')
    with open('log_delbase.txt', 'a') as filename:
        filename.write(f'{res} - {datetime.datetime.now()}\n')

if __name__ == '__main__':
    clearTables()