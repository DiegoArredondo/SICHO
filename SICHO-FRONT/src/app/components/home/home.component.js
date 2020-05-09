var input = document.getElementById("slider");
var output = document.getElementById("value");

output.innerHTML = input.value;

input.oninput = function(){
  output.innerHTML = this.value;
}

input.addEventListener("mousemove", function(){
  var x = input.value;
  var color = 'linear-gradient(90deg, rgb(11, 91, 241)' + x +
  '%, #e2ebfd' + x + '%)';
  input.style.background = color;
}
