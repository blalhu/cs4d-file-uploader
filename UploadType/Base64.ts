namespace CS4D {
    export namespace UploadType {
        export class Base64 {

            private base64;

            private plainText;

            constructor ( base64OrPlainText :string ) {
                try {
                    this.plainText = atob( base64OrPlainText );
                    this.base64    = base64OrPlainText;
                } catch (e) {
                    this.base64    = btoa( base64OrPlainText );
                    this.plainText = base64OrPlainText;
                }
            }

            public getBase64()
            {
                return this.base64;
            }

            public getPlainText()
            {
                return this.plainText;
            }

        }
    }
}