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
                    resolve(new File([this.base64], 'sample.txt'));
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