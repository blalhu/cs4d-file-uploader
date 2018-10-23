namespace CS4D {
    export namespace UploadType {
        export namespace DataUri {
            export namespace Input {

                export class DataUri extends AbstractInput{
                    constructor (dataUri :string) {
                        super();
                        this.uriString = dataUri;
                    }
                }

            }
        }
    }
}