export interface IDeliveredPalToClient {
    'statusHistories': [{
        'palletStatus': string,
        'coordinates': string,
        'userDeliveryTask': {
            'palletId': number;
        }
    }
    ];
    'routeStatus': {
       'returnImage': string,
       'signature': string,
       'comments': string,
       'routeId': number;
       'sumReturn': number;
    };
}
