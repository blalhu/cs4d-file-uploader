namespace CS4D {
    export namespace UploadType {
        export namespace DataUri {
            export namespace Input {

                import Base64Type = UploadType.Base64.Type;

                export abstract class AbstractInput {
                    protected content :Base64Type;
                    protected uriString :string;
                    getUriString() :string{
                        return this.uriString;
                    }
                    getContent() :Base64Type{
                        return this.content;
                    }
                }
            }
        }
    }
}