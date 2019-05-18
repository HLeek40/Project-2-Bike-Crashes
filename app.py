import json
import os
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy.ext.automap import automap_base
from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
import pymysql
from read_data import buildDB
from config import db_user, db_passwd, API_KEY, db_name, host, port

pymysql.install_as_MySQLdb()

app = Flask(__name__)

buildDB(db_user,db_passwd)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://{}:{}@{}:{}/{}'.format(db_user,db_passwd,host,port,db_name)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
Base = automap_base()
Base.prepare(db.engine, reflect=True)

Crash_Records = Base.classes.crash_records

@app.route("/")
def index():
    recs = db.session.query(Crash_Records).all()
    outList = []
    for i in recs:
        tmp_dict = {}
        tmp_dict['LAT'] = i.lat
        tmp_dict['LON'] = i.lon
        outList.append(tmp_dict)
    #return render_template('index.html')
    return jsonify(outList)
    
if __name__ == "__main__":
    app.run()
