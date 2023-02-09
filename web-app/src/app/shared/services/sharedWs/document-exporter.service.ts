import {Injectable} from '@angular/core';
import {extraFonts} from "@shared/constantes/ExtraFonts";
import {DateFormatheurePipe, DateFormatPipe, MontantPipe} from "@shared/pipes";
import {TranslateService} from "@ngx-translate/core";
import {AppTranslateService} from "@shared/services";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {regex} from "@shared/constantes";


@Injectable({
    providedIn: 'root'
})
export class DocumentExporterService {
    pdfMake: any;


    constructor(
        private dateFormatPipe: DateFormatPipe,
        private dateHeureFormatPipe: DateFormatheurePipe,
        private montantPipe: MontantPipe,
        private ngxTranslateService: TranslateService,
        private appTranslateService: AppTranslateService,
        private sharedService: SharedService
    ) {

    }

    _isArabicWord(w) {
        return regex.arabicInput().test(w) ? w.split(" ").reverse().join(" ") : w;
    }

    async _loadPdfMaker() {
        if (!this.pdfMake) {
            const pdfMakeModule = await import('pdfmake/build/pdfmake');
            const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
            this.pdfMake = pdfMakeModule.default;
            this.pdfMake.vfs = {
                ...pdfFontsModule.default.pdfMake.vfs,
                "Amiri-Regular.ttf": extraFonts.amiriRegular,
                "Tajawal-Regular.ttf": extraFonts.Tajawal,
                "Tajawal-Bold.ttf": extraFonts.TajawalBold,
                "Cairo-Regular.ttf": extraFonts.cairo
            };
            this.pdfMake.fonts = {
                Amiri: {
                    normal: "Amiri-Regular.ttf"
                },
                Tajawal: {
                    normal: "Tajawal-Regular.ttf",
                    bold: "Tajawal-Bold.ttf"
                },
                Cairo: {
                    normal: "Cairo-Regular.ttf"
                },
                Roboto: {
                    normal: "Roboto-Regular.ttf",
                    bold: "Roboto-Medium.ttf",
                }
            };
        }
    }

    async _getPageHeader(orientation: 'portrait' | 'landscape') {
        const dateNow = await this.sharedService.dateNow();
        return [
            {
                margin: [20, 15, 0, 0],
                image: extraFonts[`${orientation}Header`],
                width: orientation == 'portrait' ? 550 : 850,
                height: orientation == 'portrait' ? 70 : 85,
                alignment: 'center',
            },
            {
                margin: [this.appTranslateService.getDir() === 'rtl' ? 20 : 0, 0, this.appTranslateService.getDir() === 'rtl' ? 0 : 20, 0],
                text: this.dateFormatPipe.transform(dateNow),
                alignment: this.appTranslateService.getDir() === 'rtl' ? 'left' : 'right',
                fontSize: 15,
            }
        ]
    }

    _getTableHeader(metadata) {
        let tempHeader = [];
        for (let i = 0; i < metadata.labels.length; i++) {
            tempHeader.push({
                text: this._isArabicWord(this.ngxTranslateService.instant(metadata.labels[i])),
                style: 'tableHeader',
            })
        }
        return this.appTranslateService.getDir() === 'rtl' ? tempHeader.reverse() : tempHeader;
    }

    _getTableContent(metadata, listData) {
        let tempContent = [];
        let tempRow = [];
        for (const row of listData) {
            for (let i = 0; i < metadata.cols.length; i++) {
                switch (metadata.types[i]) {
                    case 'date':
                        tempRow.push({
                            text: this.dateFormatPipe.transform(row[metadata.cols[i]]),
                            alignment: 'center',
                            margin: [0, 5, 0, 0],
                        })
                        break;
                    case 'datetime':
                        tempRow.push({
                            text: this.dateHeureFormatPipe.transform(row[metadata.cols[i]]),
                            alignment: 'center',
                            margin: [0, 5, 0, 0]
                        })
                        break;
                    case 'montant':
                        tempRow.push({
                            text: this.montantPipe.transform(row[metadata.cols[i]]),
                            alignment: this.appTranslateService.getDir() == 'rtl' ? 'right' : 'left',
                            margin: [0, 5, 0, 0]
                        })
                        break;
                    default:
                        tempRow.push({
                            text: this._isArabicWord(row[metadata.cols[i]]),
                            alignment: metadata.alignments[i],
                            margin: [0, 5, 0, 0],
                        })
                }
            }
            tempContent.push(this.appTranslateService.getDir() === 'rtl' ? tempRow.reverse() : tempRow);
            tempRow = []
        }
        return tempContent;
    }


    async generatePdf(fileName = 'testFilePdf', listData: any[], metadata: any, orientation: 'portrait' | 'landscape' = 'portrait') {


        await this._loadPdfMaker();

        const def = {
            pageOrientation: orientation,
            pageMargins: [25, 120, 25, 25],
            info: {
                title: this._isArabicWord(this.ngxTranslateService.instant(fileName)),
            },
            footer: (currentPage, pageCount) => {
                return {
                    text: 'Page ' + currentPage + ' / ' + pageCount, alignment: 'center'
                }
            },
            header: await this._getPageHeader(orientation),
            content: [
                {
                    margin: [0, 20, 0, 40],
                    text: this._isArabicWord(this.ngxTranslateService.instant(fileName)),
                    alignment: 'center',
                    fontSize: 28,
                    bold: true,
                },
                {
                    table: {
                        headerRows: 1,
                        widths: this.appTranslateService.getDir() === 'rtl' ? metadata.widths.reverse() : metadata.widths,
                        body: [
                            this._getTableHeader(metadata),
                            ...this._getTableContent(metadata, listData)
                        ]
                    }
                }
            ],
            styles: {
                tableHeader: {
                    bold: true,
                    fontSize: 14,
                    alignment: 'center',
                    fillColor: '#1680b3',
                    color: '#FFFFFF',
                    margin: [0, 5, 0, 0]
                }
            },
            defaultStyle: {
                font: 'Tajawal'
            }
        };
        // this.pdfMake.createPdf(def).open();
        this.pdfMake.createPdf(def).download(this._isArabicWord(this.ngxTranslateService.instant(fileName))+'.pdf');
    }
}
