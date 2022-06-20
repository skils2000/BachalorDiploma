import os
import re
from tokenize import String
from xmlrpc.client import DateTime
from sentinelhub import SentinelHubRequest, DataCollection, MimeType, CRS, BBox, SHConfig, Geometry, bbox_to_dimensions
import psycopg2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from datetime import date, datetime, time, timedelta
import requests
from itertools import chain


class Item(BaseModel):
    id_field: int
    startdate: date
    enddate: date
    

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/AddContrastNdvi")
def Add_contrast_NDVI(item: Item):

    coords = ""

    r =requests.get('http://192.168.100.40:4002/api/Test/FieldNameForUser/1/')
    #print(r.json())
    for field in r.json():
        #print(field['id'])
        if(field['id'] ==item.id_field):
            coords = field['coordinates']



    str='' 
    #for i in row: 
    for i in coords:
        str=str+i 

    reg = re.compile('[":a-zA-Z\s|\[|\]]') 
    str = reg.sub('', str) #удаление букв и "" :

    coord = re.findall(r'\d+\.\d+', str) #поиск float и запись в массив с подстроками
    print(coord)

    for i in range(len(coord)):
        coord[i]=float(coord[i])

    #for i in range(len(coord)):
    #    if i%2:
            #1

    #    else:

    coord=list(chain(*(x for x in zip(coord[1::2], coord[::2]))))

    print(coord)
    arr = [[coord[i:i + 2] for i in range(0, len(coord), 2)]]
    print(arr)

    # Credentials
    config = SHConfig()
    config.sh_client_id = '05ffee69-1e03-49f6-a787-4ceaf84d5130'
    config.sh_client_secret = '4xdeMJ.,bZLBW.0t8Y!^bAGJV^Y;#J!@5+om(i6<'

    
    evalscript = """
    //VERSION=3

    function setup() {
    return {
        input: ["B02", "B03","B04", "B08"],
        output: { bands: 3 }
    };
    }

    function evaluatePixel(sample) {
    let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04)
        
    if (ndvi<-0.2) return [0,0,0]; 
    else if (ndvi<-0.1) return [1,0,0];
    else if (ndvi<0) return [0.5,0.6,0,0];
    else if (ndvi<0.1) return [0.4,0,0];
    else if (ndvi<0.2) return [1,1,0.2];
    else if (ndvi<0.3) return [0.8,0.8,0.2];
    else if (ndvi<0.4) return [0.4,0.4,0];
    else if (ndvi<0.5) return [0.2,1,1];
    else if (ndvi<0.6) return [0.2,0.8,0.8];
    else if (ndvi<0.7) return [0,0.4,0.4];
    else if (ndvi<0.8) return [0.2,1,0.2];
    else if (ndvi<0.9) return [0.2,0.8,0.2];
    else return [0,0.4,0];

    }
    """
    leng = len(arr[0])
    xmin=10000000.0
    xmax=0.0
    ymin=10000000.0
    ymax=0.0

    for i in range(leng):
        if(arr[0][i][0] > xmax):
            xmax = arr[0][i][0]
        if(arr[0][i][0]< xmin):
            xmin = arr[0][i][0]
        if(arr[0][i][1] > ymax):
            ymax = arr[0][i][1]
        if(arr[0][i][1]< ymin):
            ymin = arr[0][i][1]
    

    bbox = BBox(bbox= [xmin,ymin,xmax,ymax], crs=CRS.WGS84)
    geometry = Geometry(geometry={"type":"Polygon","coordinates":arr}, crs=CRS.WGS84)

    request = SentinelHubRequest(
        data_folder="satellitePhoto",
        evalscript=evalscript,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L2A,          
                time_interval=(item.startdate, item.enddate),
                other_args={"dataFilter": {"maxCloudCoverage": 17}}
                    
            ),
        ],
        responses=[
            SentinelHubRequest.output_response('default', MimeType.PNG),
        ],
        
        bbox=bbox,
        geometry=geometry,
        size = bbox_to_dimensions(bbox, resolution=1),
        config=config 
    )

    
    response = request.get_data(save_data = True, decode_data  = True)

    path = request.data_folder
    file_ext = r".png"

    dir = os.listdir(path)
    dir = [os.path.join(path, dirr) for dirr in dir]
    dir=(max(dir, key=os.path.getctime))
    arrPath = [d for d in os.listdir(dir) if d.endswith(file_ext)]
    p=arrPath[0]
    
    path=os.path.join(dir,p)

    path=os.path.abspath(path)
    print(path)

    return dir
    cursor.execute("INSERT INTO ndvi (ndvimap, id_field, startdate, enddate, type) VALUES(%s, %s, %s, %s,'contrast') ON CONFLICT (ndvimap) DO NOTHING",
     (path,item.id_field,item.startdate, item.enddate))
    conn.commit()

    conn.close() 
    return "ok" 



