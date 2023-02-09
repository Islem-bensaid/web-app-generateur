import {Icons} from "@shared/constantes/Icons";
import {isEmptyValue} from "@shared/tools";

export const COMMON_METADATA = {
    nmSelectMetadata: (metadata) => {
        return {
            label: metadata.label || '',
            value: metadata.value || null,
            optionLabel: metadata.optionLabel || {
                fr: 'libelleFr',
                ar: 'libelleAr',
                en: 'libelleEn'
            },

            filter: !isEmptyValue(metadata.filter)? metadata.filter : true,
            tooltip: !isEmptyValue(metadata.tooltip)? metadata.tooltip : true,
            reset: !isEmptyValue(metadata.reset)? metadata.reset : true,
            muliple: metadata.multiSelect || false,
            grouping: metadata.grouping || false,
            emitedValue: !isEmptyValue(metadata.emitedValue)? metadata.emitedValue : '—'
        }
    },
    dialogAddDoc: {
        mediaTypesList: [
            {
                code: 'images',
                label: 'Images',
            },
            {
                code: 'videos',
                label: 'Videos',
            },
            {
                code: 'files',
                label: 'Files',
            },
            {
                code: 'images',
                label: 'Images',
            },
            {
                code: 'videos',
                label: 'Videos',
            },
            {
                code: 'files',
                label: 'Files',
            }
        ],
        form: {
            controls: [
                {
                    key: 'numDoc',
                    label: 'general.add_doc_dialog.content.form.labels.numDoc',
                    required: true,
                },
                {
                    key: 'code',
                    label: 'general.add_doc_dialog.content.form.labels.typeDoc',
                    required: true
                },
                {
                    key: 'nomFichier',
                    label: 'general.add_doc_dialog.content.form.labels.nomFichier',
                    required: true
                },
                // {
                //     key: 'observation',
                //     label: 'general.add_doc_dialog.content.form.labels.observation',
                // }
            ]
        },
        tableAtachFiles: {
            ref: 'TableAtachFiles',
            title: 'general.add_doc_dialog.content.tableAF.title',
            hasAdd: true,// true | false, default: true
            hasPagination: true,// true | false, default: true
            paginationPageSize: 5, // default: 10
            paginationPageIndex: 0, // default: 1
            hasExport: false,// true | false, default: true
            hasFilter: false,// true | false, default: true
            exportOrientation: 'portrait', // 'portrait' | 'landscape', default: portrait
            columns: [
                {
                    label: 'general.add_doc_dialog.content.tableAF.columns.fileNm',
                    key: 'name',
                    style: {
                        'padding': '0 5px',
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
                        Icons.download,
                        Icons.delete,
                    ]
                },
            ]
        },
    

    }
}
