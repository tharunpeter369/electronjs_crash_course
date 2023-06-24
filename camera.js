const video = document.getElementById("camera");
const cameraButon = document.getElementById("capture-image");
const imageTag = document.getElementById("image");

cameraButon.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
//   const dataUrl = canvas.toDataURL();
//   console.log(dataUrl);
//   imageTag.src = dataUrl;
const dataURL = canvas.toDataURL();
window.electronAPI.sendImage(dataURL);
});

console.log(window.electronAPI,"🥰");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //   console.log(stream);
  video.srcObject = stream;
});
