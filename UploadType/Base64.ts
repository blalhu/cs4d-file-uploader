namespace CS4D {
    export namespace UploadType {

        import UploaderPerformanceType =  CS4D.Options.PerformanceType;

        export class Base64 {

            private base64;

            private plainText;

            private performanceStrategy :UploaderPerformanceType;

            constructor ( value :Input, performanceStrategy :UploaderPerformanceType ) {
                this.performanceStrategy = performanceStrategy;
                if (value instanceof Base64Input) {
                    this.base64 = value.getInputValue();
                    if (performanceStrategy == UploaderPerformanceType.PRELOAD) {
                        this.plainText = atob( this.base64 );
                    }
                    return;
                }
                this.plainText = value.getInputValue();
                if (performanceStrategy == UploaderPerformanceType.PRELOAD) {
                    this.base64 = btoa( this.plainText );
                }
            }

            public getBase64():string
            {
                if (typeof this.base64 != 'undefined') {
                    return this.base64;
                }
                if (this.performanceStrategy == UploaderPerformanceType.ALWAYSLOAD) {
                    return btoa( this.plainText );
                }
                this.base64 = btoa( this.plainText );
                return this.base64;
            }

            public getPlainText():string
            {
                if (typeof this.plainText != 'undefined') {
                    return this.plainText;
                }
                if (this.performanceStrategy == UploaderPerformanceType.ALWAYSLOAD) {
                    return atob( this.base64 );
                }
                this.plainText = atob( this.base64 );
                return this.plainText;
            }

        }

        interface Input {
            getInputValue():string;
        }

        export class Base64Input implements Input{
            private input :string;

            constructor ( base64 :string ) {
                this.input = base64;
            }

            public getInputValue():string {
                return this.input;
            }
        }


        export class PlainTextInput implements Input{
            private input :string;

            constructor ( text :string ) {
                this.input = text;
            }

            public getInputValue():string {
                return this.input;
            }
        }
    }
}