import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute, // Servicio que implementa la recogida de la URL activa
    private countriesService: CountriesService,
    private router: Router // Servicio para redirigir la url si no existe información del país
   ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ))
    )
    .subscribe( country => {

      if ( !country ) {
        return this.router.navigateByUrl('');
      }

      console.log('TENEMOS UN PAÍS');
      return this.country = country;


    });
  }
}
