namespace CS4D {
    export namespace UploadItem {
        export abstract class AbstractItem {
            file: File;
            base64: string;
            xhr: XMLHttpRequest;

            constructor(){
                this.xhr = new XMLHttpRequest();
            }

            abstract getBase64(): Promise<string>;
            abstract getFile(): Promise<File>;

            public uploadAsBase64(){
                this.xhr.open(
                    'POST',
                    'http://127.0.10.1:8084/upload-reciever.php',
                    true
                );
                this.getBase64().then((base64) => {
                    let formData = new FormData();
                    formData.append('file-field', base64);
                    this.xhr.send(formData);
                });
            }

            public uploadAsFile(){
                this.xhr.open(
                    'POST',
                    'http://127.0.10.1:8084/upload-reciever.php',
                    true
                );
                this.getFile().then((file) => {
                    let formData = new FormData();
                    formData.append('file-field', file);
                    this.xhr.send(formData);
                });
            }
        }
    }
}