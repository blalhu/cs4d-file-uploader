namespace CS4D {
    export namespace UploadItem {

        import Base64Type = UploadType.Base64.Type;
        import DataUriType = UploadType.DataUri.Type;

        export class Base64 extends AbstractItem {

            constructor(base64: string, options :Options.Options) {
                super(options);
                this.base64 = new Base64Type( new UploadType.Base64.Input.Base64(base64) );
            }

            getFile(filename: string = null): Promise<File> {
                return new Promise( (resolve, reject) => {
                    try{
                        if(filename === null){
                            filename = 'c4sd-' + ((new Date()).getTime()).toString();
                        }
                        let file = new File([this.base64.getPlainText()], filename);
                        resolve( file );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                } );
            }

            getDataUri(mimeType ?: string, base64 = false): Promise<string> {
                return new Promise( (resolve, reject) => {
                    let dataUri = new DataUriType( new UploadType.DataUri.Input.Base64( this.base64.getBase64() ) );
                    resolve( dataUri.getDataUri(mimeType, base64) );
                } );
            }

            getBase64(): Promise<string> {
                return new Promise( (resolve, reject) => {
                    resolve( this.base64.getBase64() );
                } );
            }

            getPlainText(): Promise<string> {
                return new Promise( (resolve, reject) => {
                    resolve( this.base64.getPlainText() );
                } );
            }

        }
    }
}