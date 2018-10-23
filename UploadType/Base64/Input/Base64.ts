namespace CS4D {
    export namespace UploadType {
        export namespace Base64 {
            export namespace Input {

                export class Base64 implements InputInterface{
                    private input :string;

                    constructor ( base64 :string ) {
                        this.input = base64;
                    }

                    public getInputValue():string {
                        return this.input;
                    }
                }

            }
        }
    }
}