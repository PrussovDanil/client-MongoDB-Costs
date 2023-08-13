export interface IAlertProps{
  props: IAlert
}

export interface IAlert{
  alertStatus:string;
  alertText: string
}

export interface ISpinnerProps{
  top: number;
  left: number;
}

export interface ICostsHeaderProps {
  costs: ICosts[];
}

export interface ICosts {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
} 

export interface IBaseEffectArgs {
  url: string;
  token: string;
}

export interface ICreateCost extends IBaseEffectArgs {
  cost: ICosts;
}

export interface IRefreshToken extends IBaseEffectArgs {
  username: string;
}

export interface IHandleAxiosErrorPayload {
  type: string;
  createCost?: Partial<ICreateCost>;
  getCosts?: Partial<IBaseEffectArgs>;
}