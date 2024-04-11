import time

import pandas as pd
import requests
from bs4 import BeautifulSoup

df = pd.read_csv("ufc_fighter_with_images.csv")

base_url = "https://www.ufc.com/athlete/"

for index, row in df.iterrows():
    fighter_name = (
        row["FIGHTER"].lower().replace(" ", "-")
    )
    print(fighter_name)
    url = f"{base_url}{fighter_name}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    image_tag = soup.find("img", class_="hero-profile__image")

    print(image_tag)
    if image_tag and "src" in image_tag.attrs:
        df.at[index, "IMAGEURL"] = image_tag.attrs["src"]

    # time.sleep(1)  # Respect the crawl delay

df.to_csv("ufc_fighter_with_images_new.csv", index=False)
