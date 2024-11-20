import os
import json
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

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
    notes = request.form['notes']

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
        'minio_password': minio_password,
        'notes': notes
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
            if customer['customer_name'] == create_data['customer_name']:
                return { 'msg': 'Warning: customer name already exists.' }, 200
            
        customers.append(create_data)
        write_json_file(json_file_path, existing_data)

    # return render_template('index.html'), 200
    return redirect(url_for('home'))


@app.route('/edit', methods=['PATCH'])
def edit_customer():
    # customer name, key, value
    data = request.json
    customer = data['customer']
    key_to_update = data['keyname']
    new_value = data['inputValue']

    json_file_path = './data/customer_data.json'
    existing_data = read_json_file(json_file_path)
    customers = existing_data['customer_lists']

    for customerInJson in customers:
        if customerInJson['customer_name'] == customer:
            # 修改內容
            customerInJson[key_to_update] = new_value
            
    write_json_file(json_file_path, existing_data)
    return render_template('index.html'), 200


@app.route('/customer-list', methods=['GET'])
def get_customer_list():
    json_file_path = './data/customer_data.json'
    existing_data = read_json_file(json_file_path)
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