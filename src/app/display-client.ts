import { IPalet } from './palet';

export class DisplayClient {
    'customerName': string;
    'streetName': string;
    'coordinate': string;
    'distance': string;
    'customerId': string;
    'palletes': IPalet[];

    constructor(
        _customerName: string,
        _streetName: string,
        _distance: string,
        _customerId: string,
        _palletes: [IPalet]
    ) {
        this.customerName = _customerName;
        this.streetName = _streetName;
        this.distance = _distance;
        this.customerId = _customerId;
        this.palletes = _palletes;
    }
}
