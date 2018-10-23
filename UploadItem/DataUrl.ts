namespace CS4D{
    export namespace UploadItem{

        import DataUriType = UploadType.DataUri.Type;

        export class DataUrl extends AbstractItem{

            constructor(dataUrl: string) {
                super();
                this.dataUrl = new DataUriType( new UploadType.DataUri.Input.DataUri( dataUrl ) );
            }

            getFile(filename: string = null): Promise<File>{
                return new Promise((resolve, reject) => {
                    try{
                        if(filename === null){
                            filename = 'c4sd-' + ((new Date()).getTime()).toString();
                        }
                        let file = new File([this.dataUrl.getPlainData()], filename, {type: this.dataUrl.getMediaType().split(';')[0]});
                        resolve( file );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                });
            }

            getDataUri(): Promise<string>{
                return new Promise((resolve, reject) => {
                    resolve(this.dataUrl.getDataUri());
                });
            }

            getBase64(): Promise<string>{
                return new Promise((resolve, reject) => {
                    try{
                        resolve(
                            this.dataUrl.getBase64Data()
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
                            this.dataUrl.getPlainData()
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