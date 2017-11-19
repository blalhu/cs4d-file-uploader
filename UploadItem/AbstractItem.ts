namespace CS4D {
    export namespace UploadItem {
        export abstract class AbstractItem {
            file: File;
            dataUrl: string;
            base64: string;
            xhr: XMLHttpRequest;

            constructor(){
                this.xhr = new XMLHttpRequest();
            }

            abstract getPlainText(): Promise<string>;
            abstract getBase64(): Promise<string>;
            abstract getDataUrl(mimeType?:string, base64?: boolean): Promise<string>;
            abstract getFile(filename?: string, mimeType?: string): Promise<File>;

            public uploadAsPlainText(){
                this.xhr.open(
                    'POST',
                    'http://127.0.10.1:8084/upload-reciever.php',
                    true
                );
                this.getPlainText().then((content) => {
                    let formData = new FormData();
                    console.log(content);
                    formData.append('file-field', content);
                    this.xhr.send(formData);
                });
            }

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

            public uploadAsDataUrl(){
                this.xhr.open(
                    'POST',
                    'http://127.0.10.1:8084/upload-reciever.php',
                    true
                );
                this.getDataUrl().then((dataUrl) => {
                    let formData = new FormData();
                    formData.append('file-field', dataUrl);
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