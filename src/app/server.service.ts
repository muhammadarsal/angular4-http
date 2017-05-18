import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {

	constructor(private http: Http) {}

	storeServers(servers: any[]) {
		const headers = new Headers({'Content-Type': 'application/json'})

		// return this.http.post('https://ng-http-4e08c.firebaseio.com/data.json',
		// 	servers,
		// 	{ headers: headers });

		return this.http.put('https://ng-http-4e08c.firebaseio.com/data.json',
			servers,
			{ headers: headers });

	}

	getServers() {
		return this.http.get('https://ng-http-4e08c.firebaseio.com/data.json')
			.map(
				(response: Response) => {
					/* do some transformation and return transformed data
					which gets wrapped into an observable by map operator */
					const data = response.json();
					for (const server of data) {
						server.name = 'FETCHED_' + server.name;
					}
					return data;
				}
			)
			.catch(
				(error: Response) => {
					// wrap the error in an observable so that it can be subscribed to.
					return Observable.throw(error);
				}
			);
	}

	// demonstrates the use of async pipe in app component
	getAppName() {
		return this.http.get('https://ng-http-4e08c.firebaseio.com/appName.json')
			.map(
				(response: Response) => {
					return response.json();
				}
			);
	}
}
