import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    FicheGestionProfilsComponent
} from '@privateLayout/features/administration/gestionProfils/fiche-gestion-profils/fiche-gestion-profils.component';
import {
    DetailsGestionProfilsComponent
} from "@privateLayout/features/administration/gestionProfils/fiche-gestion-profils/details-gestion-profils/details-gestion-profils.component";
import {
    AjoutModifGestionProfilsComponent
} from "@privateLayout/features/administration/gestionProfils/fiche-gestion-profils/ajout-modif-gestion-profils/ajout-modif-gestion-profils.component";
import {
    FicheGestionUtilisateurComponent
} from "@privateLayout/features/administration/gestionUtilisateur/fiche-gestion-utilisateur/fiche-gestion-utilisateur.component";
import {
    DetailsFicheUtilisateurComponent
} from "@privateLayout/features/administration/gestionUtilisateur/fiche-gestion-utilisateur/details-fiche-utilisateur/details-fiche-utilisateur.component";
import {
    AjoutModifierFicheUtilisateurComponent
} from "@privateLayout/features/administration/gestionUtilisateur/fiche-gestion-utilisateur/ajout-modifier-fiche-utilisateur/ajout-modifier-fiche-utilisateur.component";
import {
    FicheTracageDesAccesComponent
} from "@privateLayout/features/administration/tracageDesAcces/fiche-tracage-des-acces/fiche-tracage-des-acces.component";
import {
    DetailsTracageDesAccesComponent
} from "@privateLayout/features/administration/tracageDesAcces/fiche-tracage-des-acces/details-tracage-des-acces/details-tracage-des-acces.component";
import {
    FicheTracageDesDonnesComponent
} from "@privateLayout/features/administration/TracageDesDonnees/fiche-tracage-des-donnes/fiche-tracage-des-donnes.component";
import {
    DetailTracageDesDonnesComponent
} from "@privateLayout/features/administration/TracageDesDonnees/fiche-tracage-des-donnes/detail-tracage-des-donnes/detail-tracage-des-donnes.component";

const routes: Routes = [
    {
        path: 'gp',
        data: {
            title: 'adm.gp.title',
            breadcrumb: 'adm.gp.title',
        },
        children: [
            {
                path: '',
                component: FicheGestionProfilsComponent,
            },
            {
                path: 'd/:id',
                component: DetailsGestionProfilsComponent,
                data: {
                    title: 'adm.gp.details',
                    breadcrumb: 'adm.gp.details',
                },
            },
            {
                path: 'edit/:id',
                component: AjoutModifGestionProfilsComponent,
                data: {
                    title: 'adm.gp.edit',
                    breadcrumb: 'adm.gp.edit',
                    type: 'e'
                },
            },
            {
                path: 'add',
                component: AjoutModifGestionProfilsComponent,
                data: {
                    title: 'adm.gp.add',
                    breadcrumb: 'adm.gp.add',
                    type: 'a'
                },
            },
        ]
    },
    {
        path: 'gu',
        data: {
            title: 'adm.gu.title',
            breadcrumb: 'adm.gu.title',
        },
        children: [
            {
                path: '',
                component: FicheGestionUtilisateurComponent,
            },
            {
                path: 'd/:id',
                component: DetailsFicheUtilisateurComponent,
                data: {
                    title: 'adm.gu.details',
                    breadcrumb: 'adm.gu.details',
                },
            },
            {
                path: 'edit/:id',
                component: AjoutModifierFicheUtilisateurComponent,
                data: {
                    title: 'adm.gu.edit',
                    breadcrumb: 'adm.gu.edit',
                    type: 'e'
                },
            },
            {
                path: 'add',
                component: AjoutModifierFicheUtilisateurComponent,
                data: {
                    title: 'adm.gu.add',
                    breadcrumb: 'adm.gu.add',
                    type: 'a'
                },
            },
        ]
    },

    {
        path: 'tda',
        data: {
            title: 'adm.tda.title',
            breadcrumb: 'adm.tda.title',
        },
        children: [
            {
                path: '',
                component: FicheTracageDesAccesComponent,
            },
            {
                path: 'd/:id',
                component: DetailsTracageDesAccesComponent,
                data: {
                    title: 'adm.tda.details',
                    breadcrumb: 'adm.tda.details',
                }

            }
        ]
    },

//tracage des données
    {
        path: 'tdd',
        data: {
            title: 'adm.tdd.title',
            breadcrumb: 'adm.tdd.title',
        },
        children: [
            {
                path: '',
                component: FicheTracageDesDonnesComponent,
            },
            {
                path: 'd/:id',
                component: DetailTracageDesDonnesComponent,
                data: {
                    title: 'adm.tdd.details',
                    breadcrumb: 'adm.tdd.details',
                }

            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
