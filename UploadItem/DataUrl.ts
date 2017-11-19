namespace CS4D{
    export namespace UploadItem{
        export class DataUrl extends AbstractItem{

            constructor(dataUrl: string) {
                super();
                this.dataUrl = dataUrl;
            }

            getFile(filename: string = null): Promise<File>{
                return new Promise((resolve, reject) => {
                    try{
                        let dataUrlObject = new CS4D.DataUrl( this.dataUrl );
                        if(filename === null){
                            filename = 'c4sd-' + ((new Date()).getTime()).toString();
                        }
                        let file = new File([dataUrlObject.getContent()], filename, {type: dataUrlObject.getMimeType()});
                        resolve( file );
                    }catch (error) {
                        reject(error);
                        throw error;
                    }
                });
            }

            getDataUrl(): Promise<string>{
                return new Promise((resolve, reject) => {
                    resolve(this.dataUrl);
                });
            }

            getBase64(): Promise<string>{
                return new Promise((resolve, reject) => {
                    try{
                        let dataUrlObject = new CS4D.DataUrl( this.dataUrl );
                        if(dataUrlObject.contentIsBase64()){
                            resolve(dataUrlObject.getContent());
                            return;
                        }
                        resolve(
                            btoa( dataUrlObject.getContent() )
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
                        let dataUrlObject = new CS4D.DataUrl( this.dataUrl );
                        if(!dataUrlObject.contentIsBase64()){
                            resolve(dataUrlObject.getContent());
                            return;
                        }
                        resolve(
                            atob( dataUrlObject.getContent() )
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