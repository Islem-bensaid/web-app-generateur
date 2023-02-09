import {AppTranslateService} from "@shared/services";
import {DateFormatheurePipe, DateFormatPipe} from "@shared/pipes";
import {isEmptyValue} from "@shared/tools";
import JSZip from "jszip";
import FileSaver from "file-saver";
import {DatePipe} from "@angular/common";
import {Pagination, SearchObject, Sort} from "@shared/models";


export function initDatatableDetails(metadataColumns: any[], appTranslateService: AppTranslateService) {
    let displayedColumns = [];
    let labels = {};
    let specificColumns = {
        montant: [],
        date: [],
        datetime: [],
        others: [],
        actions: [],
        all: [],
        sortable: []
    };
    let exportedColumns: { cols: string[], labels: string[], types: string[], alignments: string[], widths: (string | number)[] } = {
        cols: [],
        labels: [],
        types: [],
        widths: [],
        alignments: []
    };
    let colKey: string = '';
    let exportKey: string = '';

    for (const col of metadataColumns) {
        colKey = (typeof col.key == 'object') ? col.key[appTranslateService.getDefaultLang()] : col.key;
        displayedColumns.push(colKey);
        labels[colKey] = col.label;
        col.sortable !== false ? specificColumns['sortable'].push(colKey) : null;
        if (!!col.type) {
            specificColumns[col.type].push(colKey);
            specificColumns['all'].push(colKey);
        }
        if (!!col.export) {
            // @ts-ignore
            exportKey = !!col.export.key ? (typeof col.export.key == 'object' ? col.export.key[appTranslateService.getDefaultLang()] : col.export.key) : colKey;
            exportedColumns['cols'].push(exportKey);
            exportedColumns['labels'].push(col.label);
            exportedColumns['types'].push(col.type || 'text');
            exportedColumns['widths'].push(col.export.width || 'auto');
            exportedColumns['alignments'].push(col.export.alignment || (appTranslateService.getDir() === 'rtl' ? 'right' : 'left'));
        }
    }

    return {
        displayedColumns: displayedColumns,
        labels: labels,
        specificColumns: specificColumns,
        exportedColumns: exportedColumns
    };
}

export function initExportedColumns(metadataColumns: any[], appTranslateService: AppTranslateService) {
    let exportedColumns: { cols: string[], labels: string[], types: string[], alignments: string[], widths: (string | number)[] } = {
        cols: [],
        labels: [],
        types: [],
        widths: [],
        alignments: []
    };
    let colKey: string = '';
    let exportKey: string = '';
    for (const col of metadataColumns) {
        if (!isEmptyValue(col.export)) {
            colKey = (typeof col.key == 'object') ? col.key[appTranslateService.getDefaultLang()] : col.key;
            exportKey = !isEmptyValue(col.export.key) ? (typeof col.export.key == 'object' ? col.export.key[appTranslateService.getDefaultLang()] : col.export.key) : colKey;
            exportedColumns['cols'].push(exportKey);
            exportedColumns['labels'].push(col.label);
            exportedColumns['types'].push(col.type || 'text');
            exportedColumns['widths'].push(col.export.width || 'auto');
            exportedColumns['alignments'].push(
                ((alignment) => {
                    if (!isEmptyValue(alignment)) {
                        return typeof alignment == 'object' ? alignment[appTranslateService.getDir()] : alignment;
                    }
                    return appTranslateService.getDir() === 'rtl' ? 'right' : 'left';
                })(col.export.alignment));
        }
    }
    return exportedColumns
}

export function doFilter(typedValue: string, tableDetails: { displayedColumns: string[], specificColumns: any, labels: object }, listData) {
    console.assert(!!tableDetails.displayedColumns, `Error in doFilterDatatable.ts/doFilter, erreur: Il faut définir votre tableDetails.displayedColumns`);
    console.assert(!!tableDetails.specificColumns, `Error in doFilterDatatable.ts/doFilter, erreur: Il faut définir votre tableDetails.specificColumns`);
    if (typedValue?.trim() && listData) {
        let tempList: object[] = listData;
        const checkValue = (value) => {
            return value.toString().toLowerCase().trim().includes(typedValue.toLowerCase().trim());
        };
        tempList = tempList.filter(item => {
            for (const [key, value] of Object.entries(item)) {
                if (tableDetails.displayedColumns.includes(key)) {
                    if (tableDetails.specificColumns.date?.includes(key)) {
                        if (checkValue(new DateFormatPipe().transform(value))) {
                            return item;
                        }
                    } else if (tableDetails.specificColumns.datetime?.includes(key)) {
                        if (checkValue(new DateFormatheurePipe().transform(value))) {
                            return item;
                        }
                    } else {
                        if (checkValue(value)) {
                            return item;
                        }
                    }
                }
            }
        });
        return {
            data: tempList,
            offset: tempList.length
        };
    }
}

