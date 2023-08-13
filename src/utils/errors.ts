import { error } from "console";
import { IHandleAxiosErrorPayload } from "../types";
import { AxiosError } from "axios";
import { getAuthDataLS, removeUser } from "./auth";
import { getCostsFx, refreshTokenFx } from "../api/costsClient";
import { setCost } from "../context";
import { toastHelper } from "./toastHelper";

export const handleAxiosError = async(
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const errorMessage = 
    ((error as AxiosError).response?.data as { message: string}).message || 
    ((error as AxiosError).response?.data as { error: string}).error

  if (errorMessage) {
    if(errorMessage === 'jwt expired'){
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataLS();

      refreshTokenFx({
        url: '/auth/refresh',
        token: authData.refresh_token,
        username: authData.username
      })

      if (payload !== null) {
        switch (payloadData.type) {
          case 'get':
            const costs = await getCostsFx({
              url: '/cost',
              token: authData.access_token
            })

            setCost(costs)
            break;
        
          default:
            break;
        }
      }
    }else{
      toastHelper('error', errorMessage);
      removeUser();
    }
  }else{
    toastHelper('error', errorMessage);
    removeUser();
  }
}