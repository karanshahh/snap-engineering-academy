import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

df = pd.read_csv('path_to_your_csv_file.csv')

base_url = "https://www.ufc.com/athlete/"

for index, row in df.iterrows():
    fighter_name = row['FIGHTER'].lower().replace(' ', '-')  # Adjust this line to match the URL format
    url = f"{base_url}{fighter_name}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    image_tag = soup.find('img', class_='hero-profile__image')
    
    if image_tag and 'src' in image_tag.attrs:
        df.at[index, 'IMAGEURL'] = image_tag.attrs['src']

    time.sleep(15)  # Respect the crawl delay

df.to_csv('path_to_your_updated_csv_file.csv', index=False)
