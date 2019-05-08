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

        public uploadAllQueued() :Array<AbstractItem> {
            //TODO: use xhr from options
            let xhr = new XMLHttpRequest();
            xhr.open(
                this.options.requestMethod,
                this.options.requestUrl
            );
            let formData = new FormData();
            let fieldIndex = 0;
            let processIndex = 0;
            for (var i in this.uploadList) {
                let uploadItem = this.uploadList[i];
                if (  uploadItem.uploadInProgress ) {
                    continue;
                }
                uploadItem.getFile().then(( content ) => {
                    console.log(content);
                    formData.append('file-field-'+fieldIndex++, content);
                    if (this.uploadList.length-1 == processIndex) {
                        console.log('foo')
                        console.log(formData);
                        xhr.send(formData);
                    }
                    ++processIndex;
                });
            }
            //TODO: possibility to start individual requests per files
            return this.uploadList; //TODO: return the uploaded items
        }
    }
}