@app.post("/AddContrastNdviUpsampling")
def Add_contrast_NDVI_Upsampling(item: Item):

    coords = ""

    r =requests.get('http://192.168.100.40:4002/api/Test/FieldNameForUser/1/')
    #print(r.json())
    for field in r.json():
        #print(field['id'])
        if(field['id'] ==item.id_field):
            coords = field['coordinates']



    str='' 
    #for i in row: 
    for i in coords:
        str=str+i 

    reg = re.compile('[":a-zA-Z\s|\[|\]]') 
    str = reg.sub('', str) #удаление букв и "" :

    coord = re.findall(r'\d+\.\d+', str) #поиск float и запись в массив с подстроками

    for i in range(len(coord)):
        coord[i]=float(coord[i])

    arr = [[coord[i:i + 2] for i in range(0, len(coord), 2)]]

    # Credentials
    config = SHConfig()
    config.sh_client_id = '05ffee69-1e03-49f6-a787-4ceaf84d5130'
    config.sh_client_secret = '4xdeMJ.,bZLBW.0t8Y!^bAGJV^Y;#J!@5+om(i6<'

    
    evalscript = """
    //VERSION=3

    function setup() {
    return {
        input: ["B02", "B03","B04", "B08"],
        output: { bands: 3 }
    };
    }

    function evaluatePixel(sample) {
    let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04)
        
    if (ndvi<-0.2) return [0,0,0]; 
    else if (ndvi<-0.1) return [1,0,0];
    else if (ndvi<0) return [0.5,0.6,0,0];
    else if (ndvi<0.1) return [0.4,0,0];
    else if (ndvi<0.2) return [1,1,0.2];
    else if (ndvi<0.3) return [0.8,0.8,0.2];
    else if (ndvi<0.4) return [0.4,0.4,0];
    else if (ndvi<0.5) return [0.2,1,1];
    else if (ndvi<0.6) return [0.2,0.8,0.8];
    else if (ndvi<0.7) return [0,0.4,0.4];
    else if (ndvi<0.8) return [0.2,1,0.2];
    else if (ndvi<0.9) return [0.2,0.8,0.2];
    else return [0,0.4,0];

    }
    """
    leng = len(arr[0])
    xmin=10000000.0
    xmax=0.0
    ymin=10000000.0
    ymax=0.0

    for i in range(leng):
        if(arr[0][i][0] > xmax):
            xmax = arr[0][i][0]
        if(arr[0][i][0]< xmin):
            xmin = arr[0][i][0]
        if(arr[0][i][1] > ymax):
            ymax = arr[0][i][1]
        if(arr[0][i][1]< ymin):
            ymin = arr[0][i][1]
    

    bbox = BBox(bbox= [xmin,ymin,xmax,ymax], crs=CRS.WGS84)
    geometry = Geometry(geometry={"type":"Polygon","coordinates":arr}, crs=CRS.WGS84)

    request = SentinelHubRequest(
        data_folder="satellitePhoto",
        evalscript=evalscript,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L2A,          
                time_interval=(item.startdate, item.enddate),
                other_args={"dataFilter": {"maxCloudCoverage": 17},"processing": {"upsampling": "BILINEAR"}}
                    
            ),
        ],
        responses=[
            SentinelHubRequest.output_response('default', MimeType.PNG),
        ],
        
        bbox=bbox,
        geometry=geometry,
        size = bbox_to_dimensions(bbox, resolution=1),
        config=config 
    )

    
    response = request.get_data(save_data = True, decode_data  = True)

    path = request.data_folder
    file_ext = r".png"

    dir = os.listdir(path)
    dir = [os.path.join(path, dirr) for dirr in dir]
    dir=(max(dir, key=os.path.getctime))
    arrPath = [d for d in os.listdir(dir) if d.endswith(file_ext)]
    p=arrPath[0]
    
    path=os.path.join(dir,p)

    path=os.path.abspath(path)
    print(path)

    return dir
    cursor.execute("INSERT INTO ndvi (ndvimap, id_field, startdate, enddate, type) VALUES(%s, %s, %s, %s,'contrastUpsampling') ON CONFLICT (ndvimap) DO NOTHING",
     (path,item.id_field,item.startdate, item.enddate))
    conn.commit()

    conn.close() 
    return "ok" 



