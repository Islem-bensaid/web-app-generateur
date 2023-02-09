import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { Icons } from '@shared/constantes/Icons';


export const PhotoReportsMetadata = {
  filtreFicheListMedia: {
    form: {
      controls: [
        {
          key: 'numDoc',
          label: 'media.pr/vr.details.filtreMedia.form.labels.numDoc',
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
          label: 'media.pr/vr.details.filtreMedia.form.labels.nomFichier',
          criteriaSearch: {
            specificSearch: 'upper_like'
          }
        },
        {
          key: 'createdAtAfter',
          label: 'media.pr/vr.details.filtreMedia.form.labels.createdAtAfter',
          type: COMMON_TYPES_CODES.DATE,
          criteriaSearch: {
            key: 'createdAt',
            specificSearch: '>='
          }
        },
        {
          key: 'createdAtBefore',
          label: 'media.pr/vr.details.filtreMedia.form.labels.createdAtBefore',
          type: COMMON_TYPES_CODES.DATE,
          criteriaSearch: {
            key: 'createdAt',
            specificSearch: '<='
          }
        }
      ]
    }
  },
  tableListMedias: (title= '')=>{
    return  {
      ref: 'TableListMedia',
      title: `media.pr/vr.details.tableListMedia.${title}`,
      hasAdd: true, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      paginationPageSize: 10, // default: 10
      paginationPageIndex: 0, // default: 0
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: 'media.pr/vr.details.tableListMedia.columns.numDoc',
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
          label: 'media.pr/vr.details.tableListMedia.columns.createdAt',
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
          label: 'media.pr/vr.details.tableListMedia.columns.nomFichier',
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
            Icons.openImage,
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

export const LiveCameraMetadata = {
  filterLiveCamera: {
    form: {
      controls: [
        {
          key: 'code',
          label: 'media.lc.content.liveCameraList.columns.code',
          criteriaSearch: {
            specificSearch: 'upper_like'
          }
        },
        {
          key: 'name',
          label: 'media.lc.content.liveCameraList.columns.label',
          criteriaSearch: {
            specificSearch: 'upper_like'
          }
        },
        {
          key: 'url',
          label: 'media.lc.content.liveCameraList.columns.url',
          criteriaSearch: {
            specificSearch: 'upper_like'
          }
        },
      ]
    }
  },
  liveCameraList: {
    ref: 'TableOfLiveCameras',
    title: 'media.lc.content.liveCameraList.title',
    hasAdd: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: true, // true | false, default: true
    hasFilter: true, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 10
    columns: [
      {
        label: 'media.lc.content.liveCameraList.columns.code',
        key: 'code',
        style: {
          width: '15%',
          padding: '0 5px'
        }
      },
      {
        label: 'media.lc.content.liveCameraList.columns.label',
        key: 'name',
        style: {
          padding: '0 5px'
        }
      },
      {
        label: 'media.lc.content.liveCameraList.columns.url',
        key: 'url',
        style: {
          width: '25%',
          padding: '0 5px'
        }
      },
      {
        label: '',
        key: 'actions',
        type: 'actions',
        style: {
          'text-align': 'center',
          width: '10%',
          padding: '0 5px'
        },
        sortable: false,
        btns: [
          Icons.edit,
          Icons.delete,
          Icons.camera
        ]
      }
    ]
  },
  liveCameraDialog: {
    form: {
      controls: [
        {
          key: 'code',
          label: 'media.lc.content.liveCameraList.columns.code',
          required: true
          //disabled:true
        },
        {
          key: 'name',
          label: 'media.lc.content.liveCameraList.columns.label',
          required: true
        },
        {
          key: 'url',
          label: 'media.lc.content.liveCameraList.columns.url',
          required: true
        },
      ]
    }


  },
  ficheInfoProjet: {
    title: "general.base_info",
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
  },


}
