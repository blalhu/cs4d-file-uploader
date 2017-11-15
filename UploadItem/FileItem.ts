namespace CS4D {
    export namespace UploadItem {
        export class FileItem extends AbstractItem {

            constructor(file: File) {
                super();
                this.file = file;
                return this;
            }

            getBase64(): Promise<string>{
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