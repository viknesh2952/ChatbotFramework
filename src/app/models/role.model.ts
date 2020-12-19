export class RoleModel{
    [x: string]: any;
    constructor(
        
        public role_key:number,
        public role_code:string,
        public role_description:string,
        public role_active_status:string,
        public role_active_from:string,
        public role_active_to:string,
        public role_lock_key:number,
        public role_profile_key:number){}
}

export class RoleModel1{
constructor(
    
    public role_key:number,
    public role_code:string,
    public role_description:string,
    // public role_active_status:string,
    public role_active_from:string,
    public role_active_to:string,
    public role_lock_key:number,
    public role_profile_key:number){}
    }