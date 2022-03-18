import { TimologiakiPolitiki } from './timologiaki-politiki.model';

export interface Customer {
  id: number;
  username: string;
  password: string;
  timol_pol: TimologiakiPolitiki
}

export class User {
  constructor(
    public service:string,
    public username:string,
    public password:string,
    public appId:string
    ){}

    // get token(){
    //   if(!this._tokenExpiirationDate || new Date() > this._tokenExpiirationDate){
    //     return null;
    //   }
    //     return this._token;
    // }
}
