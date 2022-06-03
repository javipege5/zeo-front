import { Injectable } from '@angular/core';
import { Observable,EMPTY, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { error } from '@angular/compiler/src/util';
import { UserLogin } from '../models/UserLogin';
const headers = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};
const path =  environment.basePath;
const persistent = environment.persistent;


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: String, password: String): Observable<any> {
    const loginObj:UserLogin = { email:email, password:password };

    if(persistent) return this.loginAPI(loginObj);
    else return this.loginLocal(loginObj);
  }

  private loginAPI(loginObj:UserLogin): Observable<any> {
    return this.httpClient.post<any>(path + 'login', loginObj,headers);
  }

  private loginLocal(loginObj:UserLogin): Observable<any> {
    let users: User[];
    users =  JSON.parse(sessionStorage.getItem('users') || "[]");
    const u = users.find(u=>u.email === loginObj.email && u.password === loginObj.password);
    if(u){
      const res = {userName:u.name}
      return of(res);
    }else{
      const error = new Error();
      error.message = 'Email o contraseña incorrectos';
      return throwError(() => error );
    }
  }

  register( name:String, age:number,email: String, password: String): Observable<any> {
    const registerObj:User = {name:name, age:age , email:email, password:password };

    if(persistent) return this.registerAPI(registerObj)
    else return this.registerLocal(registerObj);
  }

  private registerAPI(registerObj:User): Observable<any> {
  
    return this.httpClient.post<any>(path + 'register', registerObj,headers);
  }

  private registerLocal(registerObj:User): Observable<any> {
    let users: User[];
    users =  JSON.parse(sessionStorage.getItem('users') || "[]");
    if(users.find(u=>u.email === registerObj.email)){
      const error = new Error();
      error.message = 'Este email ya existe en nuestra base de datos volátil';
      return throwError(() => error );
    }else{
      users.push(registerObj);
      sessionStorage.setItem('users',JSON.stringify(users));
      const res = {userName:registerObj.name}
      return of(res);
    }
  }

  checkUser(){
   return localStorage.getItem("user");
  }

  setUser(user:string,name:string){
    localStorage.setItem("user",user);
    localStorage.setItem("userName",name);
  }

  getUserName(){
    return localStorage.getItem("userName");
  }

  logout(){
    this.router.navigate(['login']);
    localStorage.removeItem("userName");
    localStorage.removeItem("user");
  }
}
