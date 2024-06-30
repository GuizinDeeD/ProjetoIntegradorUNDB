import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  remove(codigo: number) {
    throw new Error('Method not implemented.');
  }

  //URL da API
  private url:string = 'http://localhost:8080';
  
  //Construtor
  constructor(private http:HttpClient) { }



  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }


  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,obj);
  }


  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url,obj);
  }

  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/'+ codigo);
  }
}
