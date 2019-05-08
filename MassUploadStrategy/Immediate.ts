namespace CS4D {
    export namespace MassUploadStrategy {
        export class Immediate {

            public startChecking( uploader : Uploader ) {
                var immediateObj = this;
                setTimeout(
                    function () {
                        immediateObj.startChecking(uploader);
                    },
                    20
                );
                for (var i in uploader.uploadList) {
                    let uploadItem = uploader.uploadList[i];
                    if (uploadItem.uploadCount > 0 || uploadItem.uploadInProgress) {
                        continue;
                    }
                    if (uploadItem.options.massUploadAs == Options.Options.UPLOAD_TYPE_FILE) {
                        uploadItem.uploadAsFile();
                    }
                    if (uploadItem.options.massUploadAs == Options.Options.UPLOAD_TYPE_UPLOAD_URL) {
                        uploadItem.uploadAsDataUri();
                    }
                    if (uploadItem.options.massUploadAs == Options.Options.UPLOAD_TYPE_BASE64) {
                        uploadItem.uploadAsBase64();
                    }
                    if (uploadItem.options.massUploadAs == Options.Options.UPLOAD_TYPE_PLAIN_TEXT) {
                        uploadItem.uploadAsPlainText()
                    }
                }
            }

        }
    }
}