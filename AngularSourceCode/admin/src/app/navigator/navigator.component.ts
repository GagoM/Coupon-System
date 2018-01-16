import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  goCrazy = true;

  constructor(private service: AdminserviceService) { }

  ngOnInit() {
  }
  
  logout() {
    this.service.logout().subscribe(
      (res) => {
        console.log('bye bye .. :)')
      },
      (error) => { console.log('something went wrong...') }
    );
    window.location.href = '../././login/login.html';
  }
}
