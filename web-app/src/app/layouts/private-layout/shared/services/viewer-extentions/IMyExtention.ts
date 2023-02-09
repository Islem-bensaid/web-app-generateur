import {InjectionToken} from '@angular/core';

export declare interface IMyExtension {
  isolateItems(dbIds: any[]);
}


export let MY_EXTENTION = new InjectionToken<IMyExtension>('myExtention');
