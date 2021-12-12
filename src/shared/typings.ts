
export enum LinkInfoKeys {
  DESTINATION = "destination",
  VIEWS = "views",
  PASS = "pass",
  HASH = "hash"
}
export type LinkInfo = {
  [LinkInfoKeys.DESTINATION]: string;
  [LinkInfoKeys.VIEWS]: number;
  [LinkInfoKeys.PASS]: string;
  [LinkInfoKeys.HASH]: string;
};
