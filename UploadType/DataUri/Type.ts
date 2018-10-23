namespace CS4D {
    export namespace UploadType {
        export namespace DataUri {

            import UploaderPerformanceType = CS4D.Options.PerformanceType;
            import Base64Base64Input = CS4D.UploadType.Base64.Input.Base64;
            import Base64PlainInput = CS4D.UploadType.Base64.Input.PlainText;

            export class Type {

                constructor(input: Input.AbstractInput, performanceStrategy: UploaderPerformanceType) {
                    this.performanceStrategy = performanceStrategy;
                    this.content = input.getContent();
                    this.uriString = input.getUriString();
                    if (this.performanceStrategy != UploaderPerformanceType.PRELOAD) {
                        return;
                    }
                    if (typeof this.uriString == 'undefined') {
                        return;
                    }
                    this.uriParts = this.getDataUriParts(this.uriString);
                    this.content = this.uriParts.content;
                }

                private content: UploadType.Base64.Type
                private uriString: string;
                private uriParts: DataUriValues;
                private performanceStrategy: UploaderPerformanceType;

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

                public getDataUri(mediaType: string = null, isBase64: boolean = null) {
                    if (
                        mediaType == null
                        && isBase64 == null
                        && typeof this.uriString != 'undefined'
                    ) {
                        return this.uriString;
                    }
                    let dataUriParts = new DataUriValues();
                    if (typeof this.uriString != 'undefined') {
                        dataUriParts = this.getDataUriParts(this.uriString);
                    } else {
                        dataUriParts.content = this.content;
                        if (mediaType != null) {
                            dataUriParts.mediaType = mediaType;
                        }
                        if (isBase64 != null) {
                            dataUriParts.isBase64 = isBase64;
                        }
                    }
                    let dataUri = 'data:';
                    if (typeof dataUriParts.mediaType != 'undefined') {
                        dataUri += <string> dataUriParts.mediaType;
                    }
                    if (isBase64 == true) {
                        dataUri += ';base64';
                    }
                    dataUri += ',';
                    if (isBase64) {
                        dataUri += dataUriParts.content.getBase64();
                    } else {
                        dataUri += dataUriParts.content.getPlainText();
                    }
                    if (this.performanceStrategy == Options.PerformanceType.LAZYLOAD) {
                        this.uriParts = dataUriParts;
                    }
                    return dataUri;
                }

                public getDataUriParts(dataUri: string = null) {
                    if (dataUri == null) {
                        dataUri = this.uriString
                    }
                    var dataUriRegExp = new RegExp('^data\:([^\,]*)\,(.*)$'); //TODO: workaround for look behind
                    var processedParts = dataUriRegExp.exec(dataUri);
                    var returnParts = new DataUriValues();
                    returnParts.completeData = dataUri;
                    returnParts.mediaType = processedParts[1].split(';base64')[0];
                    returnParts.isBase64 = false;
                    if (processedParts[1].match(/;base64$/)) {
                        returnParts.isBase64 = true;
                    }
                    if (returnParts.isBase64) {
                        returnParts.content = new UploadType.Base64.Type(
                            new Base64Base64Input(processedParts[2]),
                            this.performanceStrategy
                        );
                    } else {
                        returnParts.content = new UploadType.Base64.Type(
                            new Base64PlainInput(processedParts[2]),
                            this.performanceStrategy
                        );
                    }
                    return returnParts;
                }

            }

        }

        class DataUriValues {
            completeData :string;
            mediaType :string;
            isBase64 :boolean;
            content :UploadType.Base64.Type;
        }

    }
}