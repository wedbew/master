import cors from 'cors'
import express  from 'express'
import csv from 'csv-parser'
import fs from 'fs'
import distance from './distance.js';

const app = express()
const port = 3030
const adverts = [];
const coord = [];
const scatterArr = [];
const boxArr = [];
const distanceArr = [];

app.use(cors())

fs.createReadStream('db.csv')
  .pipe(csv())
  .on('data', (data) => {
    adverts.push(data);
  })
  .on('end', () => {
    home();
    parseCoord();
    parseScatterData();
    parseBoxPlot();
    distanceData();
    adId();
    predict();
  })

const home = () => {
  app.get('/', (req, res) => {
    res.send(adverts)
  });
}

const parseCoord = () => {
  adverts.forEach(ad => {
    const obj = {};
    Object.assign(obj, {id: ad.advertId}, { lat : ad.latitude }, { lng : ad.longitude })
    coord.push(obj)
  });
  coordinates();
}


const coordinates = () => {
  app.get('/coordinates', (req, res) => {
    res.send(coord)
  });
}

const distanceData = () => {
  const [lat1, lng1] = [52.408243, 16.934138];
  adverts.forEach(ad => {
    const obj = Object.assign(
      {}, 
      // {id: ad.advertId},
      {group: ad.market},
      {distance: Number.parseFloat(distance(lat1,lng1, ad.latitude, ad.longitude)).toFixed(4)},
      {price : (ad.price / ad.m).toFixed(2) },
    )
    distanceArr.push(obj)
  })
  distancePage();
}

const distancePage = () => {
  app.get('/distance', (req, res) => {
    res.send(distanceArr)
    console.log(distanceArr.length)
  });
}

const scatterData = () => {
  app.get('/scatter', (req, res) => {
    res.send(scatterArr);
    console.log(scatterArr.length)
  });
}

const parseScatterData = () => {
  adverts.forEach(ad => {
    if (ad.m < 250) {
      const obj = Object.assign(
        {}, 
        {group : ad.advertiser_type}, 
        {price : ad.price},
        {sqm: ad.m} 
      );
      scatterArr.push(obj);
    }
  });
  scatterData();
}

const boxPlot = () => {
  app.get('/box-plot', (req, res) => {
    res.send(boxArr);
    console.log(boxArr.length)
  });
}

const parseBoxPlot = () => {
  adverts.forEach(ad => {
      const obj = Object.assign(
        {}, 
        {group : (ad.construction_status == "") ? 'no-data' : ad.construction_status},
        {key : ad.market},
        // {group : ad.market},
        // {key : ad.construction_status},
        {value: +ad.price / +ad.m} 
      );
      boxArr.push(obj);
  });
  boxPlot();
}

const adId = () => {
  app.get('/:id', (req, res) => {
    const [id] = adverts.filter(ad => ad.id === req.params.id);
    res.send(id)
  });
}

const predict = () => {
  app.post('/predict', (req, res) => {
    // console.log(res.req.query)
    console.log(req)
  });
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

