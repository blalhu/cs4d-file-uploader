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
            uploadItemId :string;
            uploadCount :number;
            uploadInProgress :boolean;

            constructor( options :Options.Options, xhr? :XMLHttpRequest, name? :string ){
                this.xhr = xhr; //TODO: this should be a clone
                this.uploadCount = 0;
                this.uploadInProgress = false;
                if (this.xhr == null) {
                    this.xhr = this.getDefaultXhr();
                }
                this.options = options;
                if (name == null) {
                    this.uploadItemId = Math.random().toString();
                }
            }

            abstract getPlainText(): Promise<string>;
            abstract getBase64(): Promise<string>;
            abstract getDataUri(mimeType?:string, base64?: boolean): Promise<string>;
            abstract getFile(filename?: string, mimeType?: string): Promise<File>;

            public uploadAsPlainText(){
                this.uploadInProgress = true;
                this.options.onContentReady( this.getPlainText(), this.xhr, this.options );
            }

            public uploadAsBase64(){
                this.uploadInProgress = true;
                this.options.onContentReady( this.getBase64(), this.xhr, this.options );
            }

            public uploadAsDataUri(){
                this.uploadInProgress = true;
                this.options.onContentReady( this.getDataUri(), this.xhr, this.options );
            }

            public uploadAsFile(filename: string = null){
                this.uploadInProgress = true;
                this.options.onContentReady( this.getFile(), this.xhr, this.options );
            }

            private getDefaultXhr(){
                let xhr = new XMLHttpRequest();
                let that = this;
                xhr.onreadystatechange = function (event) {
                    switch ( xhr.readyState ) {
                        case 2:
                            that.options.onHeadersRecieved(that);
                            that.uploadInProgress = true;
                            break;
                        case 3:
                            that.options.onLoading(that);
                            that.uploadInProgress = true;
                            break;
                        case 4:
                            that.options.onDone(that);
                            that.uploadCount++;
                            that.uploadInProgress = false;
                            if ( xhr.status >= 400 ) {
                                that.options.onFail(that);
                            } else {
                                that.options.onSuccess(that);
                            }
                            break;
                    }
                };
                xhr.onprogress = function (event: ProgressEvent) {
                    that.options.onProgressChange(that, event.total, event.loaded);
                };
                return xhr;
            }
        }
    }
}