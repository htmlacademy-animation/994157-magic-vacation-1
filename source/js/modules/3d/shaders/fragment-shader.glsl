precision mediump float;
uniform sampler2D map;
varying vec2 vUv;
uniform float hueShift;

vec3 shiftColorHue(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
    vec4 texel = texture2D(map, vUv);
    if (hueShift != 0.0) {
        vec3 shifted = shiftColorHue(texel.rgb, hueShift);
        gl_FragColor = vec4(shifted.rgb, 1);
    }
    else {
        gl_FragColor = texel;
    }
}