export function doFilterV2(typedValue: string, metadataColumns: any[], listData, appTranslateService: AppTranslateService) {
    if (typedValue?.trim() && listData) {
        let tempList: object[] = listData;
        const checkValue = (value) => {
            return !isEmptyValue(value) ? value.toString().toLowerCase().trim().includes(typedValue.toLowerCase().trim()) : false;
        };
        const getColumnKey = (column) => {
            if (typeof column == 'object') {
                return column[appTranslateService.getDefaultLang()];
            }
            return column;
        }
        const getColumnsToDisplay = ((columns) => {
            return Object.values(columns).map(e => getColumnKey(e['key']));
        })(metadataColumns);
        const specificColumns = ((columns) => {
            return {
                date: columns.filter(col => (col.type == 'date')).map(e => getColumnKey(e['key'])),
                datetime: columns.filter(col => (col.type == 'datetime')).map(e => getColumnKey(e['key']))
            };
        })(metadataColumns)
        tempList = tempList.filter(item => {
            for (const [key, value] of Object.entries(item)) {
                if (getColumnsToDisplay.includes(key)) {
                    if (specificColumns.date?.includes(key)) {
                        if (checkValue(new DateFormatPipe().transform(value))) {
                            return item;
                        }
                    } else if (specificColumns.datetime?.includes(key)) {
                        if (checkValue(new DateFormatheurePipe().transform(value))) {
                            return item;
                        }
                    } else {
                        if (checkValue(value)) {
                            return item;
                        }
                    }
                }
            }
        });
        return {
            data: tempList,
            offset: tempList.length
        };
    }
}

export function onAction(self, actionBtn: { handler: string, row: { item: any, index: number } }) {
    if (actionBtn.row) {
        if (!isEmptyValue(actionBtn.row.index)) {
            self[actionBtn.handler](actionBtn.row);
        } else {
            self[actionBtn.handler](actionBtn.row.item);
        }
    } else {
        self[actionBtn.handler]();
    }
}

async function fileToBlob(file: File) {
    return new Blob([await file.arrayBuffer()], {type: file.type})
}

export function fileToBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            console.error(`Error in DatatableFactory/fileToBase64, error :: ${error}`);
            resolve(null);
        };
    })

}

export function downloadBlob(fileUrl, name = 'file.txt') {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = name;

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    setTimeout(() => {
        window.URL.revokeObjectURL(fileUrl);
        link.remove();
    }, 100);
}

export function downloadLocalFile(file: File) {
    fileToBlob(file).then(blobFile => downloadBlob(window.URL.createObjectURL(blobFile), file.name));
}

export function downloadZip(filesList: File[], fName: string = 'combined') {
    if (filesList) {
        const blobsList = [];
        filesList.forEach(file => blobsList.push(fileToBlob(file)));

        const zip = new JSZip();
        blobsList.forEach((blob, i) => {
            zip.file(filesList[i].name, blob);
        });
        return zip.generateAsync({type: 'blob'}).then(zipFile => {
            const currentDate = new DatePipe("en-US").transform(new Date(), 'yyyyMMdd');
            const fileName = `${isEmptyValue(fName) ? 'combined' : fName}-${currentDate}.zip`;
            return FileSaver.saveAs(zipFile, fileName)
        });
    }
}

function GetSortOrder(sort: Sort) {
    if (sort.direction.includes('ASC')) {
        return function (a, b) {
            if (a[sort.nameCol] > b[sort.nameCol]) {
                return 1;
            } else if (a[sort.nameCol] < b[sort.nameCol]) {
                return -1;
            }
            return 0;
        };
    } else {
        return function (a, b) {
            if (a[sort.nameCol] < b[sort.nameCol]) {
                return 1;
            } else if (a[sort.nameCol] > b[sort.nameCol]) {
                return -1;
            }
            return 0;
        };
    }

}

export function datatableSorting(list, sort: Sort) {
    return list.sort(GetSortOrder(sort));
}

export function initSearchObject(metadata = null) {
    const searchObject = new SearchObject();
    searchObject.pagination = metadata.pagination || new Pagination(0, 10);
    searchObject.sort = metadata.sort || new Sort();
    searchObject.listSort = metadata.listSort || [];
    searchObject.listCol = metadata.listCol || [];
    searchObject.dataSearch = metadata.dataSearch || [];
    return searchObject;
}

