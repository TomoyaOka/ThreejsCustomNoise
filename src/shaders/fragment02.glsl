varying vec2 vUv;
varying float vNoise;

void main(){

   vec3 color1 = vec3(0.0,0.0,0.0); //下の色
   vec3 color2 = vec3(0.0,0.0,0.0); //上の色
   vec3 finalColor = mix(color1,color2,0.06*(vNoise + 20.0));

  gl_FragColor = vec4(finalColor, 1.0) + vec4(vNoise);
}