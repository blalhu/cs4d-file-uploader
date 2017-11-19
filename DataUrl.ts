namespace CS4D{
    export class DataUrl{

        private dataUrl: string;
        private content: string;
        private mimeType: string;
        private isBase64: boolean;


        constructor(dataUrl?: string){
            if(typeof dataUrl == 'undefined'){
                return;
            }
            this.dataUrl = dataUrl;
            let prefixAndContent = this.dataUrl.split(',');
            this.content = prefixAndContent[ prefixAndContent.length - 1 ];
            let mimeRegex = new RegExp('^data\:([^\/:]+\/[^;,]+)[;,]*.*$');
            let mimeMatch = mimeRegex.exec( prefixAndContent[0] );
            this.mimeType = mimeMatch[1];
            this.isBase64 = false;
            let base64Regex = new RegExp(';base64');
            if(base64Regex.test( prefixAndContent[0] )){
                this.isBase64 = true;
            }
        }

        public getDataUrl(): string{
            if(typeof this.dataUrl != 'undefined') {
                return this.dataUrl;
            }
            if(
                typeof this.content == 'undefined'
                || typeof this.isBase64 == 'undefined'

            ){
                throw new Error('Cannot get data url unless content and isBase64 is set.');
            }
            this.dataUrl = 'data:';
            if(typeof this.mimeType != 'undefined') {
                this.dataUrl += this.mimeType;
            }
            if(this.isBase64){
                this.dataUrl += ';base64';
            }
            this.dataUrl += ','+this.content;
            return this.dataUrl;
        }

        public setContent(content: string, mimeType: string, contentIsBase64: boolean): DataUrl{
            this.content = content;
            this.mimeType = mimeType;
            this.isBase64 = contentIsBase64;
            return this;
        }

        public getContent(): string{
            return this.content;
        }

        public getMimeType(): string{
            return this.mimeType;
        }

        public contentIsBase64(): boolean{
            return this.isBase64;
        }

    }
}