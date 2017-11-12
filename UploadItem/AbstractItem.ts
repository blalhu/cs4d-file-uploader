namespace CS4D {
    export namespace UploadItem {
        export abstract class AbstractItem {
            file: File;
            base64: string;
            xhr: XMLHttpRequest;

            constructor(){
                this.xhr = new XMLHttpRequest();
            }

            abstract sendBase64( xhr: XMLHttpRequest );
            abstract sendFile( xhr: XMLHttpRequest );

            public uploadAsBase64(): AbstractItem{
                this.xhr.open(
                    'POST',
                    'http://127.0.10.1:8084/upload-reciever.php',
                    true
                );
                this.sendBase64( this.xhr );
                return this;
            }

            public uploadAsFile(): AbstractItem{
                this.xhr.open(
                    'POST',
                    'http://127.0.10.1:8084/upload-reciever.php',
                    true
                );
                this.sendFile( this.xhr );
                return this;
            }
        }
    }
}