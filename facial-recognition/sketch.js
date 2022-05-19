
let sketch = function(p){
  let canvas;
  let dMouse = [];
  let closest = 0;
  let isEditMode = false;

  let fill_H_Slider;
  let fill_H_Value;
  let stroke_H_Slider;
  let stroke_H_Value;

let shapes = [{
  fill_H : p.random(360),
  stroke_H : p.random(360),
  indices: []
}];

let shapeIndex = 0;

  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id('canvas');

    p.colorMode(p.HSB);
    
    fill_H_Value = p.createDiv();
    fill_H_Value.class('valueDisplay');
    fill_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    fill_H_Slider.class('Slider');

    stroke_H_Value = p.createDiv();
    stroke_H_Value.class('valueDisplay');
    stroke_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    stroke_H_Slider.class('Slider');
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >=1){
        p.drawShapes();
        if(isEditMode== true){
          p.faceMesh(); 
          p.editShapes();
        }
        p.glow();
      }
    }

    fill_H_Value.html("fill hue:" + fill_H_Slider.value());
    stroke_H_Value.html("stroke hue:" + stroke_H_Slider.value());
  }

  p.faceMesh = function(){
    p.stroke(255);
    p.strokeWeight(3);

    p.beginShape(p.POINTS);
    for(let i=0; i<detections.multiFaceLandmarks[0].length; i++){
      let x = detections.multiFaceLandmarks[0][i].x * p.width;
      let y = detections.multiFaceLandmarks[0][i].y * p.height;
      p.vertex(x, y);

      let d = p.dist(x, y, p.mouseX, p.mouseY);
      dMouse.push(d);
  }  
  p.endShape();

  let minimum = p.min(dMouse);
  closest = dMouse.indexOf(minimum);

  p.stroke(0, 100, 100);
  p.strokeWeight(10);
  p.point(
    detections.multiFaceLandmarks[0][closest].x * p.width,
    detections.multiFaceLandmarks[0][closest].y * p.height
  );

  dMouse.splice(0, dMouse.length);
}

p.mouseClicked = function(){
  if(p.mouseX >= 0 && p.mouseX <= p.width){
    if(p.mouseY >= 0 && p.mouseY <= p.height){
      if(isEditMode == true){
        shapes[shapeIndex].indices.push(closest);
        console.log(shapes);
      }
    }
  }
}

  p.drawShapes = function(){
    for(let s = 0; s < shapes.length;s++){
      if( s == shapeIndex) p.fill(shapes[s].fill_H,50,100);
      else p.fill(shapes[s].fill_H, 100, 100);
      p.stroke(shapes[s].stroke_H, 100, 100);
      p.strokeWeight(3);
  
      p.beginShape();
      for(let i = 0; i < shapes[s].indices.length; i++){
        p.vertex(
          detections.multiFaceLandmarks[0][shapes[s].indices[i]].x * p.width,
          detections.multiFaceLandmarks[0][shapes[s].indices[i]].y * p.height,
        );
      }
      p.endShape();
    }
  }

  p.editShapes = function(){
    shapes[shapeIndex].fill_H = fill_H_Slider.value();
    shapes[shapeIndex].stroke_H = stroke_H_Slider.value();
  }

  p.keyTyped = function(){
    if(p.key === 'e') isEditMode = !isEditMode;

    if(p.key=== 'c'){
      if(shapes[shapes.length-1].indices.length > 0){
        shapes.push(
          {
            fill_H : p.random(360),
            stroke_H : p.random(360),
            indices: []
          }
        );
        shapeIndex++;
          }
          console.log(shapes);
        }

        if(p.key === 'z'){
          if(shapes[shapeIndex] != undefined){
            if(shapes[shapeIndex].indices.length > 0) shapes[shapeIndex].indices.pop();
          }
          console.log(shapes[shapeIndex].indices);
      }

      if(p.key === 'd'){
        shapes = [
          {
            fill_H : p.random(360),
            stroke_H : p.random(360),
            indices: []
          }
        ];
        shapeIndex = 0;
        console.log(shapes);
      }

      if(p.key === 's'){
        p.saveCanvas('screenshot', 'png');
      }
    }

    p.keyPressed = function(){
      if(p.keyCode === p.UP_ARROW){
        if(shapes[shapeIndex] != undefined){
          if(shapes[shapeIndex]. length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
          if(shapeIndex < shapes.length-1) shapeIndex++;
        }
      }else if(p.keyCode === p.DOWN_ARROW){
        if(shapes[shapeIndex] != undefined){
          if(shapes[shapeIndex]. length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
          if(shapeIndex > 0) shapeIndex--;
      }
    }
    console.log(shapeIndex);
    }

      p.glow = function(){
        p.drawingContext.shadowOffsetX = 0;
        p.drawingContext.shadowOffsetY = 0;
        p.drawingContext.shadowBlur = 20;
        p.drawingContext.shadowColor = 'rgba(255,255,100)';
      }
    }
      
  
    
let myp5 = new p5(sketch)    
  
  

