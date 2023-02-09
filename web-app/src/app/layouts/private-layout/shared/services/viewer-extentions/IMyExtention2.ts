import {InjectionToken} from '@angular/core';

export declare interface IMyExtension2 {
  isolateItems(dbIds: any[]);
}


export let MY_EXTENTION2 = new InjectionToken<IMyExtension2>('myExtention2');
