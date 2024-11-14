import os
import json
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/create', methods=['POST'])
def create_customer():
    customer = request.form['customer']
    ssh_ip = request.form['ssh_ip']
    ssh_account = request.form['ssh_account']
    ssh_password = request.form['ssh_password']
    mongo_host = request.form['mongo_host']
    mongo_password = request.form['mongo_pwd']
    redis_host = request.form['redis_host']
    redis_password = request.form['redis_pwd']
    minio_host = request.form['minio_host']
    minio_password = request.form['minio_pwd']

    create_data = {
        'customer_name': customer,
        'ssh_ip': ssh_ip,
        'ssh_account': ssh_account,
        'ssh_password': ssh_password,
        'mongo_host': mongo_host,
        'mongo_password': mongo_password,
        'redis_host': redis_host,
        'redis_password': redis_password,
        'minio_host': minio_host,
        'minio_password': minio_password
    }

    json_file_path = './data/customer_data.json'

    jsonFormat = {
        'customer_lists': []
    }

    existing_data = read_json_file(json_file_path)

    if not existing_data:
        jsonFormat['customer_lists'].append(create_data)
        write_json_file(json_file_path, jsonFormat)   
    else:
        # 找出 customer name
        customers = existing_data['customer_lists']
        for customer in customers:
            print(customer)
            if customer['customer_name'] == create_data['customer_name']:
                return { 'msg': 'Warning: customer name already exists.' }, 200
            
        customers.append(create_data)
        print(customers)
        write_json_file(json_file_path, existing_data)

    return jsonify(create_data), 201

@app.route('/search', methods=['GET'])
def search_customer():
    args = request.args
    customer_name = args.get('customer_name')
    print(customer_name)
    json_file_path = './data/customer_data.json'
    existing_data = read_json_file(json_file_path)
    print(existing_data)
    return jsonify(existing_data), 200


def read_json_file(file_path):
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
        return data
    except FileNotFoundError:
        print("File not found. Please check the path.")
        return []
    except json.JSONDecodeError:
        print("Error decoding JSON. Please check the file format.")
        return []
    
def write_json_file(file_path, data):
    try:
        # dump 寫入本機 JSON file
        with open(file_path, 'w') as json_file:
                # indent 是換行縮排
                json.dump(data, json_file, indent=2)
                json_file.write('\n')
    except Exception as error:
        print('Error writing JSON:', error)