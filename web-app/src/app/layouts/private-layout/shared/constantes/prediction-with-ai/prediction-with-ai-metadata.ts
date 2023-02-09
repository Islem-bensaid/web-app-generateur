import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { CHARTS_CODES } from '@shared/constantes/Constante';

export const PredictionWithAiMetadata = {
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
    aiModelInputs: {
      title: 'ai.tcp.aiModelInputs.title',
      ref: 'ficheInfoProjet',
      columns: [
        {
          label: 'ai.tcp.aiModelInputs.columns.bac',
          key: 'BACF'
          // type: COMMON_TYPES_CODES.MONTANT
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.od',
          key: 'OD'
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.ac',
          key: 'ACF'
          // type: COMMON_TYPES_CODES.MONTANT
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.bcwp',
          key: 'BCWPF'
          // type: COMMON_TYPES_CODES.MONTANT
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.bcws',
          key: 'BCWSF'
          // type: COMMON_TYPES_CODES.MONTANT
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.ppc',
          key: 'PPC'
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.spc',
          key: 'SPC'
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.spi',
          key: 'SPI'
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.cpi',
          key: 'CPI'
        },
        {
          label: 'ai.tcp.aiModelInputs.columns.tcpi',
          key: 'TCPI'
        }
      ]
    },
    aiModelOutputs: {
      ref: 'TableListAiOutputs',
      title: 'ai.tcp.aiModelOutputs.title',
      hasAdd: false, // true | false, default: true
      hasExport: false, // true | false, default: true
      hasPagination: false, // true | false, default: true
      hasFilter: false, // true | false, default: true
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      columns: [
        {
          label: 'ai.tcp.aiModelOutputs.columns.prediType',
          key: 'prediType',
          sortable: false,
          style: {
            width: '25%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.aiModelOutputs.columns.prediValue',
          key: 'prediValue',
          sortable: false,
          style: {
            width: '15%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.aiModelOutputs.columns.prediRecommandation',
          key: 'prediRecommandation',
          sortable: false,
          style: {
            'text-align': 'center',
            width: '20%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.aiModelOutputs.columns.prediAction',
          key: 'prediAction',
          sortable: false,
          style: {
            'text-align': 'center',
            width: '20%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.aiModelOutputs.columns.actions',
          key: 'actions',
          type: 'actions',
          style: {
            'text-align': 'center',
            width: '15%',
            padding: '0 5px'
          },
          sortable: false,
          btns: [
            {
              ref: 'outlineBtn',
              handler: 'onOutlineBtn',
              type: 'flat', // 'icon' | 'flat'
              classList: 'my-2',
              key: 'exceTypeStr'
            }
          ]
        }
      ]
    },
    tbaActivitiesList: {
      ref: 'TableListTbaActivities',
      title: 'ai.tcp.activitiesList.tbaActivitiesList.title',
      hasAdd: false, // true | false, default: true
      hasExport: false, // true | false, default: true
      hasPagination: false, // true | false, default: true
      hasFilter: false, // true | false, default: true
      // paginationPageSize: 5, // default: 10
      // paginationPageIndex: 0, // default: 10
      columns: [
        {
          label: 'ai.tcp.activitiesList.tbaActivitiesList.columns.taskCode',
          key: 'taskCode',
          sortable: false,
          style: {
            width: '15%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.activitiesList.tbaActivitiesList.columns.taskName',
          key: 'taskName',
          sortable: false,
          style: {
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.activitiesList.tbaActivitiesList.columns.remainDrtnHrCnt',
          key: 'remainDrtnHrCnt',
          sortable: false,
          style: {
            'text-align': 'center',
            width: '10%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.activitiesList.tbaActivitiesList.columns.actWorkQty',
          key: 'actWorkQty',
          sortable: false,
          style: {
            'text-align': 'center',
            width: '15%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.activitiesList.tbaActivitiesList.columns.targetWorkQty',
          key: 'targetWorkQty',
          sortable: false,
          style: {
            'text-align': 'center',
            width: '15%',
            padding: '0 5px'
          }
        },
        {
          label: 'ai.tcp.activitiesList.tbaActivitiesList.columns.physCompletePct',
          key: 'physCompletePct',
          sortable: false,
          style: {
            'text-align': 'center',
            width: '15%',
            padding: '0 5px'
          }
        }
      ]
    },
    predActivitiesList: (code) => {
      return {
        ref: 'TableListTbcActivities',
        title: `${code} Activities List`,
        hasAdd: false, // true | false, default: true
        hasExport: false, // true | false, default: true
        hasPagination: false, // true | false, default: true
        hasFilter: false, // true | false, default: true
        // paginationPageSize: 5, // default: 10
        // paginationPageIndex: 0, // default: 10
        columns: [
          {
            label: 'ai.tcp.activitiesList.tbcActivitiesList.columns.taskCode',
            key: 'taskCode',
            sortable: false,
            style: {
              width: '15%',
              padding: '0 5px'
            }
          },
          {
            label: 'ai.tcp.activitiesList.tbcActivitiesList.columns.taskName',
            key: 'taskName',
            sortable: false,
            style: {
              padding: '0 5px'
            }
          },
          {
            label: 'ai.tcp.activitiesList.tbcActivitiesList.columns.targetDrtnHrCnt',
            key: 'targetDrtnHrCnt',
            sortable: false,
            style: {
              'text-align': 'center',
              width: '10%',
              padding: '0 5px'
            }
          },
          {
            label: 'ai.tcp.activitiesList.tbcActivitiesList.columns.targetStartDate',
            key: 'targetStartDate',
            type: COMMON_TYPES_CODES.DATE,
            sortable: false,
            style: {
              'text-align': 'center',
              width: '15%',
              padding: '0 5px'
            }
          },
          {
            label: 'ai.tcp.activitiesList.tbcActivitiesList.columns.targetEndtDate',
            key: 'targetEndtDate',
            type: COMMON_TYPES_CODES.DATE,
            sortable: false,
            style: {
              'text-align': 'center',
              width: '15%',
              padding: '0 5px'
            }
          },
          {
            label: 'ai.tcp.activitiesList.tbcActivitiesList.columns.predTaskCode',
            key: 'predTaskCode',
            sortable: false,
            style: {
              'text-align': 'center',
              width: '15%',
              padding: '0 5px'
            }
          }
        ]
      };
    },
    charts: {
      costGauge: {
        title: 'Cost Deviation Indicator',
        chartType: CHARTS_CODES.NGX_GAUGE,
        ngxGaugeType: 'arch',
        ngxGaugeMin: 0,
        ngxGaugeMax: 300,
        ngxGaugeThick: 20,
        ngxGaugeCap: 'round',
        ngxGaugeAppend: '%',
        ngxGaugeThresholds: {
          0: { color: '#136f47' },
          105: { color: '#efcc26' },
          110: { color: '#cf1426' }
        },
        ngxGaugeMarkers: (() => {
          let obj = {};
          for (let i = 0; i < 300; i+=10) {
            obj[i] = { i: { color: '#000', type: 'line', size: 3, label: `${i} %`, font: '12px arial' } };
          }
          return obj;
        })()
      },
      timeGauge: {
        title: 'Time Deviation Indicator',

        chartType: CHARTS_CODES.NGX_GAUGE,
        ngxGaugeType: 'arch',
        ngxGaugeMin: 0,
        ngxGaugeMax: 300,
        ngxGaugeThick: 20,
        ngxGaugeCap: 'round',
        ngxGaugeAppend: '%',
        ngxGaugeThresholds: {
          0: { color: '#136f47' },
          105: { color: '#efcc26' },
          110: { color: '#cf1426' }
        },
        ngxGaugeMarkers: (() => {
          let obj = {};
          for (let i = 0; i < 300; i+=10) {
            obj[i] = { i: { color: '#000', type: 'line', size: 3, label: `${i} %`, font: '12px arial' } };
          }
          return obj;
        })()
      }
    }

  }
;
