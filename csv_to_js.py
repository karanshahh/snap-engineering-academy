import csv
import json


def read_csv(filename):
    data = []
    with open(filename, "r", newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data


def write_js(data, output_file):
    with open(output_file, "w") as jsfile:
        jsfile.write("export const ufcFighterData = ")
        json.dump(data, jsfile, indent=2)
        jsfile.write(";\n")


def main():
    csv_file = "ufc_fighter_with_images_new.csv" 
    js_file = "data.js"

    data = read_csv(csv_file)
    write_js(data, js_file)


if __name__ == "__main__":
    main()
