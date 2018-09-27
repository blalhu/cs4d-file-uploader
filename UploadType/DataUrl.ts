namespace CS4D {
    export namespace UploadType {
        export class DataUrl {

            constructor( dataUrl :string );
            constructor( data :string, mimeType :string, base64 :boolean );
            constructor( content :string, mimeType ?:string, base64 ?:boolean ) {
            }
        }

    }
}