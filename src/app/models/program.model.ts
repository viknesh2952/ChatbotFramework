export class ProgramModel{
      [x: string]: any;


      constructor(
            public program_key:number,
            public program_parent_key:number,
            public program_type:string,
            public program_code:string,
            public program_description:string,
            public program_page_name:string,
            public program_page_path:string,
            public program_icon_path:string,
            public program_access_control:string,
            public program_order:string,
            public program_active_status:string,
            public program_active_from:string,
            public program_active_to:string,
            public program_lock_key:number,
            public program_profile_key:number,
      ) {}
}

export class ProgramModelUpdate{

  constructor(
        public program_key:number,
        public program_parent_key:number,
        public program_type:string,
        public program_code:string,
        public program_description:string,
        public program_page_name:string,
        public program_page_path:string,
        public program_icon_path:string,
        public program_access_control:string,
        public program_order:string,
        //public program_active_status:string,
        public program_active_from:string,
        public program_active_to:string,
        public program_lock_key:number,
        public program_profile_key:number,
  ) {}
}
