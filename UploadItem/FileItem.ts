namespace CS4D {
    export namespace UploadItem {
        export class FileItem extends AbstractItem {

            constructor(file: File) {
                super();
                this.file = file;
                return this;
            }

            getPlainText(): Promise<string>{
                return new Promise((resolve, reject) => {
                    this.getDataUrl()
                        .then((dataUrl) => {
                            let dataUrlObj = new CS4D.DataUrl( dataUrl );
                            if(!dataUrlObj.contentIsBase64()){
                                resolve( dataUrlObj.getContent() );
                                return;
                            }
                            resolve(
                                atob( dataUrlObj.getContent() )
                            );
                        })
                        .catch((error) => {
                            reject(error);
                        })
                    ;
                });
            }

            getBase64(): Promise<string>{
                return new Promise((resolve, reject) => {
                    this.getDataUrl()
                        .then((dataUrl) => {
                            let dataUrlObj = new CS4D.DataUrl( dataUrl );
                            if(dataUrlObj.contentIsBase64()){
                                resolve( dataUrlObj.getContent() );
                                return;
                            }
                            resolve(
                                btoa( dataUrlObj.getContent() )
                            );
                        })
                        .catch((error) => {
                            reject(error);
                        })
                    ;
                });
            }

            getDataUrl(): Promise<string>{
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