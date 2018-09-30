namespace CS4D {
    export namespace UploadType {
        export class DataUri {

            constructor( data :DataUriInput ){
                this.data = data;
            }

            private data :DataUriInput;

            public static PlainTextInput(data :string, mediaType :string = null, shouldBeBase64 :boolean = false) {
                var input = new DataUriInput();
                input.plainData = data;
                input.mediaType  = mediaType;
                input.isBase64  = shouldBeBase64;
                return input;
            }

            public static Base64Input(data :string, mediaType :string = null, shouldBeBase64 :boolean = true) {
                var input = new DataUriInput();
                input.base64Data = data;
                input.mediaType   = mediaType;
                input.isBase64   = shouldBeBase64;
                return input;
            }

            public static DataUriInput(dataUri :string) {
                var input = new DataUriInput();
                input.completeData = dataUri;
                return input;
            }

            public getPlainData() {
                if (typeof this.data.plainData == 'undefined') {
                    if (typeof this.data.base64Data == 'undefined') {
                        this.data = this.getDataUriParts(this.data.completeData);
                    }
                    this.data.plainData = atob( this.data.base64Data );
                }
                return this.data.plainData;
            }

            public getBase64Data() {
                if (typeof this.data.base64Data == 'undefined') {
                    if (typeof this.data.plainData == 'undefined') {
                        this.data = this.getDataUriParts(this.data.completeData);
                    }
                    this.data.base64Data;
                }
                return this.data.base64Data;
            }

            public isBase64() {
                if (typeof this.data.isBase64 == 'undefined') {
                    this.data = this.getDataUriParts( this.data.completeData );
                }
                return this.data.isBase64;
            }

            public getMediaType() {
                if (typeof this.data.mediaType == 'undefined') {
                    this.data = this.getDataUriParts( this.data.completeData );
                }
                return this.data.mediaType;
            }

            private getDataUriParts( dataUri :string ) {
                var dataUriRegExp = new RegExp('^data\:(.+(?<!\;base64)|)(\;base64|)\,(.*)$'); //TODO: workaround for look behind
                var processedParts = dataUriRegExp.exec(dataUri);
                var returnParts = new DataUriInput();
                returnParts.completeData = dataUri;
                returnParts.mediaType = processedParts[1];
                returnParts.isBase64  = false;
                if ( processedParts[2] == ';base64' ) {
                    returnParts.isBase64 = true;
                }
                if (returnParts.isBase64) {
                    returnParts.base64Data = processedParts[3];
                    returnParts.plainData  = atob( processedParts[3] );
                } else {
                    returnParts.base64Data = btoa( processedParts[3] );
                    returnParts.plainData  = processedParts[3];
                }
                return returnParts;
            }


        }

        class DataUriInput {
            completeData;
            mediaType;
            isBase64;
            plainData;
            base64Data;
        }

    }
}