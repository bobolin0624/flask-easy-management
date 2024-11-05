import os
import json
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"
@app.route("/customer")
def customerList():
    return "customer_list"

@app.route('/home', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/create', methods=['POST'])
def create_customer():
    customer = request.form['customer']
    ssh_ip = request.form['ssh_ip']
    ssh_account = request.form['ssh_account']
    ssh_password = request.form['ssh_password']

    create_data = {
        "customer": customer,
        "ssh_ip": ssh_ip,
        "ssh_account": ssh_account,
        "ssh_password": ssh_password
    }

    json_file_path = './customer_data.json'

    existing_data = read_json_file(json_file_path)
    for entry in existing_data:
        print(entry)

    # 'a' is append
    # dump 寫入本機 JSON file
    with open(json_file_path, 'a') as json_file:
            json.dump(create_data, json_file)
            json_file.write('\n')
    
    return jsonify(data), 201


def read_json_file(file_path):
    try:
        with open(file_path, 'r') as json_file:
            data = [json.loads(line) for line in json_file]
        return data
    except FileNotFoundError:
        print("File not found. Please check the path.")
        return []
    except json.JSONDecodeError:
        print("Error decoding JSON. Please check the file format.")
        return []