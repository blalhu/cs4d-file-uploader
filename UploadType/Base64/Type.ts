namespace CS4D {
    export namespace UploadType {
        export namespace Base64 {

            import UploaderPerformanceType = CS4D.Options.PerformanceType;

            export class Type {

                private base64;

                private plainText;

                private performanceStrategy: UploaderPerformanceType;

                constructor(value: Input.InputInterface, performanceStrategy: UploaderPerformanceType) {
                    this.performanceStrategy = performanceStrategy;
                    if (value instanceof Input.Base64) {
                        try {
                            atob( value.getInputValue() );
                        } catch (e) {
                            throw new Error('[CS4D Uploader] Input type is not base64!');
                        }
                        this.base64 = value.getInputValue();
                        if (performanceStrategy == UploaderPerformanceType.PRELOAD) {
                            this.plainText = atob(this.base64);
                        }
                        return;
                    }
                    this.plainText = value.getInputValue();
                    if (performanceStrategy == UploaderPerformanceType.PRELOAD) {
                        this.base64 = btoa(this.plainText);
                    }
                }

                public getBase64(): string {
                    if (typeof this.base64 != 'undefined') {
                        return this.base64;
                    }
                    if (this.performanceStrategy == UploaderPerformanceType.ALWAYSLOAD) {
                        return btoa(this.plainText);
                    }
                    this.base64 = btoa(this.plainText);
                    return this.base64;
                }

                public getPlainText(): string {
                    if (typeof this.plainText != 'undefined') {
                        return this.plainText;
                    }
                    if (this.performanceStrategy == UploaderPerformanceType.ALWAYSLOAD) {
                        return atob(this.base64);
                    }
                    this.plainText = atob(this.base64);
                    return this.plainText;
                }

            }
        }
    }
}