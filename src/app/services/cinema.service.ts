import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
   url:string="http://localhost:8080/"
  constructor(private http: HttpClient) { }
  
  getVilles()
  {
    return  this.http.get(this.url+'villes'); 
  }
  getCinemas(ville:any){
    
    return  this.http.get(ville._links.cinemas.href)
            ; 
  }
  getSalle(cinema:any)
  {
    return  this.http.get(cinema._links.salles.href)
    ; 
  }
  getProjection(salle:any)
  {
    let link = salle._links.projections.href.replace("{","").replace("}","")+"=p1"
   return  this.http.get(link)
    ; 
  }
  getPlace(projection)
  {
    let link = projection._links.tickets.href.replace("{","").replace("}","")+"=t1"
    return  this.http.get(link)
    ; 
  }

  payTicket(data:any)
  {
    console.log(data);
    
    let link = this.url+"pay-ticket" ;
    return this.http.post(link,data)
  }
}
