import { COMMON_Filter_TYPES } from "@shared/constantes/Constante";
import { type } from "os";

export const GestionProfilsMetadata = {
  tableGestionProfil: {
    ref: "tableGestionProfils",
    columns: [
      {
        label: "",
        key: "actions",
        type: "others",
        sortable: false
      },
      {
        label: "adm.gp.content.tableGp.code",
        key: "code"
      },
      {
        label: "adm.gp.content.tableGp.libelle",
        key: {
          fr: "libelleFr",
          ar: "libelleAr",
          en: "libelleEn"
        }
      },
      {
        label: "adm.gp.content.tableGp.role",
        key: "role"
      },
      {
        label: "adm.gp.content.tableGp.dtAjout",
        key: "dtAjout",
        type: "date"
      }
    ]
  },

  tableGestionProfils: {
    ref: "tableGestionProfils",
    columns: [

      {
        label: "adm.gp.content.tableGp.code",
        key: "code",
        export: {
          width: "20%",
          alignment: "left"
        }
      },
      {
        label: "adm.gp.content.tableGp.libelle",
        key: {
          fr: "libelleFr",
          ar: "libelleAr",
          en: "libelleEn"
        },
        export: {
          width: "*"
        }
      },
      {
        label: "adm.gp.content.tableGp.role",
        key: "role",
        export: {
          width: "  %",
          alignment: "left"
        }
      },
      {
        label: "adm.gp.content.tableGp.dtAjout",
        key: "dtAjout",
        type: "date",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "",
        key: "actions",
        type: "others",
        sortable: false
      }
    ]
  },
  ficheDetailsProfil: {
    ref: "ficheGestionProfils",
    title: "adm.gp.details",
    columns: [
      {
        label: "adm.gp.content.details.code",
        key: "code"
      },
      {
        label: "adm.gp.content.details.libelleFr",
        key: "libelleFr"
      },
      {
        label: "adm.gp.content.details.libelleAr",
        key: "libelleAr"
      },
      {
        label: "adm.gp.content.details.libelleEn",
        key: "libelleEn"
      },
      {
        label: "adm.gp.content.details.role",
        key: "role"
      },
      {
        label: "adm.gp.content.details.dtAjout",
        key: "dtAjout",
        type: "date"
      },
      {
        label: "adm.gp.content.details.dtMaj",
        key: "dtMaj",
        type: "datetime"
      },
      {
        label: "adm.gp.content.details.flgActif",
        key: "flgActif"
      },
      {
        label: "adm.gp.content.details.ordre",
        key: "ordre"
      }
    ]
  },
  ficheDetailsDocument: {
    ref: "ficheDetailsDocument",
    title: "adm.gp.detailsdoc",
    columns: [
      {
        label: "adm.gp.content.details.num",
        key: "numDoc"
      },
      {
        label: "adm.gp.content.details.type",
        key: "typeDocFr"
      },
      {
        label: "adm.gp.content.details.intitule",
        key: "nomFichier"
      },
      {
        label: "adm.gp.content.details.dtmaj",
        key: "dtMaj"
      }

    ]
  },
  labelsSearchFiltre: {
    code: "adm.gp.content.tableGp.code",
    libelle: "adm.gp.content.tableGp.libelle",
    role: "adm.gp.content.tableGp.role",
    dtAjoutBefore: "adm.gp.content.tableGp.dtAjoutBefore",
    dtAjoutAfter: "adm.gp.content.tableGp.dtAjoutAfter"

  },
  labelsSearchFiltreGestionUtilisateur: {
    login: "adm.gu.content.tableGu.login",
    matricule: "adm.gu.content.tableGu.matricule",
    orgFr: "adm.gu.content.tableGu.orgFr",
    isActif: "adm.gu.content.tableGu.isActif"

  },

  AddEditGestionProfil: {
    code: "adm.gp.content.details.code",
    libelleAr: "adm.gp.content.details.libelleAr",
    libelleFr: "adm.gp.content.details.libelleFr",
    libelleEn: "adm.gp.content.details.libelleEn",
    role: "adm.gp.content.details.role",
    dtAjout: "adm.gp.content.details.dtAjout",
    dtMaj: "adm.gp.content.details.dtMaj",
    flgActif: "adm.gp.content.details.flgActif",
    ordre: "adm.gp.content.details.ordre"


  },
  selectMetaDataEtatProfil: {
    label: "adm.gp.content.details.flgActif",
    optionLabel: "label",
    filter: false,
    tooltip: false,
    reset: false,
    value: "value"
  },
  selectDataEtatProdil: [
    {
      label: "adm.gu.addUser.status.actif",
      value: true
    },
    {
      label: "adm.gu.addUser.status.suspended",
      value: false
    }
  ],
  nmSexeList: [
    {
      "id": 1,
      "code": "M",
      "libelleAr": "Masculin",
      "libelleEn": "Male"
    },
    {
      "id": 2,
      "code": "F",
      "libelleAr": "Feminin",
      "libelleEn": "Female"
    }

    // {
    //   label: 'adm.gu.addUser.status.actif',
    //   value: true
    // },
    // {
    //   label: 'adm.gu.addUser.status.suspended',
    //   value: false
    // }
  ],
  selectMetaDataEtatlUser: {
    label: "adm.gp.content.details.flgActif",
    optionLabel: "label",
    filter: false,
    tooltip: true,
    reset: true,
    value: "value",
    emitedValue: "value"
  },
  selectMetaDataBailleur: {
    label: "adm.gp.content.details.flgActif",
    optionLabel: "label",
    filter: false,
    tooltip: true,
    reset: true,
    value: "value",
    emitedValue: "value"
  },

  AddEditGestionUtilisateurs: {
    nom: "adm.gu.content.details.name",
    prenom: "adm.gu.content.details.prenom",
    idNmSexe: "adm.gu.content.details.sexe",
    dtNaissance: "adm.gu.content.details.dateN",
    matricule: "adm.gu.content.details.matricule",
    mail: "adm.gu.content.details.mail",
    numTel: "adm.gu.content.details.phone",
    organisme: "adm.gu.content.details.organisme",
    login: "adm.gu.content.details.login",
    password: "adm.gu.content.details.mdp",
    confirmPassword: "adm.gu.content.details.cMdp",
    etatUser: "adm.gu.content.details.status",
    cin: "adm.gu.content.details.cin",
    isActif: "adm.gu.content.details.isActif",
    dtExpiration: "adm.gu.content.details.dtExpiration"


  },
  selectMetaDataSexeList: {
    label: "adm.gu.content.details.sexe",
    optionLabel: {
      fr: "libelleFr",
      ar: "libelleAr",
      en: "libelleEn"
    },
    filter: false,
    tooltip: true,
    reset: false,
    value: "id"
  },
  selectMetaDataOrganismeList: {
    label: "adm.gu.content.details.organisme",
    optionLabel: {
      fr: "libelleFr",
      ar: "libelleAr",
      en: "libelleEn"
    },
    filter: true,
    tooltip: true,
    reset: false,
    value: "id",
    emitedValue: "id"
  },
  tableGestionUtilisateur: {
    ref: "tableGestionUtilisateur",
    columns: [
      {
        label: "adm.gu.content.tableGu.login",
        key: "login",
        export: {
          width: "20%",
          alignment: "left"
        }
      },
      {
        label: "adm.gu.content.tableGu.nom",
        key: "nom",
        export: {
          width: "*"
        }
      },
      {
        label: "adm.gu.content.tableGu.isActif",
        key: {
          fr: "isActifFr",
          ar: "isActifAr",
          en: "isActifEn"
        },
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.gu.content.tableGu.dtAjout",
        key: "dt_ajout",
        type: "date",
        export: {
          width: "12%",
          alignment: "center"
        }
      },
      {
        label: "",
        key: "actions",
        type: "others",
        sortable: false
      }
    ]
  },
  ficheDetailsUtilisateur: {
    ref: "ficheDetailsUtilisateur",
    title: "adm.gu.details",
    columns: [
      {
        label: "adm.gu.content.details.login",
        key: "login"
      },
      // {
      //   label: 'adm.gu.content.details.cin',
      //   key: 'cin'
      // },
      {
        label: "adm.gu.content.details.nom",
        key: "nom"
      },
      {
        label: "adm.gu.content.details.sexe",
        key: {
          ar: "sexeStrAr",
          en: "sexeStrEn"
        }

      },
      // {
      //   label: 'adm.gu.content.details.organisme',
      //   key: {
      //     fr: 'orgFr',
      //     ar: 'orgAr',
      //     en: 'orgEn'
      //   }
      //
      // },
      {
        label: "adm.gu.content.details.mail",
        key: "mail"
      },
      {
        label: "adm.gu.content.details.dtNaissance",
        key: "dtNaissance",
        type: "date"
      },
      // {
      //   label: 'adm.gu.content.details.dtExpiration',
      //   key: 'dtExpiration',
      //   type: 'date'
      // },
      {
        label: "adm.gu.content.details.num_tel",
        key: "num_tel"
      },
      {
        label: "adm.gu.content.details.etatUser",
        key: "isActif"
      }
    ]
  },
  tableTracageAcces: {

    ref: "tableGestionProfils",
    columns: [

      {
        label: "adm.tda.content.table.login",
        key: "login",
        export: {
          width: "20%",
          alignment: "left"
        }
      },
      {
        label: "adm.tda.content.table.nomUser",
        key: "nomUser",
        export: {
          width: "20%",
          alignment: "left"
        }
      }, {
        label: "adm.tda.content.table.dateAuth",
        key: "dateAuth",
        type: "datetime",
        export: {
          width: "20%",
          alignment: "center"
        }
      }, {
        label: "adm.tda.content.table.ipAddress",
        key: "ipAddress",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tda.content.table.codeAccess",
        key: {
          fr: "codeAccess",
          ar: "codeAccessAr",
          en: "codeAccess"
        }
        ,
        export: {
          width: "20%",
          alignment: "center"
        }
      }
    ]
  },
  tableTracageAccesDetails: {
    title: "adm.tda.details",
    ref: "tableGestionProfils",
    columns: [
      {
        label: "adm.tda.content.table.login",
        key: "login",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tda.content.table.nomUser",
        key: "nomUser",
        export: {
          width: "20%",
          alignment: "center"
        }
      }, {
        label: "adm.tda.content.table.dateAuth",
        key: "dateAuth",
        type: "datetime",
        export: {
          width: "20%",
          alignment: "center"
        }
      }, {
        label: "adm.tda.content.table.ipAddress",
        key: "ipAddress",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tda.content.table.codeAccess",
        key: "codeAccess",
        export: {
          width: "20%",
          alignment: "center"
        }
      }
    ]
  },

  selectStatusReq: [
    {
      label: 'SUCCESS',
      value: "SUCCESS"
    },
    {
      label: "FAILED",
      value: "FAILED"
    }
  ],
  selectMetaDataEtatReq: {
    label: "adm.tda.content.table.codeAccess",
    optionLabel: "label",
    filter: false,
    tooltip: true,
    reset: true,
    value: "value",
    emitedValue: "value"
  },

  labelsSearchFiltreTDA: {
    login: "adm.tda.content.table.login",
    nomUser: "adm.tda.content.table.nomUser"
  },

  tableTracageDonnes: {
    ref: "tableTracageDonnes",
    columns: [
      {
        label: "adm.tdd.content.table.nomUser",
        key: "nomUser",
        export: {
          width: "20%",
          alignment: "left"
        }
      },
      {
        label: "adm.tdd.content.table.dateLog",
        key: "dateLog",
        export: {
          width: "10%",
          alignment: "center"
        },
        type: "datetime"
      },
      {
        label: "adm.tdd.content.table.nameService",
        key: "nameService",
        export: {
          width: "*",
          alignment: "center"
        }
      },
      {
        label: "adm.tdd.content.table.uri",
        key: "uri",
        export: {
          width: "20%",
          alignment: "left"
        }
      },
      {
        label: "adm.tdd.content.table.httpMethod",
        key: "httpMethod",
        export: {
          width: "10%",
          alignment: "center"
        }
      },
      {
        label: "adm.tdd.content.table.case_",
        key: {
          fr: "case_",
          ar: "case_Ar",
          en: "case_"
        },

        export: {
          width: "15%",
          alignment: "center"
        }
      }
    ]
  },

  tableTracageDonnesDetails: {
    ref: "tableTracageDonnes",
    title: "aaaaaa",
    columns: [
      {
        label: "adm.tdd.content.table.nomUser",
        key: "nomUser",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tdd.content.table.dateLog",
        key: "dateLog",
        export: {
          width: "20%",
          alignment: "center"
        },
        type: "datetime"
      },
      {
        label: "adm.tdd.content.table.nameService",
        key: "nameService",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tdd.content.table.uri",
        key: "uri",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tdd.content.table.httpMethod",
        key: "httpMethod",
        export: {
          width: "20%",
          alignment: "center"
        }
      },
      {
        label: "adm.tdd.content.table.case_",
        key: "case_",
        export: {
          width: "20%",
          alignment: "center"
        }
      }
    ]
  },
  labelsSearchFiltreTDD: {
    httpMethod: "adm.tdd.content.table.httpMethod",
    nomUser: "adm.tdd.content.table.nomUser",
    nameService: "adm.tdd.content.table.nameService"

  },

  selectDataService: [
    {
      label: "gateway-service",
      value: "gateway-service"
    },
    {
      label: "administration-service",
      value: "administration-service"
    },
    {
      label: "nomenclature-service",
      value: "nomenclature-service"
    }

  ],
  selectMetaDataService: {
    label: "adm.tdd.content.table.nameService",
    optionLabel: "label",
    filter: false,
    tooltip: true,
    reset: true,
    value: "value",
    emitedValue: "value"
  },
  selectDataReq: [
    {
      label: "POST",
      value: "POST"
    },
    {
      label: "GET",
      value: "GET"
    },
    {
      label: "DELETE",
      value: "DELETE"
    },
    {
      label: "PUT",
      value: "PUT"
    }

  ],
  selectMetaDataReq: {
    label: "adm.tdd.content.table.httpMethod",
    optionLabel: "label",
    filter: false,
    tooltip: true,
    reset: true,
    value: "value",
    emitedValue: "value"
  }
};


