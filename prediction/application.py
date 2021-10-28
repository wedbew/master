from flask import Flask, request
from flask_cors import CORS, cross_origin
import joblib
import pandas as pd

rf = joblib.load("./static/RF_compressed.joblib")
application = Flask(__name__)
cors = CORS(application)
application.config['CORS_HEADERS'] = 'Content-Type'

@application.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    ad = pd.read_csv('./static/data-example.csv')
    ad[f"['l']_{request.args.get('location')}"] = 1
    ad[f"['b']_{request.args.get('buildingMaterial')}"] = 1
    ad[f"['w']_{request.args.get('windowType')}"] = 1
    ad[f"['c']_{request.args.get('constructionStatus')}"] = 1
    ad[f"['h']_{request.args.get('heatingType')}"] = 1
    ad[f"['t']_{request.args.get('buildingType')}"] = 1
    ad['advertiser_type']             = request.args.get('advertiserType')
    ad['distance']                    = request.args.get('distance')
    ad['m']                           = request.args.get('m')
    ad['rooms_num']                   = request.args.get('rooms')
    ad['market']                      = request.args.get('market')
    ad['floor_no']                    = request.args.get('floor')
    ad['build_year']                  = request.args.get('buildingYear')
    ad['telewizja kablowa']           = request.args.get('telewizja kablowa')
    ad['domofon / wideofon']          = request.args.get('domofon / wideofon')
    ad['balkon']                      = request.args.get('balkon')
    ad['piwnica']                     = request.args.get('piwnica')
    ad['winda']                       = request.args.get('winda')
    ad['internet']                    = request.args.get('internet')
    ad['rolety antywłamaniowe']       = request.args.get('rolety antywłamaniowe')
    ad['ogródek']                     = request.args.get('ogródek')
    ad['pom. użytkowe']               = request.args.get('pom. użytkowe')
    ad['telefon']                     = request.args.get('telefon')
    ad['garaż/miejsce parkingowe']    = request.args.get('garaż/miejsce parkingowe')
    ad['oddzielna kuchnia']           = request.args.get('oddzielna kuchnia')
    ad['drzwi / okna antywłamaniowe'] = request.args.get('drzwi / okna antywłamaniowe')
    ad['lodówka']                     = request.args.get('lodówka')
    ad['meble']                       = request.args.get('meble')
    ad['kuchenka']                    = request.args.get('kuchenka')
    ad['pralka']                      = request.args.get('pralka')
    ad['monitoring / ochrona']        = request.args.get('monitoring / ochrona')
    ad['zmywarka']                    = request.args.get('zmywarka')
    ad['piekarnik']                   = request.args.get('piekarnik')
    ad['taras']                       = request.args.get('taras')
    ad['teren zamknięty']             = request.args.get('teren zamknięty')
    ad['telewizor']                   = request.args.get('telewizor')
    ad['system alarmowy']             = request.args.get('system alarmowy')
    ad['klimatyzacja']                = request.args.get('klimatyzacja')
    ad['dwupoziomowe']                = request.args.get('dwupoziomowe')
    
    # print(json.dumps(ad.to_dict('dict')))
    # print(request.args)
    price = str(rf.predict(ad)[0])
        
    return price

if __name__ == '__main__':
    # from waitress import serve
    # serve(application, host="0.0.0.0", port=5000)
    application.run(debug=False, port=5000)