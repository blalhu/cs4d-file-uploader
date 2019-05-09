namespace CS4D {
    export namespace Options {
        import AbstractItem = CS4D.UploadItem.AbstractItem;
        import ImmedateStrategy = CS4D.MassUploadStrategy.Immediate;

        export class Options {

            static UPLOAD_TYPE_FILE       = 'file';
            static UPLOAD_TYPE_UPLOAD_URL = 'upload_url';
            static UPLOAD_TYPE_BASE64     = 'base64';
            static UPLOAD_TYPE_PLAIN_TEXT = 'plain_text';

            requestUrl     : string;
            requestMethod  : string = 'POST';
            massUploadAs       = Options.UPLOAD_TYPE_UPLOAD_URL;
            massUploadStrategy = ImmedateStrategy;
            onContentReady = function ( content : Promise<string|File>, xhr : XMLHttpRequest, options : Options.Options ) {
                xhr.open(
                    options.requestMethod,
                    options.requestUrl
                );
                content.then(( content ) => {
                    let formData = new FormData();
                    formData.append('file-field', content);
                    xhr.send(formData);
                });
            };
            onHeadersRecieved= function (uploadItem: AbstractItem) {
                let event = new CustomEvent(
                    'cs4d.file_uploader.upload_item.headers_recieved',
                    { detail:{upload_item:uploadItem} }
                    );
                document.dispatchEvent(event);
            };
            onLoading= function (uploadItem: AbstractItem) {
                let event = new CustomEvent(
                    'cs4d.file_uploader.upload_item.loading',
                    { detail:{upload_item:uploadItem} }
                    );
                document.dispatchEvent(event);
            };
            onDone= function (uploadItem: AbstractItem) {
                let event = new CustomEvent(
                    'cs4d.file_uploader.upload_item.done',
                    { detail:{upload_item:uploadItem} }
                    );
                document.dispatchEvent(event);
            };
            onSuccess= function (uploadItem: AbstractItem) {
                let event = new CustomEvent(
                    'cs4d.file_uploader.upload_item.success',
                    { detail:{upload_item:uploadItem} }
                    );
                document.dispatchEvent(event);
            };
            onFail= function (uploadItem: AbstractItem) {
                let event = new CustomEvent(
                    'cs4d.file_uploader.upload_item.fail',
                    { detail:{upload_item:uploadItem} }
                    );
                document.dispatchEvent(event);
            };
            onProgressChange= function (uploadItem: AbstractItem, fullSize, loadedSize) {
                let event = new CustomEvent(
                    'cs4d.file_uploader.upload_item.progress_change',
                    { detail:{upload_item:uploadItem, full_size:fullSize, loaded_size:loadedSize} }
                    );
                document.dispatchEvent(event);
            };
        }
    }
}