import { Icons } from '@shared/constantes/Icons';
import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { SelectMetadata } from '@shared/models';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import { CHARTS_CODES, CHARTS_COLOR_SCHEMA } from '@shared/constantes/Constante';

export const DashboardMetadata = {
  tableListAreas: {
    ref: 'TableListAreas',
    title: 'gp.dashboard.dashboardDetails.content.tableListAreas.title',
    hasAdd: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: true, // true | false, default: true
    paginationPageSize: 5, // default: 10
    paginationPageIndex: 0, // default: 0
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.seq',
        key: 'seq',
        style: {
          width: '4%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.description',
        key: 'description',
        style: {
          width: '35%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.action',
        key: 'action',
        style: {
          width: '35%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.sevirite',
        key: 'sevirite',
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.status',
        key: 'status',
        style: {
          width: '10%',
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
          Icons.delete
        ]
      }
    ]
  },
  tableMaterialSubmittalStatus: {
    ref: 'TableMaterialSubmittalStatus',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.summary',
        key: 'summary',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '200px',
          "max-width": '200px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.st',
        key: 'st',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.ar',
        key: 'ar',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.cv',
        key: 'cv',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.la',
        key: 'la',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.el',
        key: 'el',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.me',
        key: 'me',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.dr',
        key: 'dr',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.pourcentage',
        key: 'pourcentage',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.total',
        key: 'total',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      }
    ]
  },
  tableShopDrawingStatus: {
    ref: 'TableShopDrawingStatus',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.summary',
        key: 'summary',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '200px',
          "max-width": '200px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.st',
        key: 'st',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.ar',
        key: 'ar',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.me',
        key: 'me',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.el',
        key: 'el',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.gn',
        key: 'gn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableShopDrawingStatus.columns.la',
        key: 'la',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.pourcentage',
        key: 'pourcentage',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.total',
        key: 'total',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      }
    ]
  },
  tableAsBuiltDrawingStatus: {
    ref: 'TableAsBuiltDrawingStatus',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.summary',
        key: 'summary',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '200px',
          "max-width": '200px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.st',
        key: 'st',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.ar',
        key: 'ar',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.me',
        key: 'me',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.el',
        key: 'el',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.gn',
        key: 'gn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableAsBuiltDrawingStatus.columns.la',
        key: 'la',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '110px',
          "max-width": '110px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.pourcentage',
        key: 'pourcentage',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.total',
        key: 'total',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      }
    ]
  },
  tableHseReport: {
    ref: 'TableHseReport',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableHseReport.columns.sn',
        key: 'sn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableHseReport.columns.discription',
        key: 'discription',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableHseReport.columns.contractorthisweek',
        key: 'contractorthisweek',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableHseReport.columns.subcontractorthisweek',
        key: 'subcontractorthisweek',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      // {
      //   label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.pourcentage',
      //   key: 'pourcentage',
      //   // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
      //   sortable: false,
      //   style: {
      //     width: '10%',
      //     padding: '0 5px'
      //   }
      // },
      {
        label: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.columns.total',
        key: 'total',
        // type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      }
    ]
  },
  tableContractorPaymentStatus: {
    ref: 'TableContractorPaymentStatus',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.sn',
        key: 'sn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '80px',
          "max-width": '80px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.curency',
        key: 'curency',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '100px',
          "max-width": '100px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoconsultant',
        key: 'submittedtoconsultant',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoconsultant',
        key: 'amountsubmittedtoconsultant',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoclient',
        key: 'submittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoclient',
        key: 'amountsubmittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.approvedbyclient',
        key: 'approvedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountapprovedbyclient',
        key: 'amountapprovedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.processedbyclient',
        key: 'processedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountprocessedbyclient',
        key: 'amountprocessedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.status',
        key: 'status',
        type: COMMON_TYPES_CODES.SELECT_LIST_INPUT,
        metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
          label: '',
          value: 'code',
          optionLabel: 'code',
          reset: true,
          tooltip: true
        }),
        data: [
          {
            code: 'Submitted By Contractor'
          },
          {
            code: 'Under Consultant Review'
          },
          {
            code: 'Under Client Review'
          },
          {
            code: 'Under Processing by Client'
          },
          {
            code: 'Under Processing Review'
          },
          {
            code: 'Approved By Client'
          },
          {
            code: 'Processed By Client'
          }
        ],
        sortable: false,
        style: {
          width: '180px',
          "max-width": '180px',
          padding: '0 5px'
        }
      }
    ]
  },
  tableConsultantPaymentStatus: {
    ref: 'TableConsultantPaymentStatus',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.sn',
        key: 'sn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '80px',
          "max-width": '80px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.curency',
        key: 'curency',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '100px',
          "max-width": '100px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoclient',
        key: 'submittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoclient',
        key: 'amountsubmittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.approvedbyclient',
        key: 'approvedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountapprovedbyclient',
        key: 'amountapprovedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.processedbyclient',
        key: 'processedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountprocessedbyclient',
        key: 'amountprocessedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.status',
        key: 'status',
        type: COMMON_TYPES_CODES.SELECT_LIST_INPUT,
        metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
          label: '',
          value: 'code',
          optionLabel: 'code',
          reset: true,
          tooltip: true
        }),
        data: [
          {
            code: ' Submitted By Contractor'
          },
          {
            code: 'Under Consultant Review'
          },
          {
            code: 'Under Client Review'
          },
          {
            code: 'Under Client Processing'
          },
          {
            code: 'Under Processing Review'
          },
          {
            code: 'Approved By Client'
          },
          {
            code: 'Processed By Client'
          }
        ],
        sortable: false,
        style: {
          width: '180px',
          "max-width": '180px',
          padding: '0 5px'
        }
      }
    ]
  },
  tableVariationOrders: {
    ref: 'TableVariationOrders',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.sn',
        key: 'sn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '80px',
          "max-width": '80px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.curency',
        key: 'curency',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '100px',
          "max-width": '100px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoconsultant',
        key: 'submittedtoconsultant',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoconsultant',
        key: 'amountsubmittedtoconsultant',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoclient',
        key: 'submittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoclient',
        key: 'amountsubmittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.approvedbyclient',
        key: 'approvedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountapprovedbyclient',
        key: 'amountapprovedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '120px',
          "max-width": '120px',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.status',
        key: 'status',
        type: COMMON_TYPES_CODES.SELECT_LIST_INPUT,
        metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
          label: '',
          value: 'code',
          optionLabel: 'code',
          reset: true,
          tooltip: true
        }),
        data: [
          {
            code: ' Submitted By Contractor'
          },
          {
            code: 'Under Consultant Review'
          },
          {
            code: 'Under Client Review'
          },
          {
            code: 'Under Client Processing'
          },
          {
            code: 'Under Processing Review'
          },
          {
            code: 'Approved By Client'
          },
          {
            code: 'Processed By Client'
          }
        ],
        sortable: false,
        style: {
          width: '180px',
          "max-width": '180px',
          padding: '0 5px'
        }
      }
    ]
  },
  tableClaims: {
    ref: 'TableClaims',
    hasAdd: false, // true | false, default: true
    hasUpload: true, // true | false, default: true
    hasExport: false, // true | false, default: true
    hasPagination: false, // true | false, default: true
    hasFilter: false, // true | false, default: true
    // paginationPageSize: 5, // default: 10
    // paginationPageIndex: 0, // default: 0
    editable: true,
    columns: [
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.sn',
        key: 'sn',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.curency',
        key: 'curency',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoconsultant',
        key: 'submittedtoconsultant',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoconsultant',
        key: 'amountsubmittedtoconsultant',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.submittedtoclient',
        key: 'submittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountsubmittedtoclient',
        key: 'amountsubmittedtoclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.approvedbyclient',
        key: 'approvedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.amountapprovedbyclient',
        key: 'amountapprovedbyclient',
        type: COMMON_TYPES_CODES.TEXT_FIELD_INPUT,
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      },
      {
        label: 'gp.dashboard.dashboardDetails.content.tableContractorPaymentStatus.columns.status',
        key: 'status',
        type: COMMON_TYPES_CODES.SELECT_LIST_INPUT,
        metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
          label: '',
          value: 'code',
          optionLabel: 'code',
          reset: true,
          tooltip: true
        }),
        data: [
          {
            code: ' Submitted By Contractor'
          },
          {
            code: 'Under Consultant Review'
          },
          {
            code: 'Under Client Review'
          },
          {
            code: 'Under Client Processing'
          },
          {
            code: 'Under Processing Review'
          },
          {
            code: 'Approved By Client'
          },
          {
            code: 'Processed by Client'
          }
        ],
        sortable: false,
        style: {
          width: '10%',
          padding: '0 5px'
        }
      }
    ]
  },

  AreasDialog: {
    form: {
      controls: [
        {
          key: 'description',
          label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.description',
          required: true
        },
        {
          key: 'action',
          label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.action',
          required: true
        },
        {
          key: 'sevirite',
          label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.sevirite',
          required: true
        },
        {
          key: 'status',
          label: 'gp.dashboard.dashboardDetails.content.tableListAreas.columns.status',
          required: true,
          disabled: true
        }
      ]
    }


  },
  charts: {
    sCurve: {
      title: 'S Curve (5D Costs)',
      chartType: CHARTS_CODES.LINE_CHART,
      colorScheme: CHARTS_COLOR_SCHEMA.CUSTOM_1,
      maxXAxisTickLength: 7,
      autoscale: false,
      // roundDomains: true,
      // trimYAxisTicks: false,
      // rotateYAxisTicks: false,
      // yAxisTicks: [1000, 10000,100000,1000000, 10000000],
      xAxisLabel: 'Date',
      yAxisLabel: 'Cost'
    },
    laborHistogram: {
      title: 'Labor Histogram',
      chartType: CHARTS_CODES.BAR_VERTICAL_2D,
      colorScheme: CHARTS_COLOR_SCHEMA.COOL,
      xAxisLabel: 'Date',
      yAxisLabel: 'Resources number',
      groupPadding: 2,
      barPadding: 1
    },
    materialSubmittalStatus: {
      title: 'gp.dashboard.dashboardDetails.content.materialSubmittalStatus.title',
      chartType: CHARTS_CODES.PIE_CHART,
      colorScheme: CHARTS_COLOR_SCHEMA.CUSTOM_1,
      arcWidth: .25,
    },
    shopDrawingStatus: {
      title: 'gp.dashboard.dashboardDetails.content.shopDrawingStatus.title',
      chartType: CHARTS_CODES.PIE_CHART,
      colorScheme: CHARTS_COLOR_SCHEMA.COOL,
      arcWidth: .25,
    },
    asBuiltDrawingStatus: {
      title: 'gp.dashboard.dashboardDetails.content.asBuiltDrawingStatus.title',
      chartType: CHARTS_CODES.PIE_CHART,
      colorScheme: CHARTS_COLOR_SCHEMA.COOL,
      arcWidth: .25,
    },
    hseReport: {
      title: 'gp.dashboard.dashboardDetails.content.hseReport.title',
      chartType: CHARTS_CODES.BAR_VERTICAL_2D,
      colorScheme: CHARTS_COLOR_SCHEMA.COOL,
      xAxisLabel: 'Description',
      yAxisLabel: 'Value',
      groupPadding: 2,
      barPadding: 1
    }
  }
};