@app.post("/AddColorNdvi")
def Add_color_NDVI(item: Item):
    coords = ""

    r =requests.get('http://192.168.100.40:4002/api/Test/FieldNameForUser/1/')
    #print(r.json())
    for field in r.json():
        #print(field['id'])
        if(field['id'] ==item.id_field):
            coords = field['coordinates']


    str='' 
    #for i in row: 
    for i in coords:
        str=str+i 

    reg = re.compile('[":a-zA-Z\s|\[|\]]') 
    str = reg.sub('', str) #удаление букв и "" :

    coord = re.findall(r'\d+\.\d+', str) #поиск float и запись в массив с подстроками

    for i in range(len(coord)):
        coord[i]=float(coord[i])

    coord=list(chain(*(x for x in zip(coord[1::2], coord[::2]))))

    arr = [[coord[i:i + 2] for i in range(0, len(coord), 2)]]

    # Credentials
    config = SHConfig()
    config.sh_client_id = '05ffee69-1e03-49f6-a787-4ceaf84d5130'
    config.sh_client_secret = '4xdeMJ.,bZLBW.0t8Y!^bAGJV^Y;#J!@5+om(i6<'

    evalscript = """
    //VERSION=3

    function setup() {
    return {
        input: ["B02", "B03","B04", "B08"],
        output: { bands: 3 }
    };
    }

    function evaluatePixel(sample) {
    let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04)
    return colorBlend(ndvi, [0,0.5,1], [[1,1,1],[0,0.5,0],[0,0,0]]) 

    }
    """
 
    leng = len(arr[0])
    xmin=10000000.0
    xmax=0.0
    ymin=10000000.0
    ymax=0.0

    for i in range(leng):
        if(arr[0][i][0] > xmax):
            xmax = arr[0][i][0]
        if(arr[0][i][0]< xmin):
            xmin = arr[0][i][0]
        if(arr[0][i][1] > ymax):
            ymax = arr[0][i][1]
        if(arr[0][i][1]< ymin):
            ymin = arr[0][i][1]
    

    bbox = BBox(bbox= [xmin,ymin,xmax,ymax], crs=CRS.WGS84)
    geometry = Geometry(geometry={"type":"Polygon","coordinates":arr}, crs=CRS.WGS84)


    request = SentinelHubRequest(
        data_folder="satellitePhoto",
        evalscript=evalscript,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L2A,          
                time_interval=(item.startdate, item.enddate),
                other_args={"dataFilter": {"maxCloudCoverage": 17}}
                    
            ),
        ],
        responses=[
            SentinelHubRequest.output_response('default', MimeType.PNG),
        ],
        
        bbox=bbox,
        geometry=geometry,
        size = bbox_to_dimensions(bbox, resolution=1),
        config=config 
    )

    
    response = request.get_data(save_data = True, decode_data  = True)

    path = request.data_folder
    file_ext = r".png"

    dir = os.listdir(path)
    dir = [os.path.join(path, dirr) for dirr in dir]
    dir=(max(dir, key=os.path.getctime))
    arrPath = [d for d in os.listdir(dir) if d.endswith(file_ext)]
    p=arrPath[0]
    
    path=os.path.join(dir,p)

    path=os.path.abspath(path)
    print(dir)

    return dir
    cursor.execute("INSERT INTO ndvi (ndvimap, id_field, startdate, enddate, type) VALUES(%s, %s, %s, %s, 'color') ON CONFLICT (ndvimap) DO NOTHING",
     (path,item.id_field,item.startdate, item.enddate))
    conn.commit()

    conn.close() 
    return "ok"




