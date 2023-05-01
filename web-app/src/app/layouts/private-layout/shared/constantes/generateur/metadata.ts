import { Icons } from "@shared/constantes/Icons";
import { SelectMetadata } from "@shared/models";
import { COMMON_TYPES_CODES } from "@shared/constantes/Constante";

export const tableProjet = {
  ref: "TableProjet",
  title: "Table des Projets",
  hasAdd: false, // true | false, default: true
  hasExport: false, // true | false, default: true
  columns: [
    {
      label: "Nom du Projet",
      key: "nomProjet",
      style: {
        "text-align": "center"

      }

    },

    {
      label: "Nom Application Back",
      key: "nomAppB",
      style: {
        "text-align": "center"

      }

    },
    {
      label: "Nom Application Front ",
      key: "nomAppF",
      style: {
        "text-align": "center"

      }

    },
    {
      label: "",
      key: "actions",
      type: "actions",
      style: {
        "text-align": "left"

      },
      sortable: false,
      btns: [

        Icons.details
      ]
    }


  ]
};

export const selectedLangue = <SelectMetadata>{
  label: "Langue",
  optionLabel: {
    ar: "labelLang",
    fr: "labelLang",
    en: "labelLang"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "keyLang"
};

export const typeCol = <SelectMetadata>{
  label: "Type du colonne",
  optionLabel: {
    ar: "key",
    fr: "key",
    en: "key"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "key"
};

export  const iconsMetadata= <SelectMetadata>{
  label: "Icon",
  optionLabel: {
    ar: "keyIcon",
    fr: "keyIcon",
    en: "keyIcon"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "valueIcon",


}

export const selectedLangues = <SelectMetadata>{
  label: "Langue",
  optionLabel: {
    ar: "labelLang",
    fr: "labelLang",
    en: "labelLang"


  },
  muliple:true,
  filter: true,
  tooltip: true,
  reset: false,
  value: "idLang",
  grouping: true

};



export const selectedMs = <SelectMetadata>{
  label: "Micro Service",
  optionLabel: {
    ar: "nomMs",
    fr: "nomMs",
    en: "nomMs"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "pathMs",
  emitedValue: "—"
};
export const selectedTab = <SelectMetadata>{
  label: "Table",
  optionLabel: {
    ar: "className",
    fr: "className",
    en: "className"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "",
  disabled: true
};

export const selectedOrient = <SelectMetadata>{
  label: "Orientation",
  optionLabel: {
    ar: "ex",
    fr: "ex",
    en: "ex"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "ex"
};


export const entityMetadata = <SelectMetadata>{
  label: "Attributs",
  optionLabel: {
    ar: "att",
    fr: "att",
    en: "att"


  },
  filter: false,
  tooltip: true,
  reset: false,
  value: "att"

};

export const controllerDetail= <SelectMetadata>{
  label: "Controlleurs",
  optionLabel: {
    ar: "className",
    fr: "className",
    en: "className"


  },
  filter: true,
  tooltip: true,
  reset: false,
  value: null,
  emitedValue:"—"

}

export const controllerMappingDetail= <SelectMetadata>{
  label: "Controlleurs",
  optionLabel: {
    ar: "valueController",
    fr: "valueController",
    en: "valueController"


  },
  filter: true,
  tooltip: true,
  reset: false,
  value: "valueController"

}



export const tableColonnes = {
  ref: "TableColonnes",
  title: "Table des Colonnes",
  hasAdd: true, // true | false, default: true
  hasExport: false, // true | false, default: true
  columns: [
    {
      label: "Définition et Langue",
      key: "key",
      style: {
        "text-align": "center"

      }
    }, {
      label: "Type du colonne",
      key: "type",
      style: {
        "text-align": "center"

      }
    },



  ]
};

