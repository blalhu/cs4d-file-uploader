namespace CS4D{
    export namespace UploadItem{

        import DataUriType = UploadType.DataUri.Type;

        export class DataUri extends AbstractItem{

            constructor(dataUri: string, options :Options.Options) {
                super(options);
                this.dataUri = new DataUriType( new UploadType.DataUri.Input.DataUri( dataUri ) );
            }

            getFile(filename: string = null): Promise<File>{
                return new Promise((resolve, reject) => {
                    try{
                        if(filename === null){
                            filename = 'c4sd-' + ((new Date()).getTime()).toString();
                        }
                        let file = new File([this.dataUri.getPlainData()], filename, {type: this.dataUri.getMediaType().split(';')[0]});
                        resolve( file );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                });
            }

            getDataUri(): Promise<string>{
                return new Promise((resolve, reject) => {
                    resolve(this.dataUri.getDataUri());
                });
            }

            getBase64(): Promise<string>{
                return new Promise((resolve, reject) => {
                    try{
                        resolve(
                            this.dataUri.getBase64Data()
                        );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                });
            }

            getPlainText(): Promise<string>{
                return new Promise((resolve, reject) => {
                    try{
                        resolve(
                            this.dataUri.getPlainData()
                        );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                });
            }


        }
    }
}