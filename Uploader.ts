namespace CS4D {

    import AbstractItem = CS4D.UploadItem.AbstractItem;
    import FileItem = CS4D.UploadItem.FileItem;
    import DataUrlItem = CS4D.UploadItem.DataUrl;

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

        public addAsDataUrl(dataUrl : string) {
            if(typeof dataUrl != 'string'){
                console.log(dataUrl);
                throw new Error('Invalid argument type!');
            }
            let currentUploadItem = new DataUrlItem(dataUrl);
            this.uploadList.push( currentUploadItem );
            return currentUploadItem;
        }

        public getUploadList(): Array<AbstractItem> {
            return this.uploadList;
        }
    }
}