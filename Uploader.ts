namespace CS4D {

    import AbstractItem = CS4D.UploadItem.AbstractItem;
    import FileItem = CS4D.UploadItem.FileItem;
    import DataUriItem = CS4D.UploadItem.DataUri;
    import Base64Item = CS4D.UploadItem.Base64;
    import PlainTextItem = CS4D.UploadItem.PlainText;

    export class Uploader {
        uploadList : Array<AbstractItem>;
        options :Options.Options;

        constructor( options :Options.Options ){
            this.uploadList = [];
            this.options = options;
            var massUploadStrategy = new this.options.massUploadStrategy();
            massUploadStrategy.startChecking( this );
        }

        public addAsFile(file : File) {
            if(!(file instanceof File)){
                console.log(file);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new FileItem(file, this.options);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }

        public addAsDataUri(dataUri : string) {
            if(typeof dataUri != 'string'){
                console.log(dataUri);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new DataUriItem(dataUri, this.options);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }


        public addAsBase64(dataUri : string) {
            if(typeof dataUri != 'string'){
                console.log(dataUri);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new Base64Item(dataUri, this.options);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }

        public addAsPlainText(plainText : string) {
            if(typeof plainText != 'string'){
                console.log(plainText);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new PlainTextItem(plainText, this.options);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }

        public getUploadList(): Array<AbstractItem> {
            return this.uploadList;
        }

        public setOptions( options :Options.Options ):Uploader {
            this.options = options;
            return this;
        }

        public getOptions() :Options.Options {
            return this.options;
        }

        public uploadAllQueuedTogether() :Array<AbstractItem> {
            //TODO: use xhr from options
            let xhr = new XMLHttpRequest();
            xhr.open(
                this.options.requestMethod,
                this.options.requestUrl
            );
            let formData = new FormData();
            let fieldIndex = 0;
            let processIndex = 0;
            let uploadedItems : Array<AbstractItem> = [];
            for (var i in this.uploadList) {
                let uploadItem = this.uploadList[i];
                if (  uploadItem.uploadInProgress ) {//TODO: add upload cnt limitation
                    continue;
                }
                uploadedItems.push(uploadItem);
                let uploadContent = null;
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_FILE ) {
                    uploadContent = uploadItem.getFile();
                }
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_UPLOAD_URL ) {
                    uploadContent = uploadItem.getDataUri();
                }
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_BASE64 ) {
                    uploadContent = uploadItem.getBase64();
                }
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_PLAIN_TEXT ) {
                    uploadContent = uploadItem.getPlainText();
                }
                if ( uploadContent == null ) {
                    throw new Error('Invalid upload type!');
                }
                uploadContent.then(( content ) => {
                    formData.append('file-field-'+fieldIndex++, content);
                    if (this.uploadList.length-1 == processIndex) {
                        xhr.send(formData);
                        return uploadedItems;
                    }
                    ++processIndex;
                });
            }
            return uploadedItems;
        }

        public uploadAllQueuedSeparately() :Array<AbstractItem> {
            let uploadedItems : Array<AbstractItem> = [];
            for (var i in this.uploadList) {
                let uploadItem = this.uploadList[i];
                if (  uploadItem.uploadInProgress ) {//TODO: add upload cnt limitation
                    continue;
                }
                uploadedItems.push(uploadItem);
                let uploadContent = null;
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_FILE ) {
                    uploadContent = uploadItem.uploadAsFile();
                }
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_UPLOAD_URL ) {
                    uploadContent = uploadItem.uploadAsDataUri();
                }
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_BASE64 ) {
                    uploadContent = uploadItem.uploadAsBase64();
                }
                if ( this.options.massUploadAs == Options.Options.UPLOAD_TYPE_PLAIN_TEXT ) {
                    uploadContent = uploadItem.uploadAsPlainText();
                }
                if ( uploadContent == null ) {
                    throw new Error('Invalid upload type!');
                }
            }
            return uploadedItems;
        }
    }
}