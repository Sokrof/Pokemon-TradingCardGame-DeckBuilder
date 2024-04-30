import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf]
})
export class NavComponent{

  numDecks: number = 0; // Variable para almacenar el número de mazos

}

