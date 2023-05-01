import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { FicheGestionProfilsComponent } from './gestionProfils/fiche-gestion-profils/fiche-gestion-profils.component';
import { FiltreGestionProfilsComponent } from './gestionProfils/fiche-gestion-profils/filtre-gestion-profils/filtre-gestion-profils.component';
import { TableGestionProfilsComponent } from './gestionProfils/fiche-gestion-profils/table-gestion-profils/table-gestion-profils.component';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';
import {MatSortModule} from "@angular/material/sort";
import { DetailsGestionProfilsComponent } from './gestionProfils/fiche-gestion-profils/details-gestion-profils/details-gestion-profils.component';
import { AjoutModifGestionProfilsComponent } from './gestionProfils/fiche-gestion-profils/ajout-modif-gestion-profils/ajout-modif-gestion-profils.component';
import { FicheGestionUtilisateurComponent } from './gestionUtilisateur/fiche-gestion-utilisateur/fiche-gestion-utilisateur.component';
import { TableFicheUtilisateurComponent } from './gestionUtilisateur/fiche-gestion-utilisateur/table-fiche-utilisateur/table-fiche-utilisateur.component';
import { FiltreFicheUtilisateurComponent } from './gestionUtilisateur/fiche-gestion-utilisateur/filtre-fiche-utilisateur/filtre-fiche-utilisateur.component';
import { AjoutModifierFicheUtilisateurComponent } from './gestionUtilisateur/fiche-gestion-utilisateur/ajout-modifier-fiche-utilisateur/ajout-modifier-fiche-utilisateur.component';
import { DetailsFicheUtilisateurComponent } from './gestionUtilisateur/fiche-gestion-utilisateur/details-fiche-utilisateur/details-fiche-utilisateur.component';
import { TreeViewMenuComponent } from './gestionProfils/fiche-gestion-profils/tree-view-menu/tree-view-menu.component';
import { FicheTracageDesAccesComponent } from './tracageDesAcces/fiche-tracage-des-acces/fiche-tracage-des-acces.component';
import { TableTracageDesAccesComponent } from './tracageDesAcces/fiche-tracage-des-acces/table-tracage-des-acces/table-tracage-des-acces.component';
import { FiltreTracageDesAccesComponent } from "./tracageDesAcces/fiche-tracage-des-acces/filtre-tracage-des-acces/filtre-tracage-des-acces.component";
import { DetailsTracageDesAccesComponent } from './tracageDesAcces/fiche-tracage-des-acces/details-tracage-des-acces/details-tracage-des-acces.component';
import { FicheTracageDesDonnesComponent } from './TracageDesDonnees/fiche-tracage-des-donnes/fiche-tracage-des-donnes.component';
import { TableTracageDesDonnesComponent } from './TracageDesDonnees/fiche-tracage-des-donnes/table-tracage-des-donnes/table-tracage-des-donnes.component';
import { FiltreTracageDesDonnesComponent } from './TracageDesDonnees/fiche-tracage-des-donnes/filtre-tracage-des-donnes/filtre-tracage-des-donnes.component';
import { DetailTracageDesDonnesComponent } from './TracageDesDonnees/fiche-tracage-des-donnes/detail-tracage-des-donnes/detail-tracage-des-donnes.component';
import {MatTreeModule} from "@angular/material/tree";
import { FilterprjComponent } from './filterprj/filterprj.component';


@NgModule({
  declarations: [
    FicheGestionProfilsComponent,
    FiltreGestionProfilsComponent,
    TableGestionProfilsComponent,
    DetailsGestionProfilsComponent,
    AjoutModifGestionProfilsComponent,
    FicheGestionUtilisateurComponent,
    TableFicheUtilisateurComponent,
    FiltreFicheUtilisateurComponent,
    AjoutModifierFicheUtilisateurComponent,
    DetailsFicheUtilisateurComponent,
    TreeViewMenuComponent,
    FicheTracageDesAccesComponent,
    TableTracageDesAccesComponent,
    FiltreTracageDesAccesComponent,
    DetailsTracageDesAccesComponent,
    FicheTracageDesDonnesComponent,
    TableTracageDesDonnesComponent,
    FiltreTracageDesDonnesComponent,
    DetailTracageDesDonnesComponent,
    FilterprjComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    AppSharedModule,
    MatSortModule,
    MatTreeModule,
  ]
})
export class AdministrationModule { }
