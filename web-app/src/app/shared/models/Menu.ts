export interface Menu {
  icon: string;
  path?: string;
  tooltip: string;
  title: string;
  submenus?: Menu[];
  // permissions?: {
  //   only?: string[] | string;
  // };
}
