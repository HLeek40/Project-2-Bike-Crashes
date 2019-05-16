import json
import os
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy import Table, Column, Integer, String, MetaData
from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)

API_KEY = ""

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/buildDB/<db_user>/<db_passwd>/<key>")
def buildDB(db_user,db_passwd,key):
    API_KEY = key
    print(str(db_user) + " " + str(db_passwd) + " " + str(API_KEY))
    return API_KEY

if __name__ == "__main__":
    app.run()
