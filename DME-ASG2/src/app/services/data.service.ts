import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface userImportData {
  id: string;
  userfirstname: string;
  userlastname: string;
  userid: string;
  useremail: string;
  userpassword: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private data = [];

  private url = 'https://student.amphibistudio.sg/10187403A/folder/generateUV.php?x=';

  constructor(private http: HttpClient) { }

  //http API
  getAll(){
    return this.http.get<[userImportData]>(this.url);
  }

  get(id: string){
    return this.http.get<[userImportData]>(this.url + '/' + id);
  }

  create(services: userImportData){
    return this.http.post(this.url, services);
  }

  update(services: userImportData, id: string){
    return this.http.put(this.url + '/' + id, services);
  }

  delete(id: string){

  }


// JSON API
  setData(id, data){
    this.data[id] = data;
  }

  getData(id){
    return this.data[id];
  }
}
