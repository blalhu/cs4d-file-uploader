namespace CS4D {
    export namespace UploadItem {

        import DataUriType = UploadType.DataUri.Type;

        export class FileItem extends AbstractItem {

            constructor(file: File) {
                super();
                this.file = file;
                return this;
            }

            getPlainText(): Promise<string>{
                return new Promise((resolve, reject) => {
                    this.getDataUri()
                        .then((dataUrl) => {
                            let dataUrlObj = new DataUriType( new UploadType.DataUri.Input.DataUri( dataUrl ) );
                            resolve( dataUrlObj.getPlainData() );
                        })
                        .catch((error) => {
                            reject(error);
                        })
                    ;
                });
            }

            getBase64(): Promise<string>{
                return new Promise((resolve, reject) => {
                    this.getDataUri()
                        .then((dataUrl) => {
                            let dataUrlObj = new DataUriType( new UploadType.DataUri.Input.DataUri( dataUrl ) );
                            resolve( dataUrlObj.getBase64Data() );
                        })
                        .catch((error) => {
                            reject(error);
                        })
                    ;
                });
            }

            getDataUri(): Promise<string>{
                return new Promise((resolve, reject) => {
                    let fileReader = new FileReader();
                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    };
                    fileReader.onerror = () => {
                        reject( fileReader.error );
                    };
                    fileReader.readAsDataURL( this.file );
                });
            }

            getFile(): Promise<File>{
                return new Promise((resolve, reject) => {
                    resolve(this.file);
                });
            }

        }
    }
}