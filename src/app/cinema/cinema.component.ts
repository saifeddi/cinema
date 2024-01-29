import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';
import { tick } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  villes: any;
  cinemas: any;
  currentVille: any;
  currentCinema: string;
  salles: any;
  currentProjection: any;
  selectedTickets: any = [];
  displayForm = false;
  data:any={};
  constructor(private cinemaService: CinemaService) { }
  payForm:FormGroup
  ngOnInit() {

    this.cinemaService.getVilles()
      .subscribe(
        res => {
          this.villes = res//._embedded.villes
        },
        error => {
        }
      )
  }

  onGetCinema(ville) {
    this.currentVille = ville;
    this.salles = null
    this.cinemaService.getCinemas(ville)
      .subscribe(
        res => {

          this.cinemas = res//._embedded.cinemas
        },
        error => {
        }
      )
  }
  onGetSalle(cinema) {
    this.currentCinema = cinema
    this.cinemaService.getSalle(cinema)
      .subscribe(
        res => {

          this.salles = res//._embedded.salles ;
          this.salles._embedded.salles.forEach(salle => {


            this.cinemaService.getProjection(salle)
              .subscribe(
                res => {
                  salle.projections = res
                },
                error => {

                }
              )
          });
        },
        error => {

        }
      )
  }

  setProjection(salle) {
    return this.cinemaService.getProjection(salle)
      .subscribe(
        res => {
          salle.projects = res
        },
        error => {

        }
      )
  }
  onGetPlace(projection) {
    this.currentProjection = projection;
    this.cinemaService.getPlace(projection)
      .subscribe(
        res => {
          this.currentProjection.tickets = res._embedded.tickets;
          this.selectedTickets = [];
        },
        error => {

        }
      )
  }
  onSelectTicket(ticket) {
    console.log(ticket);
    
    if (!this.selectedTickets.includes(ticket.id)) {
      this.selectedTickets.push(ticket.id);

    } else {
      const selectedIndex = this.selectedTickets.indexOf(ticket.id);
      this.selectedTickets.splice(selectedIndex, 1);
    }
    this.displayForm = this.selectedTickets.length > 0

  }
  getBtnClass() {

  }
  onclickpayTicket() {
    this.data.tickets = this.selectedTickets
    this.cinemaService.payTicket(this.data)
    .subscribe(
      res => {
        this.data = {};
        this.selectedTickets = [] ;
         this.onGetPlace(this.currentProjection)
      },
      error => {
        alert('woooh')
      }
    )
    
  }
}
