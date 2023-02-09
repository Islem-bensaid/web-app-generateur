import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { Icons } from '@shared/constantes/Icons';

export const DocumentsMetadata = {
  filtreFicheListDocuments: {
    form: {
      controls: [
        {
          key: 'numDoc',
          label: 'documents.details.filtre.form.labels.numDoc',
          criteriaSearch: {
            specificSearch: 'upper_like'
          }
        },
        // {
        //   key: 'idNmTypeDoc',
        //   label: 'general.add_doc_dialog.content.form.labels.typeDoc'
        // },
        {
          key: 'nomFichier',
          label: 'documents.details.filtre.form.labels.numDoc',
          criteriaSearch: {
            specificSearch: 'upper_like'
          }
        },
        {
          key: 'createdAtAfter',
          label: 'documents.details.filtre.form.labels.numDoc',
          type: COMMON_TYPES_CODES.DATE,
          criteriaSearch: {
            key: 'createdAt',
            specificSearch: '>='
          }
        },
        {
          key: 'createdAtBefore',
          label: 'documents.details.filtre.form.labels.numDoc',
          type: COMMON_TYPES_CODES.DATE,
          criteriaSearch: {
            key: 'createdAt',
            specificSearch: '<='
          }
        }
      ]
    }
  },
  tableListDocuments: (title= '')=>{
    return  {
      ref: 'TableListDocuments',
      title: `documents.details.tableListDocuments.titles.${title}`,
      hasAdd: true, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      paginationPageSize: 10, // default: 10
      paginationPageIndex: 0, // default: 0
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: 'documents.details.tableListDocuments.columns.numDoc',
          key: 'numDoc',
          style: {
            width: '10%',
            padding: '0 5px'
          },
          export: {
            width: '10%',
            alignment: 'center'
          }
        },
        {
          label: 'documents.details.tableListDocuments.columns.createdAt',
          key: 'createdAt',
          type: COMMON_TYPES_CODES.DATE,
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '10%',
            alignment: 'center'
          }
        },
        {
          label: 'documents.details.tableListDocuments.columns.nomFichier',
          key: 'nomFichier',
          style: {
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: '',
          key: 'actions',
          type: 'actions',
          style: {
            'text-align': 'center',
            width: '6%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            Icons.edit,
            Icons.delete,
            // Icons.details,
            Icons.download
          ]
        }
      ]
    }
  },
  ficheInfoProjet: {
    title: 'general.base_info',
    ref: 'ficheInfoProjet',
    columns: [
      {
        label: 'gp.ap.formAddProject.labels.code',
        key: 'code'
      },
      {
        label: 'gp.ap.formAddProject.labels.name',
        key: 'name'
      },
      {
        label: 'gp.5d.ficheProject5DDetails.ficheInfoProjet.columns.createdAt',
        key: 'createdAt',
        type: COMMON_TYPES_CODES.DATE
      },
      {
        label: 'gp.5d.ficheProject5DDetails.ficheInfoProjet.columns.idProjectPrimavera',
        key: 'idProjectPrimavera'
      },
      {
        label: 'gp.ap.formAddProject.labels.location',
        key: 'location'
      }
    ]
  }
};