@app.post("/AddColorNdviUpsampling")
def Add_color_NDVI_Upsampling(item: Item):
    
    coords = ""

    r =requests.get('http://192.168.100.40:4002/api/Test/FieldNameForUser/1/')
    #print(r.json())
    for field in r.json():
        #print(field['id'])
        if(field['id'] ==item.id_field):
            coords = field['coordinates']


    str='' 
    #for i in row: 
    for i in coords:
        str=str+i 

    reg = re.compile('[":a-zA-Z\s|\[|\]]') 
    str = reg.sub('', str) #удаление букв и "" :

    coord = re.findall(r'\d+\.\d+', str) #поиск float и запись в массив с подстроками

    for i in range(len(coord)):
        coord[i]=float(coord[i])

    arr = [[coord[i:i + 2] for i in range(0, len(coord), 2)]]

    # Credentials
    config = SHConfig()
    config.sh_client_id = '05ffee69-1e03-49f6-a787-4ceaf84d5130'
    config.sh_client_secret = '4xdeMJ.,bZLBW.0t8Y!^bAGJV^Y;#J!@5+om(i6<'

    evalscript = """
    //VERSION=3

    function setup() {
    return {
        input: ["B02", "B03","B04", "B08"],
        output: { bands: 3 }
    };
    }

    function evaluatePixel(sample) {
    let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04)
    return colorBlend(ndvi, [0,0.5,1], [[1,1,1],[0,0.5,0],[0,0,0]]) 

    }
    """
 
    leng = len(arr[0])
    xmin=10000000.0
    xmax=0.0
    ymin=10000000.0
    ymax=0.0

    for i in range(leng):
        if(arr[0][i][0] > xmax):
            xmax = arr[0][i][0]
        if(arr[0][i][0]< xmin):
            xmin = arr[0][i][0]
        if(arr[0][i][1] > ymax):
            ymax = arr[0][i][1]
        if(arr[0][i][1]< ymin):
            ymin = arr[0][i][1]
    

    bbox = BBox(bbox= [xmin,ymin,xmax,ymax], crs=CRS.WGS84)
    geometry = Geometry(geometry={"type":"Polygon","coordinates":arr}, crs=CRS.WGS84)


    request = SentinelHubRequest(
        data_folder="satellitePhoto",
        evalscript=evalscript,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L2A,          
                time_interval=(item.startdate, item.enddate),
                other_args={"dataFilter": {"maxCloudCoverage": 17},"processing": {"upsampling": "BILINEAR"}}
                    
            ),
        ],
        responses=[
            SentinelHubRequest.output_response('default', MimeType.PNG),
        ],
        
        bbox=bbox,
        geometry=geometry,
        size = bbox_to_dimensions(bbox, resolution=1),
        config=config 
    )

    
    response = request.get_data(save_data = True, decode_data  = True)

    path = request.data_folder
    file_ext = r".png"

    dir = os.listdir(path)
    dir = [os.path.join(path, dirr) for dirr in dir]
    dir=(max(dir, key=os.path.getctime))
    arrPath = [d for d in os.listdir(dir) if d.endswith(file_ext)]
    p=arrPath[0]
    
    path=os.path.join(dir,p)

    path=os.path.abspath(path)
    print(path)

    return dir
    cursor.execute("INSERT INTO ndvi (ndvimap, id_field, startdate, enddate, type) VALUES(%s, %s, %s, %s, 'colorUpsampling') ON CONFLICT (ndvimap) DO NOTHING",
     (path,item.id_field,item.startdate, item.enddate))
    conn.commit()

    conn.close() 
    return "ok"