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
    sel =[
        Crash_Records.crsh_sevri,
        Crash_Records.rd_charact,
        Crash_Records.county,
        Crash_Records.crash_mont,
        Crash_Records.rural_urba,
        Crash_Records.drvr_vehty,
        Crash_Records.crash_type,
        Crash_Records.bike_dir,
        Crash_Records.city,
        Crash_Records.rd_feature,
        Crash_Records.light_cond,
        Crash_Records.drvr_sex,
        Crash_Records.crashday,
        Crash_Records.crash_grp,
        Crash_Records.developmen,
        Crash_Records.bike_pos,
        Crash_Records.bike_sex,
        Crash_Records.traff_cntr,
        Crash_Records.rd_class,
        Crash_Records.weather,
        Crash_Records.rd_config
    ]
    results = db.session.query(*sel).all()
    word = []
    for rec in results:
        tmp_dict = {}
        for col in sel:
            colName = str(col).split('.')
            python = f'tmp_dict[colName[1]] = rec.{colName[1]}'
            exec(python)
        word.append(tmp_dict)
    words = jsonify(word)
    return render_template('index.html')

@app.route("/latling")
def get_latling():
    sel = [
        Crash_Records.lat,
        Crash_Records.lon,
        Crash_Records.city,
        Crash_Records.crash_type,
        Crash_Records.crsh_sevri
    ]
    results = db.session.query(*sel).all()
    latLing = []
    for rec in results:
        tmp_dict={}
        tmp_dict['lat'] = rec.lat
        tmp_dict['lon'] = rec.lon
        tmp_dict['city'] = rec.city
        tmp_dict['crash_type'] = rec.crash_type
        tmp_dict['crsh_sevri'] = rec.crsh_sevri
        latLing.append(tmp_dict)
    return jsonify(latLing)

if __name__ == "__main__":
    app.run()
