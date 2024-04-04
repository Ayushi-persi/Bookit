export type QualificationProps = {
  degree: string;
  description: string;
};

export type QualificationActionType = {
  type: string;
  payload: QualificationProps;
  token: string;
};
