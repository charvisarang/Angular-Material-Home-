import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/";
  }

  getData(): Observable<productModel[]> {
    const url = this.baseUrl + "productData";
    return this.http.get<productModel[]>(url);
  }
  postData(data: productModel): Observable<productModel> {
    const url = this.baseUrl + "productData";
    return this.http.post<productModel>(url, data);
  }
  deleteData(id: number): Observable<productModel> {
    const url = this.baseUrl + "productData/" + id;
    return this.http.delete<productModel>(url);
  }
  updateData(id: number, data: productModel): Observable<productModel> {
    const url = this.baseUrl + "productData/" + id;
    return this.http.put<productModel>(url, data);
  }
}
