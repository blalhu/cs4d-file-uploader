namespace CS4D {
    export namespace MassUploadStrategy {
        export class Packed {

            newPackAddedAt = null;

            public startChecking( uploader : Uploader ) {
                var immediateObj = this;
                setTimeout(
                    function () {
                        immediateObj.startChecking(uploader);
                    },
                    20
                )
                var uploadableLenght = 0;
                for (var i in uploader.uploadList) {
                    let uploadItem = uploader.uploadList[i];
                    if (uploadItem.uploadCount > 0 || uploadItem.uploadInProgress) {
                        continue;
                    }
                    uploadableLenght++;
                }
                if ( uploadableLenght > 0 && this.newPackAddedAt == null ) {
                    this.newPackAddedAt = (new Date()).getTime();
                }
                if (this.newPackAddedAt == null) {
                    return;
                }
                if (
                    uploadableLenght < 5
                    && (
                        ((new Date()).getTime() - this.newPackAddedAt) < 10000
                        || uploadableLenght < 1
                    )
                ) {
                    return;
                }
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
                    this.newPackAddedAt = null;
                }
            }

        }
    }
}