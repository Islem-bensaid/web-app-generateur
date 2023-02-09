import {InjectionToken} from '@angular/core';

export declare interface IMyExtension1 {
  isolateItems(dbIds: any[]);
}


export let MY_EXTENTION1 = new InjectionToken<IMyExtension1>('myExtention1');
