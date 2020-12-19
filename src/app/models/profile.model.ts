export class ProfileModel{
    constructor(
        public uprl_active_from: string,
        public uprl_active_status: string,
        public uprl_active_to: string,
        public uprl_default_printer:string,
        public uprl_display_name: string,
        public uprl_key: number,
        public uprl_landing_program_key:number,
        public uprl_profile_key: number,
        public uprl_pwd_expire_days: number,
        public uprl_pwd_never_expire: string,
        public uprl_user_key: number,
        public uprl_user_profile_key: number,
        public uprl_user_role_key: number){}
} 
export class ProfileUpdate{
    constructor(
        public uprl_active_from: string,
        public uprl_active_status: string,
        public uprl_active_to: string,
        public uprl_default_printer:string,
        public uprl_display_name: string,
        public uprl_key: number,
        public uprl_landing_program_key:number,
        public uprl_profile_key: number,
        public uprl_pwd_expire_days: number,
        public uprl_pwd_never_expire: string,
        public uprl_user_key: number,
        public uprl_user_profile_key: number,
        public uprl_user_role_key: number){}
}   


         

       
       