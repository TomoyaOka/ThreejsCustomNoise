varying vec2 vUv;
varying float vNoise;
uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uTime;

void main(){

   vec3 color1 = vec3(0.0,0.0,0.0); //下の色
   vec3 color2 = vec3(0.5,0.0,0.0); //上の色
   vec3 finalColor = mix(color1,color2,0.6*(vNoise + 1.0));

  gl_FragColor = vec4(finalColor,1.0);

}