let uploadVideoFile = (file, convertFile) => {
    console.log(`Uploading videofile ${file}to the editor`);  
    upload();
    convertFile(file);
};

let convertVideoFiletoAudio = (file) => {
    console.log(`Converted file ${file} to audio`);
};

let upload

var file = "Hello.mp4"
uploadVideoFile(file, convertVideoFiletoAudio);