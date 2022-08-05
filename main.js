var previousResult=""
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoaded)
}
function modelLoaded() {
  console.log("model is loaded")
}
function draw() {
  image(video,0,0,300,300)
  classifier.classify(video,gotResult)
}
function gotResult(error,results) {
if(error) {
  console.log(error)
}
else{
  if((results[0].confidence>0.5)&&(previousResult!=results[0].label)){
    console.log(results)
    previousResult=results[0].label
    synth=window.speechSynthesis;
    var utter=new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utter)
    document.getElementById("result_name").innerHTML=results[0].label
    document.getElementById("result_accuracy").innerHTML=results[0].confidence.toFixed(2)+"%"
  }
}
}



