namespace CS4D {
    export namespace UploadItem {
        export class Base64 extends AbstractItem {

            constructor(base64: string) {
                super();
                this.base64 = base64;
            }

            getFile(filename: string = null): Promise<File> {
                return new Promise( (resolve, reject) => {
                    try{
                        if(filename === null){
                            filename = 'c4sd-' + ((new Date()).getTime()).toString();
                        }
                        let file = new File([atob(this.base64)], filename);
                        resolve( file );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                } );
            }

            getDataUrl(mimeType ?: string, base64 = false): Promise<string> {
                return new Promise( (resolve, reject) => {
                    if (mimeType == null) {
                        mimeType = '';
                    }
                    let base64String = '';
                    let contentString;
                    if (base64) {
                        base64String = ';base64';
                        contentString = this.base64;
                    } else {
                        contentString = atob(this.base64);
                    }
                    resolve( 'data:' + mimeType + base64String + ',' + contentString );
                } );
            }

            getBase64(): Promise<string> {
                return new Promise( (resolve, reject) => {
                    resolve( this.base64 );
                } );
            }

            getPlainText(): Promise<string> {
                return new Promise( (resolve, reject) => {
                    resolve( atob( this.base64 ) );
                } );
            }

        }
    }
}