namespace CS4D {
    export namespace UploadType {

        import UploaderPerformanceType = CS4D.Options.PerformanceType;
        import Base64Base64Input = CS4D.UploadType.Base64Input;
        import Base64PlainInput  = CS4D.UploadType.PlainTextInput;
        import PlainText = CS4D.UploadItem.PlainText;

        export class DataUri {

            constructor( input :DataUriInput, performanceStrategy :UploaderPerformanceType ){
                this.performanceStrategy = performanceStrategy;
                this.content             = input.getContent();
                this.uriString           = input.getUriString();
                if ( this.performanceStrategy != UploaderPerformanceType.PRELOAD ) {
                    return;
                }
                if (typeof this.uriString == 'undefined') {
                    return;
                }
                this.uriParts = this.getDataUriParts(this.uriString);
                this.content  = this.uriParts.content;
            }

            private content :Base64;
            private uriString :string;
            private uriParts :DataUriValues;
            private performanceStrategy :UploaderPerformanceType;

            public getPlainData() {
                return this.content.getPlainText();
            }

            public getBase64Data() {
                return this.content.getBase64();
            }

            public isBase64() {
                return this.uriParts.isBase64;
            }

            public getMediaType() {
                return this.uriParts.mediaType;
            }

            public getDataUri() {

            }

            public getDataUriParts( dataUri :string ) {
                var dataUriRegExp = new RegExp('^data\:(.+(?<!\;base64)|)(\;base64|)\,(.*)$'); //TODO: workaround for look behind
                var processedParts = dataUriRegExp.exec(dataUri);
                var returnParts = new DataUriValues();
                returnParts.completeData = dataUri;
                returnParts.mediaType = processedParts[1];
                returnParts.isBase64  = false;
                if ( processedParts[2] == ';base64' ) {
                    returnParts.isBase64 = true;
                }
                if (returnParts.isBase64) {
                    returnParts.content = new Base64(
                        new Base64Base64Input(processedParts[3]),
                        this.performanceStrategy
                    );
                } else {
                    returnParts.content = new Base64(
                        new Base64PlainInput(processedParts[3]),
                        this.performanceStrategy
                    );
                }
                return returnParts;
            }

        }

        class DataUriValues {
            completeData :string;
            mediaType :string;
            isBase64 :boolean;
            content :Base64;
        }
        
        abstract class Input {
            protected content :Base64;
            protected uriString :string;
            getUriString() :string{
                return this.uriString;
            }
            getContent() :Base64{
                return this.content;
            }
        }

        class PlainTextInput extends Input {
            constructor (data :string) {
                super();
                this.content = new Base64(
                    new UploadType.PlainTextInput( data ),
                    Options.PerformanceType.ALWAYSLOAD
                );
            }
        }

        class Base64Input extends Input {
            constructor (data :string) {
                super();
                this.content = new Base64(
                    new UploadType.Base64Input( data ),
                    Options.PerformanceType.ALWAYSLOAD
                );
            }
        }

        class DataUriInput extends Input {
            constructor (dataUri :string) {
                super();
                this.uriString = dataUri;
            }
        }

    }
}