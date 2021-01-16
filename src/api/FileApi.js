import service from "../utils/request";
let host = ''
if (process.env.NODE_ENV == 'development'){
//   host = 'http://192.168.31.252:10206/'
  host = 'http://192.124.1.57:5021/file/'
}else {
  host = 'file/'
}

/**
 * 上传音频
 * @param file
 * @param name
 * @param output
 * @param quality
 * @returns {AxiosPromise<any>}
 */
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

/**
 * 上传图片
 * @param file
 * @param name
 * @param output
 * @param quality
 * @returns {AxiosPromise<any>}
 */
let uploadImage = (file,compress) => {
    let formData=new FormData();
    formData.append('compress',compress||true);
    formData.append('file',file.file);
    return service.post(host + 'upload/image/binary',formData,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};

/**
 * 上传附件
 * @param file
 * @param name
 * @param output
 * @param quality
 * @returns {AxiosPromise<any>}
 */
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

/**
 * 上传视频
 * @param file
 * @param name
 * @param output
 * @param quality
 * @returns {AxiosPromise<any>}
 */
let uploadVideo = (file,output,quality) => {
    let formData=new FormData();
    formData.append('file',file.file);
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
