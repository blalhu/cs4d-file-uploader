namespace CS4D {
    export namespace UploadItem {
        export class Base64Item extends AbstractItem {

            constructor(base64) {
                super();
                this.base64 = base64;
                return this;
            }

            getFile(): Promise<File>{
                return new Promise((resolve, reject) => {
                    let mime = this.base64.split(';')[0];
                    if(mime == this.base64){
                        mime = '';
                    }
                    let prefixAndContent = this.base64.split(',');
                    let base64 = prefixAndContent[ prefixAndContent.length - 1 ];
                    let fileProperties = {};
                    if( prefixAndContent.length > 1 ){
                        let mime = '';
                        let mimeRegex = new RegExp('^data\:([^\/:]+\/[^;,]+)[;,]*.*$');
                        let mimeMatch = mimeRegex.exec( prefixAndContent[0] );
                        if(mimeMatch.length == 2){
                            mime = mimeMatch[1];
                        }
                        fileProperties = {
                            type: mime
                        };
                    }
                    resolve(new File([ window.atob(base64) ], 'sample.txt', fileProperties));
                });
            }

            getBase64(): Promise<string>{
                return new Promise((resolve, reject) => {
                    resolve(this.base64);
                });
            }

        }
    }
}