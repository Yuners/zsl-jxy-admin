import service from "../utils/request";
let host = ''
if (process.env.NODE_ENV == 'development'){
  host = 'http://192.168.31.252:10206/'
}else {
  host = 'file/'
}

let uploadAudio = (file,name,output,quality) => {
    let formData=new FormData();
    formData.append('name',name||"音频");
    formData.append('file',file);
    formData.append('output',output||'mpeg');
    formData.append('quality',quality||'original');
    return service.post(host + 'upload/audio/binary',file,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};

let uploadImage = (file,compress) => {
    let formData=new FormData();
    formData.append('compress',compress||true);
    formData.append('file',file.file);
    return service.post(host + 'upload/image/binary',formData,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};

let uploadFile = (file) => {
    let formData=new FormData();
    formData.append('file',file);
    return service.post(host + 'upload/file/binary',formData,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};

let uploadTmp = (file) => {
    let formData=new FormData();
    formData.append('file',file);
    return service.post(host + 'upload/tmp/binary',formData,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};

let uploadVideo = (file,name,output,quality) => {
    let formData=new FormData();
    formData.append('file',file);
    formData.append('output',output||'mpeg');
    formData.append('quality',quality||'original');
    return service.post(host + 'upload/video/binary',formData,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};


export default {
    uploadAudio,
    uploadImage,
    uploadFile,
    uploadTmp,
    uploadVideo
}