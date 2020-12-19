export class StoryModel{
    constructor(
    public story_id:number,
    public app_id: number,
    public user_id: string,
    public module_id: number,
    public question:Array<string>,
    public response:string,
    public keywords:Array<string>,
    public active:string,
    public activated_by:string,
    public expiry:string,
    public created_by:string,
    public updated_by:string,
    public created_datetime:Date,
    public sub_module_id:number,
    public order_by:number,
    public applicability:Array<string>,
    public reference_url:string,
    public entity:string,
    public intent:string){}
}
export class StoryUpdate{
    constructor(
        public app_id:number,
        public user_id:string,
        public story_id:number,
        public module_id:number,
        public sub_module_id:number,
        public response:string,
        public active:string,
        public expiry:string,
        public keywords:Array<string>,
        public question:Array<string>,
        public order_by:number,
        public applicability:Array<string>,
        public reference_url:string,
        public entity:string,
        public intent:string){}
}
