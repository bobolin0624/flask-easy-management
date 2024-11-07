import os
import json
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '<p>Hello, World!</p>'
@app.route('/customer')
def customerList():
    return 'customer_list'

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
        'customer_name': customer,
        'ssh_ip': ssh_ip,
        'ssh_account': ssh_account,
        'ssh_password': ssh_password
    }

    json_file_path = './data/customer_data.json'

    jsonFormat = {
        'customer_lists': []
    }

    existing_data = read_json_file(json_file_path)
    if not existing_data:
        print('no data')
        jsonFormat['customer_lists'].append(create_data)
        # 'a' is append
        # dump 寫入本機 JSON file
        with open(json_file_path, 'a') as json_file:
                json.dump(jsonFormat, json_file)
                json_file.write('\n')
    else:
        print('have data')
        print('--------')
        print(existing_data)
        print('--------')
        # 找出 customer name
        customers = existing_data[0]['customer_lists']
        for customer in customers:
            print(customer)
            if customer['customer_name'] == create_data['customer_name']:
                return { 'msg': 'Warning: customer name already exists.' }, 200
            else:
                print('no dup name')
                # append 新的一筆
                customers.append(create_data)

                # w 覆寫文件
                with open(json_file_path, 'w') as json_file:
                    json.dump(existing_data, json_file)
                    json_file.write('\n')


    return jsonify(create_data), 201


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