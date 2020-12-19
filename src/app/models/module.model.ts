export class ModuleModel{
      [x: string]: any;

      constructor(
           public MODULE_KEY:number,
           public MODULE_PARENT_KEY:number,
           public MODULE_CODE:string,
           public MODULE_NAME:string,
           public MODULE_ACTIVE_FLAG:string,
           public MODULE_ORDER_BY:number,
           public MODULE_PAGE:string,
           public MODULE_PATH:string,
           public MODULE_ICON:string,
           public MODULE_PASSWORD_REQUIRED:string,
           public MODULE_PREFIX:string,
           public MODULE_ACTIVE_FROM:string,
           public MODULE_ACTIVE_TO:string,
           public MODULE_LOCK_KEY:number,
           public MODULE_PRODUCT_KEY:number,
           public MODULE_APPLICABILITY:string
      ){}
}

export class ModuleModelUpdate{


  constructor(
       public MODULE_KEY:number,
       public MODULE_PARENT_KEY:number,
       public MODULE_CODE:string,
       public MODULE_NAME:string,
       //public MODULE_ACTIVE_FLAG:string,
       public MODULE_ORDER_BY:number,
       public MODULE_PAGE:string,
       public MODULE_PATH:string,
       public MODULE_ICON:string,
       public MODULE_PASSWORD_REQUIRED:string,
       public MODULE_PREFIX:string,
       public MODULE_ACTIVE_FROM:string,
       public MODULE_ACTIVE_TO:string,
       public MODULE_LOCK_KEY:number,
       public MODULE_PRODUCT_KEY:number,
       public MODULE_APPLICABILITY:string
  ){}
}

