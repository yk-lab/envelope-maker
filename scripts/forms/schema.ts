export type DestForm = {
  destZipcode: string;
  destAddress1: string;
  destAddress2: string;
  destAffiliation1: string;
  destAffiliation2: string;
  destPosition: string;
  destName: string;
  destHonorific: string;
};

export type SenderForm = {
  senderZipcode: string;
  senderAddress1: string;
  senderAddress2: string;
  senderAffiliation1: string;
  senderAffiliation2: string;
  senderName: string;
};

export const defaultDest = (): DestForm => {
  return {
    destZipcode: "",
    destAddress1: "",
    destAddress2: "",
    destAffiliation1: "",
    destAffiliation2: "",
    destPosition: "",
    destName: "",
    destHonorific: "様",
  };
};
export const defaultSender = (): SenderForm => {
  return {
    senderZipcode: "",
    senderAddress1: "",
    senderAddress2: "",
    senderAffiliation1: "",
    senderAffiliation2: "",
    senderName: "",
  };
};
