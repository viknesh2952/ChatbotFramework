export class RefCodesHeader{
    constructor(
        public RCH_HEADER_KEY: number,
        public RCH_DESCRIPTION: string,
        public RCH_DOMAIN_NAME: string,
        public RCH_DOMAIN_TYPE: string,
        public RCH_LOCK_KEY: number,
        public RCH_MODULE_KEY: number,
        public RCH_PRODUCT_KEY: number        
        ){}
}   
export class RefCodesDetail{
    constructor(
        public RCD_ABBREVIATION:string,
        public RCD_DETAIL_KEY:number,
        public RCD_HEADER_KEY:number,
        public RCD_HIGH_RANGE:number,
        public RCD_LOCK_KEY:number,
        public RCD_LOW_RANGE:number,
        public RCD_MEANING:string,
        public RCD_ORDER_BY:number,
        public RCD_SET_AS_DEFAULT:string,
        public RCD_VALUE:string
    ){}
}

 
