export class SubModuleModel{
  [x: string]: any;

  constructor(
       public SUB_MODULE_KEY:number,
       public SUB_MODULE_PARENT_KEY:number,
       public SUB_MODULE_CODE:string,
       public SUB_MODULE_NAME:string,
       public SUB_MODULE_ACTIVE_FLAG:string,
       public SUB_MODULE_ORDER_BY:number,
       public SUB_MODULE_PAGE:string,
       public SUB_MODULE_PATH:string,
       public SUB_MODULE_ICON:string,
       public SUB_MODULE_PASSWORD_REQUIRED:string,
       public SUB_MODULE_PREFIX:string,
       public SUB_MODULE_ACTIVE_FROM:string,
       public SUB_MODULE_ACTIVE_TO:string,
       public SUB_MODULE_LOCK_KEY:number,
       public SUB_MODULE_PRODUCT_KEY:number,
       public SUB_APPLICABILITY:string
  ){}
}

export class SubModuleModelUpdate{


  constructor(
       public SUB_MODULE_KEY:number,
       public SUB_MODULE_PARENT_KEY:number,
       public SUB_MODULE_CODE:string,
       public SUB_MODULE_NAME:string,
       //public SUB_MODULE_ACTIVE_FLAG:string,
       public SUB_MODULE_ORDER_BY:number,
       public SUB_MODULE_PAGE:string,
       public SUB_MODULE_PATH:string,
       public SUB_MODULE_ICON:string,
       public SUB_MODULE_PASSWORD_REQUIRED:string,
       public SUB_MODULE_PREFIX:string,
       public SUB_MODULE_ACTIVE_FROM:string,
       public SUB_MODULE_ACTIVE_TO:string,
       public SUB_MODULE_LOCK_KEY:number,
       public SUB_MODULE_PRODUCT_KEY:number,
       public SUB_APPLICABILITY:string
  ){}
}

