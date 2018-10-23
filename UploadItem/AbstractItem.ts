namespace CS4D {
    export namespace UploadItem {

        import Base64Type = UploadType.Base64.Type;
        import DataUriType = UploadType.DataUri.Type;

        export abstract class AbstractItem {

            file: File;
            dataUri: DataUriType;
            base64: Base64Type;
            plainText: string;
            xhr: XMLHttpRequest;
            options :Options.Options;

            constructor( options :Options.Options ){
                this.xhr = new XMLHttpRequest();
                this.options = options;
            }

            abstract getPlainText(): Promise<string>;
            abstract getBase64(): Promise<string>;
            abstract getDataUri(mimeType?:string, base64?: boolean): Promise<string>;
            abstract getFile(filename?: string, mimeType?: string): Promise<File>;

            public uploadAsPlainText(){
                this.xhr.open(
                    'POST',
                    this.options.uploadUrl,
                    true
                );
                this.getPlainText().then((content) => {
                    let formData = new FormData();
                    formData.append('file-field', content);
                    this.xhr.send(formData);
                });
            }

            public uploadAsBase64(){
                this.xhr.open(
                    'POST',
                    this.options.uploadUrl,
                    true
                );
                this.getBase64().then((base64) => {
                    let formData = new FormData();
                    formData.append('file-field', base64);
                    this.xhr.send(formData);
                });
            }

            public uploadAsDataUri(){
                this.xhr.open(
                    'POST',
                    this.options.uploadUrl,
                    true
                );
                this.getDataUri().then((dataUri) => {
                    let formData = new FormData();
                    formData.append('file-field', dataUri);
                    this.xhr.send(formData);
                });
            }

            public uploadAsFile(filename: string = null){
                this.xhr.open(
                    'POST',
                    this.options.uploadUrl,
                    true
                );
                this.getFile(filename).then((file) => {
                    let formData = new FormData();
                    formData.append('file-field', file);
                    this.xhr.send(formData);
                });
            }
        }
    }
}