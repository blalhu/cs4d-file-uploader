namespace CS4D {

    import AbstractItem = CS4D.UploadItem.AbstractItem;
    import FileItem = CS4D.UploadItem.FileItem;
    import Base64Item = CS4D.UploadItem.Base64Item;

    export class Uploader {
        uploadList : Array<AbstractItem>;

        constructor(){
            this.uploadList = [];
        }

        public addAsFile(file : File) {
            if(!(file instanceof File)){
                console.log(file);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new FileItem(file);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }

        public addAsBase64(base64: string) {
            if(typeof base64 != 'string'){
                console.log(base64);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new Base64Item(base64);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }

        public getUploadList(): Array<AbstractItem> {
            return this.uploadList;
        }
    }
}