export interface Button {
  ref: string;
  handler: string;
  type: string;
  name: string;
  style: string;
}

export interface ButtonArrayItem {
  nomicon: string;
  iconDetails: Button;
}
