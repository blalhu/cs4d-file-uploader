Client-side Scripts For Developers -- File Uploader
===================================================

Introduction
------------

There's two reason why I started this project:
- I have seen many uploaders which were quite over implemented. In other words
if you wanted to use them to a bit differently than how the creators imagined, 
you have to sturggle to workaround (etc.) the original possibilities.
- When I planned to start this hobby project, I was also wanted to took a
bit closer look at typescript. I think it's a great (tool) language to create
an easily maintainable code.

Usage
-----

### Demo

I you want to start with already working examples, [here](https://gitlab.com/pelso/cs4d-file-uploader-dev) you can find a repo
where I demonstrated the capabilities, of the project. 

### Basic usage

Define where and how you want to upload:
```javascript
    var uploaderOptions = new CS4D.Options.Options();
    uploaderOptions.requestUrl = 'http://127.0.0.1:8085/upload-reciever.php';
    uploaderOptions.massUploadStrategy = CS4D.MassUploadStrategy.Manual;
    uploaderOptions.massUploadAs = CS4D.Options.Options.UPLOAD_TYPE_FILE;
```

Create an uploader instance:
```javascript
    var uploader = new CS4D.Uploader(uploaderOptions);
```

Upload a simple string as a file:
```javascript
    var textAsFile = uploader.addAsPlainText( 'Lorem ipsum...' );
    textAsFile.uploadAsFile();
```

#### Possible formats
- PlainText
- Base64
- DataUri
- File (as described [here](https://developer.mozilla.org/en-US/docs/Web/API/File))

Even we talk about the input, or the format how you want to transmit the
data, you can use these above, with the following methods:
```javascript
    var textAsFile      = uploader.addAsPlainText( text );
    var base64AsDataUri = uploader.addAsBase64(    base64 );
    var dataUriAsBase64 = uploader.addAsDataUri(   fileDataUri );
    var fleAsText       = uploader.addAsFile(      file );
    textAsFile.uploadAsFile();
    base64AsDataUri.uploadAsDataUri();
    dataUriAsBase64.uploadAsBase64();
    fleAsText.uploadAsPlainText();
```

#### Upload strategies
After you pass a new upload item to an instance, the three following options could happen:
- Manual -- doesn't do any automated
- Packed -- waits for 5 new opload item or for a specific time till starts the uploads
- Immediate -- automaticly uploads the item after passed to the upload list
- (Custom, if you override the original Option object)
```javascript
    uploaderOptions.massUploadStrategy = CS4D.MassUploadStrategy.Manual;
    uploaderOptions.massUploadStrategy = CS4D.MassUploadStrategy.Packed;
    uploaderOptions.massUploadStrategy = CS4D.MassUploadStrategy.Immediate;
```

#### Events

Events triggered individually by UploadItems:
- cs4d.file_uploader.upload_item.headers_recieved
- cs4d.file_uploader.upload_item.loading
- cs4d.file_uploader.upload_item.done
- cs4d.file_uploader.upload_item.success
- cs4d.file_uploader.upload_item.fail
- cs4d.file_uploader.upload_item.up_progress_change
- cs4d.file_uploader.upload_item.down_progress_change

Every event returns with an UploadItem parameter, and the last two 
gives back information about the up/download phase:
```javascript
    document.addEventListener('cs4d.file_uploader.upload_item.up_progress_change', function (evt) {
        evt.detail.upload_item // UploadItem
        evt.detail.loaded_size // loaded data in bytes
        evt.detail.full_size   // loadable siye in bytes
    });
```

#### Mass upload

You have the chance to use the already implemented automatic upload mechanism.

First you have to set a strategy, the method, you want to trigger the uploads:
```javascript
    uploaderOptions.massUploadStrategy = CS4D.MassUploadStrategy.Immediate;
```

Than you have to define, the upload format:
```javascript
    uploaderOptions.massUploadAs = CS4D.Options.Options.UPLOAD_TYPE_FILE;
```
Or anything else from above:
- UPLOAD_TYPE_FILE
- UPLOAD_TYPE_UPLOAD_URL
- UPLOAD_TYPE_BASE64
- UPLOAD_TYPE_PLAIN_TEXT

And than just pass content for the uploader:
```html
    <input type="file" name="foo" multiple onchange="fileOnChangeMassTest(this.files)" />
```

```javascript
    function fileOnChangeMassTest( files ) {
        for (var fi in files) {
            var file = files[fi];
            if (!(file instanceof File)) {
                continue;
            }
            uploader.addAsFile(file);
        }
    }
```

### Custom uploads

You can modify many things via the Options. For eg. you can pass,
or create your own xhr object:
```javascript
    uploaderCustomOptions.onContentReady = function ( content , xhr, options ) {
        xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (ev) {
            console.log(['upload', ev.total, ev.loaded]);
        };
        xhr.onprogress = function (ev) {
            console.log(['response', ev.total, ev.loaded]);
        };
        // and so on ...
    }
```

or create a custom upload strategy:
```javascript
    uploaderCustomOptions.massUploadStrategy = function() {
        return {
            startChecking: function( uploader ) {
                var immediateObj = this;
                setTimeout(
                        function () {
                            immediateObj.startChecking(uploader);
                        },
                        1500
                );
                for (var i in uploader.uploadList) {
                    var uploadItem = uploader.uploadList[i];
                    if (uploadItem.uploadCount > 0 || uploadItem.uploadInProgress) {
                        continue;
                    }
                    uploadItem.uploadAsFile();
                }
            }
        };
    };
```


