export class UserModel{
    [x: string]: any;
    constructor(
       // public user_id:number,
        public user_key:number,
        public user_code:string,
        public user_first_name:string,
        public user_middle_name:string,
        public user_last_name:string,
        public user_display_name:string,
        public user_password:string,
        public user_address_link:string,
        public user_default_profile_key:number,
        public user_active_status:string,
        public user_active_from:string,
        public user_active_to:string,
        public user_lock_key:number,
        public user_profile_key:number
        ){}
}

export class UserModel1{
    constructor(
        //public user_id:number,
        public user_key:number,
        public user_code:string,
        public user_first_name:string,
        public user_middle_name:string,
        public user_last_name:string,
        public user_display_name:string,
        public user_password:string,
        public user_address_link:string,
        public user_default_profile_key:number,
        public user_active_status:string,
        public user_active_from:string,
        public user_active_to:string,
        public user_lock_key:number,
        public user_profile_key:number
        ){}
}



