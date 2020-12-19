export class UserSessionDetails{
    constructor(
    public usd_session_id: string,
    public usd_user_key: string,
    public usd_user_profile_role_key: string,
    public usd_login_on: any,
    public usd_last_db_access: Date,
    public ush_time_zone: string,
    public ush_active_status: string,
    public ush_purge_on: Date,
    public ush_logout_on: Date,
    public ush_ip_address: String,
    public ush_created_on: Date,
    public ush_lock_key: string,
    
    ){}
    }
    export class UserSessionDetails1{
        constructor(
        public usd_key: number,
        public usd_session_id: string,
        public usd_user_key: string,
        public usd_user_profile_role_key: string,
        public usd_login_on:any,
        public usd_last_db_access: Date,
        public ush_time_zone: string,
        public ush_active_status: string,
        public ush_purge_on: Date,
        public ush_logout_on: Date,
        public ush_ip_address: String,
        public ush_created_on: Date,
        public ush_lock_key: string,
        
        ){}
        }
        