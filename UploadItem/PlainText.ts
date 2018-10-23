namespace CS4D {
    export namespace UploadItem {
        export class PlainText extends AbstractItem{

            constructor( text, options :Options.Options ) {
                super( options );
                this.plainText = text;
                return this;
            }

            getFile(filename: string = null): Promise<File> {
                return new Promise( (resolve, reject) => {
                    try{
                        if(filename === null){
                            filename = 'c4sd-' + ((new Date()).getTime()).toString();
                        }
                        let file = new File([this.plainText], filename);
                        resolve( file );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                } );
            }

            getDataUri(mimeType ?: string, base64 = false): Promise<string> {
                return new Promise( (resolve, reject) => {
                    if (mimeType == null) {
                        mimeType = '';
                    }
                    let base64String = '';
                    let contentString;
                    if (base64) {
                        base64String = ';base64';
                        contentString = btoa(this.plainText);
                    } else {
                        contentString = this.plainText;
                    }
                    resolve( 'data:' + mimeType + base64String + ',' + contentString );
                } );
            }

            getBase64(): Promise<string> {
                return new Promise( (resolve, reject) => {
                    resolve( btoa(this.plainText) );
                } );
            }

            getPlainText(): Promise<string> {
                return new Promise( (resolve, reject) => {
                    resolve( this.plainText );
                } );
            }

        }
    }
}