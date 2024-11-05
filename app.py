from flask import Flask
app = Flask(__name__)

customers = []

@app.route("/")
def hello():
    return "Hello, World!"
@app.route("/customer")
def customerList():
    return "customer_list"
