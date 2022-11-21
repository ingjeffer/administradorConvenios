import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { finalize, Observable, tap, throwError } from "rxjs";

@Injectable()
export class GeneralInterceptorService implements HttpInterceptor {

    private _toastOptions = {
        timeOut: 3500,
        closeButton: true,
    };

    constructor(private _toastr: ToastrService, private _spinner: NgxSpinnerService) { }

    intercept(req: HttpRequest<any> | any, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('=== intercept ===');
        this._spinner.show();

        // const token = localStorage.getItem('token');

        let request = req;                

        // if (token) {
        //     request = req.clone({
        //         setHeaders: {
        //             authorization: `Bearer ${token}`
        //         }
        //     });
        // }

        return next.handle(request)
	    .pipe(
            finalize(() => {
                this._spinner.hide();
            }),
	        tap(event => {
	          if (event instanceof HttpResponse) {
	            console.log(event.status);
	            // console.log(event.body);
	            // console.log(event);
                console.log(request.method);
                if (event.status === 200 && request.method !== 'GET') {
                    this._toastr.success(
                        'La operación se ejecutó exitosamente', 
                        `Error ${event.status} - ${event.statusText}`,
                        this._toastOptions,
                    );
                }
	          }
	        }, err => {
	   			// http response status code
	          	console.log("----response----");
	          	console.error("status code:");
	          	console.error(err.status);
	          	console.error(err.message);
	          	console.log("--- end of response---");
                  this._toastr.error(
                    'Ocurrió un error en la operación', 
                    `Error ${err.status} - ${err.statusText}`,
                    this._toastOptions,
                );

                return throwError((err: any) => new Error(err));
	        })
	      );
    }

}