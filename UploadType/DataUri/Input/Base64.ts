namespace CS4D {
    export namespace UploadType {
        export namespace DataUri {
            export namespace Input {

                import Base64Type = UploadType.Base64.Type;

                export class Base64 extends AbstractInput{
                    constructor (data :string) {
                        super();
                        this.content = new Base64Type(
                            new UploadType.Base64.Input.Base64( data ),
                            Options.PerformanceType.ALWAYSLOAD
                        );
                    }
                }

            }
        }
    }
}