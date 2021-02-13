import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface userImportData {
  userfirstname: string;
  userlastname: string;
  userid: string;
  useremail: string;
  userpassword: string;
  usercontactno: string;
}

export interface userfirstnameImportData {
  userfirstname: string;
}

export interface userlastnameImportData {
  userlastname: string;
}

export interface useremailImportData {
  useremail: string;
}

export interface userpasswordImportData {
  userpassword: string;
}

export interface usercontactnoImportData {
  usercontactno: string;
}

export interface carImportData {
  vehicleid: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private data = [];

  private url = 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2.php';
  private urlfn = 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2fn.php';
  private urlln = 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2ln.php';
  private urlcn = 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2cn.php';
  private urlpw = 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2pw.php';

  private vrl = 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am3.php';

  constructor(private http: HttpClient) { }

  //http API
  getAll(){
    return this.http.get<[userImportData]>(this.url);
  }

  get(userid: string){
    return this.http.get<[userImportData]>(this.url + '?userid=' + userid);
  }

  create(services: userImportData){
    return this.http.post(this.url, services);
  }

  update(services: userImportData, userid: string){
    return this.http.put(this.url + '?userid=' + userid, services);
  }

  updateUserfirstname(services: userfirstnameImportData, userid: string){
    return this.http.put(this.urlfn + '?userid=' + userid, services);
  }

  updateUserlastname(services: userlastnameImportData, userid: string){
    return this.http.put(this.urlln + '?userid=' + userid, services);
  }

  updateUseremail(services: useremailImportData, userid: string){
    return this.http.put(this.url + '?userid=' + userid, services);
  }

  updateUserpassword(services: userpasswordImportData, userid: string){
    return this.http.put(this.urlpw + '?userid=' + userid, services);
  }

  updateUsercontactno(services: usercontactnoImportData, userid: string){
    return this.http.put(this.urlcn + '?userid=' + userid, services);
  }

  vpdate(services: carImportData, userid: string){
    return this.http.put(this.vrl + '?userid=' + userid, services);
  }



// JSON API
  setData(id, data){
    this.data[id] = data;
  }

  getData(id){
    return this.data[id];
  }
}
