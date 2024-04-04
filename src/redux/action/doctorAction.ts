import { ADD_QUALIFICATION } from '../constant/doctorConstants';
import { QualificationProps } from '../types/doctorTypes';

export const addQualification = (data: QualificationProps, token: string) => ({
  type: ADD_QUALIFICATION,
  payload: data,
  token: token,
});
