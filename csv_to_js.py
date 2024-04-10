import csv
import json

def read_csv(filename):
    data = []
    with open(filename, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

def write_js(data, output_file):
    with open(output_file, 'w') as jsfile:
        jsfile.write('export const ufcData = ')
        json.dump(data, jsfile, indent=2)
        jsfile.write(';\n')

def main():
    csv_file = 'ufc_fighter_tott.csv'  # Update with your CSV file path
    js_file = 'data.js'  # Name of the JavaScript file to generate

    data = read_csv(csv_file)
    write_js(data, js_file)

if __name__ == "__main__":
    main()
