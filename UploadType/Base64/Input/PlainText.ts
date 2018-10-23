namespace CS4D {
    export namespace UploadType {
        export namespace Base64 {
            export namespace Input {

                export class PlainText implements InputInterface{
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
    }
}