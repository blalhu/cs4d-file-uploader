namespace CS4D {
    export namespace UploadItem {
        export class FileItem extends AbstractItem {

            constructor(file: File) {
                super();
                this.file = file;
                return this;
            }

            sendBase64( xhr ) {
                let fileReader = new FileReader();
                fileReader.readAsDataURL( this.file );
                fileReader.onload = () => {
                    let formData = new FormData();
                    formData.append('file-field', fileReader.result);
                    xhr.send(formData);
                };
            }

            sendFile( xhr ){
                let formData = new FormData();
                formData.append('file-field', this.file);
                xhr.send(formData);
            }

        }
    }
}