import { Icons } from '@shared/constantes/Icons';
import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { Validators } from '@angular/forms';
import { CustomValidators } from '@shared/tools';
import { CHARTS_CODES, CHARTS_COLOR_SCHEMA } from '@shared/constantes/Constante';

export const ProjetMetadata = {
  ficheAddEditProjet: {
    form: {
      controls: [
        {
          key: 'code',
          label: 'gp.ap.formAddProject.labels.code',
          validators: [Validators.required]

        },
        {
          key: 'name',
          label: 'gp.ap.formAddProject.labels.name',
          validators: [Validators.required]
        },
        {
          key: 'location',
          label: 'gp.ap.formAddProject.labels.location'
          // required: true
        },
        {
          key: 'employer',
          label: 'gp.ap.formAddProject.labels.employer'
          // required: true
        },
        {
          key: 'consultant',
          label: 'gp.ap.formAddProject.labels.consultant'
          // required: true
        },
        {
          key: 'contractor',
          label: 'gp.ap.formAddProject.labels.contractor'
          // required: true
        },
        {
          key: 'contractType',
          label: 'gp.ap.formAddProject.labels.contractType'
          // required: true
        },
        {
          key: 'contractValue',
          label: 'gp.ap.formAddProject.labels.contractValue'
          // required: true
        },
        {
          key: 'builtUpArea',
          label: 'gp.ap.formAddProject.labels.builtUpArea'
          // required: true
        },
        {
          key: 'siteInstructionsNo',
          label: 'gp.ap.formAddProject.labels.siteInstructionsNo'
          // required: true
        },
        {
          key: 'variationOrdersNo',
          label: 'gp.ap.formAddProject.labels.variationOrdersNo'
          // required: true
        },
        {
          key: 'revisedContractValue',
          label: 'gp.ap.formAddProject.labels.revisedContractValue'
          // required: true
        },
        {
          key: 'commencementDate',
          label: 'gp.ap.formAddProject.labels.commencementDate'
          // required: true
        },
        {
          key: 'projectCompletion',
          label: 'gp.ap.formAddProject.labels.projectCompletion'
          // required: true
        },
        {
          key: 'projectDuration',
          label: 'gp.ap.formAddProject.labels.projectDuration'
          // required: true
        },
        {
          key: 'description',
          label: 'gp.ap.formAddProject.labels.description'
          // required: true
        },
        // {
        //   key: 'executiveReport',
        //   label: 'gp.ap.formAddProject.labels.executiveReport',
        //   // required: true
        // },
        {
          key: 'rvtSource'
        },
        {
          key: 'idProjectPrimavera',
          label: 'gp.ap.formAddProject.labels.primaveraProjectId'
          // required: true
        }
      ]
    },
    tableListImages: {
      ref: 'TableListImages',
      title: 'gp.ap.tableListProjectImages.title',
      hasAdd: true,// true | false, default: true
      hasPagination: true,// true | false, default: true
      paginationPageSize: 5, // default: 10
      paginationPageIndex: 0, // default: 1
      hasExport: false,// true | false, default: true
      hasFilter: false,// true | false, default: true
      columns: [
        {
          label: 'gp.ap.tableListProjectImages.columns.fileNm',
          key: 'name',
          style: {
            'padding': '0 5px'
          }
        },
        {
          label: '',
          key: 'actions',
          type: 'actions',
          style: {
            'text-align': 'center',
            'width': '6%',
            'padding': '0 5px'
          },
          sortable: false,
          btns: [
            Icons.openImage,
            Icons.download,
            Icons.delete
          ]
        }
      ]
    },
    tableListBimHubs: {
      ref: 'TableListBimHubs',
      title: 'gp.ap.tableListBimHubs.title',
      hasAdd: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: '',
          key: 'RadioCol1',
          type: 'hasRadioBtn',
          style: {
            'text-align': 'center',
            width: '6%',
            padding: '0 5px'
          },
          sortable: false
        },
        {
          label: 'gp.ap.tableListBimHubs.columns.id',
          key: 'id',
          style: {
            width: '40%',
            padding: '0 5px'
          },
          export: {
            width: '40%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListBimHubs.columns.name',
          key: 'name',
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
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            Icons.openIn
          ]
        }
      ]
    },
    tableListBimProjet: {
      ref: 'TableListBimProjet',
      title: 'gp.ap.tableBimProjets.title',
      hasAdd: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: '',
          key: 'RadioCol2',
          type: 'hasRadioBtn',
          style: {
            'text-align': 'center',
            width: '6%',
            padding: '0 5px'
          },
          sortable: false
        },
        {
          label: 'gp.ap.tableBimProjets.columns.id',
          key: 'id',
          style: {
            width: '40%',
            padding: '0 5px'
          },
          export: {
            width: '40%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableBimProjets.columns.name',
          key: 'name',
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
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            Icons.openIn
          ]
        }
      ]
    },
    tableListBimDocs: {
      ref: 'TableListBimDocs',
      title: 'gp.ap.tableListBimDocs.title',
      hasAdd: false, // true | false, default: true
      hasExport: false, // true | false, default: true
      hasPagination: false, // true | false, default: true
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: '',
          key: 'RadioCol3',
          type: 'hasRadioBtn',
          style: {
            'text-align': 'center',
            width: '6%',
            padding: '0 5px'
          },
          sortable: false
        },
        {
          label: 'gp.ap.tableListBimDocs.columns.id',
          key: 'id',
          style: {
            width: '25%',
            padding: '0 5px'
          },
          export: {
            width: '25%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListBimDocs.columns.folderName',
          key: 'folderName',
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '15%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListBimDocs.columns.name',
          key: 'name',
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
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            Icons.openIn
          ]
        }
      ]
    },
    tableListContacts: {
      ref: 'TableListContacts',
      title: 'gp.ap.tableListContacts.title',
      hasAdd: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      paginationPageSize: 5, // default: 10
      paginationPageIndex: 0, // default: 0
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: 'gp.ap.tableListContacts.columns.headshot',
          key: 'cImgAsB64',
          type: COMMON_TYPES_CODES.HAS_IMAGE,
          style: {
            width: '10%',
            padding: '0 5px'
          },
          export: {
            width: '25%',
            alignment: 'center'
          },
          sortable: false
        },
        {
          label: 'gp.ap.tableListContacts.columns.name',
          key: 'name',
          style: {
            width: '20%',
            padding: '0 5px'
          },
          export: {
            width: '25%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.title',
          key: 'title',
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '15%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.description',
          key: 'description',
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.mobile',
          key: 'mobile',
          style: {
            width: '13%',
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.email',
          key: 'email',
          style: {
            width: '15%',
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
            Icons.delete
          ]
        }
      ]
    },
    tableListExecutiveReports: {
      ref: 'TableListExecutiveReports',
      title: 'gp.ap.tableListExecutiveReports.title',
      hasAdd: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      // hasPagination: true, // true | false, default: true
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 0
      columns: [
        {
          label: 'gp.ap.tableListExecutiveReports.columns.report',
          key: 'report',
          style: {
            padding: '0 5px'
          }
        },
        {
          label: 'gp.ap.tableListExecutiveReports.columns.observation',
          key: 'observation',
          style: {
            width: '15%',
            padding: '0 5px'
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
            Icons.openImage
          ]
        }
      ]
    },
    addEditContactDialog: {
      form: {
        controls: [
          {
            key: 'name',
            label: 'gp.ap.tableListContacts.columns.name',
            validators: [Validators.required]
            //disabled:true
          },
          {
            key: 'title',
            label: 'gp.ap.tableListContacts.columns.title',
            validators: [Validators.required]
          },
          {
            key: 'description',
            label: 'gp.ap.tableListContacts.columns.description',
            validators: [Validators.required]
          },
          {
            key: 'mobile',
            label: 'gp.ap.tableListContacts.columns.mobile',
            validators: [Validators.required]
          },
          {
            key: 'email',
            label: 'gp.ap.tableListContacts.columns.email',
            validators: [Validators.required, CustomValidators.emailValidator()]
          }
        ]
      }


    },
    addEditExecutiveReport: {
      form: {
        controls: [
          {
            key: 'report',
            label: 'gp.ap.tableListExecutiveReports.columns.report',
            required: true
            //disabled:true
          },
          {
            key: 'observation',
            label: 'gp.ap.tableListExecutiveReports.columns.observation'
          }
        ]
      }


    }
  },
  ficheListProjet: {
    filtre: {
      form: {
        controls: [
          {
            key: 'code',
            label: 'gp.ap.formAddProject.labels.code'
          },
          {
            key: 'name',
            label: 'gp.ap.formAddProject.labels.name'
          },
          {
            key: 'location',
            label: 'gp.ap.formAddProject.labels.location'
          }
        ]
      }
    },
    tableListMesProjet: {
      ref: 'TableListProjet',
      title: 'gp.lp.content.tableListeProjet.title',
      hasAdd: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false,
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      columns: [
        {
          label: 'gp.lp.content.tableListeProjet.columns.code',
          key: 'code',
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
          label: 'gp.lp.content.tableListeProjet.columns.name',
          key: 'name',
          style: {
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: 'gp.lp.content.tableListeProjet.columns.location',
          key: 'location',
          style: {
            width: '30%',
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
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            Icons.details,
            Icons.edit,
            Icons.delete
          ]
        }
      ]
    },
    tableListProjet: {
      ref: 'TableListProjet',
      title: 'gp.lp.content.tableListeProjet.title',
      hasAdd: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false,
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: 'gp.lp.content.tableListeProjet.columns.code',
          key: 'code',
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
          label: 'gp.lp.content.tableListeProjet.columns.name',
          key: 'name',
          style: {
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: 'gp.lp.content.tableListeProjet.columns.location',
          key: 'location',
          style: {
            width: '30%',
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
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            Icons.details
          ]
        }
      ]
    }
  },
  ficheDetailProjet: {
    ficheBaseInoProjet: {
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
    },
    ficheBriefInfoProjet: {
      ref: 'ficheInfoProjet',
      classList: {
        card: 'p-0'
      },
      columns: [
        {
          label: 'gp.ap.formAddProject.labels.employer',
          key: 'employer'
        },
        {
          label: 'gp.ap.formAddProject.labels.consultant',
          key: 'consultant'
        },
        {
          label: 'gp.ap.formAddProject.labels.contractor',
          key: 'contractor'
        },
        {
          label: 'gp.ap.formAddProject.labels.contractType',
          key: 'contractType'
        },
        {
          label: 'gp.ap.formAddProject.labels.contractValue',
          key: 'contractValue'
        },
        {
          label: 'gp.ap.formAddProject.labels.revisedContractValue',
          key: 'revisedContractValue'
        },
        {
          label: 'gp.ap.formAddProject.labels.builtUpArea',
          key: 'builtUpArea'
        },
        {
          label: 'gp.ap.formAddProject.labels.siteInstructionsNo',
          key: 'siteInstructionsNo'
        },
        {
          label: 'gp.ap.formAddProject.labels.variationOrdersNo',
          key: 'variationOrdersNo'
        },
        {
          label: 'gp.ap.formAddProject.labels.commencementDate',
          key: 'commencementDate',
          type: COMMON_TYPES_CODES.DATE
        },
        {
          label: 'gp.ap.formAddProject.labels.projectCompletion',
          key: 'projectCompletion',
          type: COMMON_TYPES_CODES.DATE
        },
        {
          label: 'gp.ap.formAddProject.labels.projectDuration',
          key: 'projectDuration'
        }
      ]
    },
    tableListViewContacts: {
      ref: 'TableListViewContacts',
      title: 'gp.ap.tableListContacts.title',
      hasAdd: false, // true | false, default: true
      hasExport: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      paginationPageSize: 5, // default: 10
      paginationPageIndex: 0, // default: 0
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      columns: [
        {
          label: 'gp.ap.tableListContacts.columns.headshot',
          key: 'cImgAsB64',
          type: COMMON_TYPES_CODES.HAS_IMAGE,
          style: {
            width: '10%',
            padding: '0 5px'
          },
          export: {
            width: '25%',
            alignment: 'center'
          },
          sortable: false
        },
        {
          label: 'gp.ap.tableListContacts.columns.name',
          key: 'name',
          style: {
            width: '20%',
            padding: '0 5px'
          },
          export: {
            width: '25%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.title',
          key: 'title',
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '15%',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.description',
          key: 'description',
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.mobile',
          key: 'mobile',
          style: {
            width: '13%',
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        },
        {
          label: 'gp.ap.tableListContacts.columns.email',
          key: 'email',
          style: {
            width: '15%',
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          }
        }
      ]
    }
  },
  ficheDetailsProjet4D: {
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
    },
    'CPI&SPI': {
      title: 'CPI and SPI',
      chartType: CHARTS_CODES.LINE_CHART,
      colorScheme: CHARTS_COLOR_SCHEMA.CUSTOM_1,
      maxXAxisTickLength: 7,
      autoscale: false,
      xAxisLabel: 'Date',
      yAxisLabel: 'Value'
    }
  },
  ficheDetailsProjet5D: {
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
    },
    filtreListDetailProjetTasks: {
      form: {
        controls: [
          {
            key: 'taskCode',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.taskCode'
          },
          {
            key: 'taskName',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.taskName'
          },
          {
            key: 'plannedCost',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.plannedCost'
          },
          {
            key: 'actuelCost',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.actCost'
          },
          {
            key: 'startDate',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.targetStart'
          },
          {
            key: 'endDate',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.targetEnd'
          },
          {
            key: 'actuelStartDate',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.actStartDate'
          },
          {
            key: 'actuelEndDate',
            label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.actEndDate'
          }
        ]
      }
    },
    tableListDetailProjetTasks: {
      ref: 'TableListDetailProjetTasks',
      title: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.title',
      hasAdd: false, // true | false, default: true
      hasPagination: true, // true | false, default: true
      hasExport: false, // true | false, default: true
      hasFilter: false,
      // paginationPageSize: 5, // default: 10
      paginationPageIndex: 0, // default: 10
      exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
      editableDatatable: true,
      columns: [
        {
          label: '',
          key: 'checkingCol',
          type: 'hasCheckBox',
          style: {
            'text-align': 'center',
            width: '6%',
            padding: '0 5px'
          },
          sortable: false
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.taskCode',
          key: 'taskCode',
          style: {
            width: '12.%',
            padding: '0 5px'
          },
          sortable: false
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.taskName',
          key: 'taskName',
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          style: {
            width: '20%',
            padding: '0 5px'
          },
          export: {
            width: '*',
            alignment: 'center'
          },
          sortable: false
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.plannedCost',
          key: 'plannedCost',
          style: {
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          metadata: {
            montant: true,
            number: true
          }
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.actCost',
          key: 'actuelCost',
          style: {
            width: '10%',
            padding: '0 5px'
          },
          sortable: false,
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          metadata: {
            montant: true,
            number: true
          }
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.targetStart',
          key: 'startDate',
          style: {
            width: '12%',
            padding: '0 5px'
          },
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          sortable: false
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.targetEnd',
          key: 'endDate',
          style: {
            width: '12%',
            padding: '0 5px'
          },
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          sortable: false
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.actStartDate',
          key: 'actuelStartDate',
          style: {
            width: '12%',
            padding: '0 5px'
          },
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          sortable: false
        },
        {
          label: 'gp.5d.ficheProject5DDetails.tableListDetailProjetTasks.columns.actEndDate',
          key: 'actuelEndDate',
          style: {
            width: '12%',
            padding: '0 5px'
          },
          type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
          sortable: false
        }
        // {
        //   label: "",
        //   key: "actions",
        //   type: "actions",
        //   style: {
        //     "text-align": "center",
        //     width: "10%",
        //     padding: "0 5px",
        //   },
        //   sortable: false,
        //   btns: [
        //     Icons.details,
        //   ],
        // },
      ]
    }
  }
};




