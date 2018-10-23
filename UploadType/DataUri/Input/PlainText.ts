namespace CS4D {
    export namespace UploadType {
        export namespace DataUri {
            export namespace Input {

                import Base64Type = UploadType.Base64.Type;

                export class PlainText extends AbstractInput{
                    constructor (data :string) {
                        super();
                        this.content = new Base64Type(
                            new UploadType.Base64.Input.PlainText( data ),
                            Options.PerformanceType.ALWAYSLOAD
                        );
                    }
                }
            }
        }
    }
}