export const GestionPPTuneps = {
  filterPp: {

    title: "Project.ts",

    fields: [{
      label: "N°PP",
      key: {
        ar: "ppAr",
        fr: "ppFr",
        en: "ppEn"
      },
      // style:{
      //   color:'blue',
      //
      // },
      type: COMMON_Filter_TYPES.Text,


    },
      {
        label: "Date",
        key: "date",
        type: COMMON_Filter_TYPES.DATE,
        criteriaSearch: {
          key:'dateS',
          specificSearch: '>='
        }
      },
      {
        label: "Select",
        key: "select",
        type: COMMON_Filter_TYPES.SELECT,
        criteriaSearch: {
          specificSearch: 'upper_like'
        },
        selectOptions: [
          {
            label: "Option Select 1",
            value: "Option Select 1"
          },
          {
            label: "Option Select 2",
            value: "Option Select 2"
          },
          {
            label: "Option Select 3",
            value: "nOption Select 3"
          }

        ],
        selectMetaData: {
          label: "Select Option",
          optionLabel: "label",
          filter: false,
          tooltip: true,
          reset: true,
          value: "value",
          emitedValue: "value"
        }

      },
      {
        label: "Select2",
        key: "select2",
        type: COMMON_Filter_TYPES.SELECT,
        criteriaSearch: {
          specificSearch: 'upper_like'
        },
        selectOptions: [
          {
            label: "Option Select2 1",
            value: "Option Select2 1"
          },
          {
            label: "Option Select2 2",
            value: "Option Select2 2"
          },
          {
            label: "Option Select2 3",
            value: "nOption Select2 3"
          }

        ],
        selectMetaData: {
          label: "Select Option2 ",
          optionLabel: "label",
          filter: false,
          tooltip: true,
          reset: true,
          value: "value",
          emitedValue: "value"
        }

      }

    ]


  }
};
