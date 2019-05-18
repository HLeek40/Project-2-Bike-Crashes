import json
import os
import sqlalchemy
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy import Table, Column, Integer, String, MetaData
import pymysql
pymysql.install_as_MySQLdb()

# gather user data for db username and passwd
# assuming localhost and standard port number (change if needed)

def buildDB(user,passwd):
    host = 'localhost'
    port = 3306

    # build mysql DB
    db_name = 'bike_crash_db'
    meta = MetaData()
    mysql_engine = create_engine('mysql://{}:{}@{}:{}'.format(user, passwd, host, port))

    #check to see if db exists, if so drop it and rebuild
    existing_databases = mysql_engine.execute("SHOW DATABASES;")
    existing_databases = [d[0] for d in existing_databases]

    if db_name in existing_databases:
        mysql_engine.execute("DROP DATABASE {};".format(db_name))
        mysql_engine.execute("CREATE DATABASE {};".format(db_name))
    else:
        mysql_engine.execute("CREATE DATABASE {};".format(db_name))

    #create engine to new db
    db_engine = create_engine("mysql://{}:{}@{}:{}/{}".format(user,passwd,host,port,db_name))

    crash_records = Table(
        'crash_records',meta,
        Column('id',Integer,primary_key=True),
        Column('crsh_sevri',String(100)),
        Column('rd_charact',String(100)),
        Column('crash_time',String(100)),
        Column('crash_year',String(100)),
        Column('county',String(100)),
        Column('crash_mont',String(100)),
        Column('rural_urba',String(100)),
        Column('bike_injur',String(100)),
        Column('bike_race',String(100)),
        Column('drvr_vehty',String(100)),
        Column('crash_type',String(100)),
        Column('bike_dir',String(100)),
        Column('city',String(100)),
        Column('workzone_i',String(100)),
        Column('locality',String(100)),
        Column('crashalcoh',String(100)),
        Column('excsspdind',String(100)),
        Column('bike_age',String(100)),
        Column('drvr_injury',String(100)),
        Column('drvr_alc_d',String(100)),
        Column('drvrage_gr',String(100)),
        Column('light_cond',String(100)),
        Column('drvr_sex',String(100)),
        Column('crashday',String(100)),
        Column('crash_grp',String(100)),
        Column('drvr_race',String(100)),
        Column('developmen',String(100)),
        Column('bike_pos',String(100)),
        Column('bike_sex',String(100)),
        Column('speed_limi',String(100)),
        Column('traff_cntr',String(100)),
        Column('rd_class',String(100)),
        Column('lat',String(100)),
        Column('lon',String(100)),
        Column('drvr_age',String(100)),
        Column('weather',String(100)),
        Column('num_units',Integer),
        Column('hit_run',String(100)),
        Column('drvr_estsp',String(100)),
        Column('rd_config',String(100)),
        Column('rd_feature',String(100))
    )

    # Create Table
    meta.create_all(db_engine)

    file = os.path.join('fred.geojson')

    with open(file) as f:
        k = json.load(f)

    for i in k['features']:
        db_engine.execute(crash_records.insert(),
            ambulancer=i['properties']['ambulancer'],
            rd_defects=i['properties']['rd_defects'],
            crsh_sevri=i['properties']['crsh_sevri'],
            rd_charact=i['properties']['rd_charact'],
            crash_time=i['properties']['crash_time'],
            crash_year=i['properties']['crash_year'],
            county=i['properties']['county'],
            crash_mont=i['properties']['crash_mont'],
            rural_urba=i['properties']['rural_urba'],
            bike_injur=i['properties']['bike_injur'],
            bike_race=i['properties']['bike_race'],
            drvr_vehty=i['properties']['drvr_vehty'],
            crash_type=i['properties']['crash_type'],
            bike_dir=i['properties']['bike_dir'],
            city=i['properties']['city'],
            workzone_i=i['properties']['workzone_i'],
            locality=i['properties']['locality'],
            crashalcoh=i['properties']['crashalcoh'],
            excsspdind=i['properties']['excsspdind'],
            bikeage_gr=i['properties']['bikeage_gr'],
            rd_feature=i['properties']['rd_feature'],
            bike_age=i['properties']['bike_age'],
            drvr_injur=i['properties']['drvr_injur'],
            drvr_alc_d=i['properties']['drvr_alc_d'],
            drvrage_gr=i['properties']['drvrage_gr'],
            light_cond=i['properties']['light_cond'],
            drvr_sex=i['properties']['drvr_sex'],
            crashday=i['properties']['crashday'],
            crash_grp=i['properties']['crash_grp'],
            drvr_race=i['properties']['drvr_race'],
            developmen=i['properties']['developmen'],
            bike_pos=i['properties']['bike_pos'],
            bike_sex=i['properties']['bike_sex'],
            speed_limi=i['properties']['speed_limi'],
            traff_cntr=i['properties']['traff_cntr'],
            rd_class=i['properties']['rd_class'],
            lat=i['properties']['geo_point_2d']['lat'],
            lon=i['properties']['geo_point_2d']['lon'],
            drvr_age=i['properties']['drvr_age'],
            weather=i['properties']['weather'],
            num_units=i['properties']['num_units'],
            rd_surface=i['properties']['rd_surface'],
            num_lanes=i['properties']['num_lanes'],
            hit_run=i['properties']['hit_run'],
            drvr_estsp=i['properties']['drvr_estsp'],
            rd_config=i['properties']['rd_config'])