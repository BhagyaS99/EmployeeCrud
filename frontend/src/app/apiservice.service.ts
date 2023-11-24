import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiUrl="http://localhost:3000/employee";

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getAllUser():Observable<any>{
    return this.http.get(`${this.apiUrl}`).pipe(catchError(this.handleError));
  }

  createData(data:any):Observable<any>{
    console.log(data,'Data added')
    return this.http.post(`${this.apiUrl}`,data).pipe(catchError(this.handleError));
  }

  deleteData(id:any):Observable<any>{
    let ids=id;
    return this.http.delete(`${this.apiUrl}/${ids}`).pipe(catchError(this.handleError));
  }

  updateData(data:any,id:any):Observable<any>{
    let ids=id;
    return this.http.put(`${this.apiUrl}/${ids}`,data).pipe(catchError(this.handleError));
  }

  getSingleData(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.apiUrl}/${ids}`).pipe(catchError(this.handleError));
  }
}
