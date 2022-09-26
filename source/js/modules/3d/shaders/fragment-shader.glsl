precision mediump float;
uniform sampler2D map;
varying vec2 vUv;
uniform float hueShift;

struct Bubble {
    vec2 center;
    float radius;
};

uniform Bubble bubbles[3];
uniform bool hasBubbles;

vec3 shiftColorHue(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

vec4 blendBorder(vec4 texel) {
    vec4 border = vec4(1, 1, 1, 0.15);
    return vec4(mix(texel.rgb, border.rgb, border.a), texel.a);
}

void drawBubble(in Bubble bubble, inout vec4 texel) {
    float imageAspectRatio = 2.0;
    float borderWidth = 0.002;
    vec2 currentPoint = vec2(vUv.x * imageAspectRatio, vUv.y);
    vec2 bubbleCenter = vec2(bubble.center.x * imageAspectRatio, bubble.center.y);

    float distance = length(currentPoint - bubbleCenter);

    vec2 shift = vec2(0, 0);

    if (distance > bubble.radius) {
        return;
    }

    if (distance >= bubble.radius - borderWidth) {
        texel = blendBorder(texel);
        return;
    }

    shift = (bubble.center - vUv) * (1.0 - sqrt(distance / bubble.radius));

    texel = texture2D(map, vUv + shift);
}

void main() {
    vec4 texel = texture2D(map, vUv);

    if (hasBubbles == true) {
        for (int i = 0; i < 3; i++) {
            drawBubble(bubbles[i], texel);
        }
    }

    if (hueShift != 0.0) {
        vec3 shifted = shiftColorHue(texel.rgb, hueShift);
        gl_FragColor = vec4(shifted.rgb, 1);
    }
    else {
        gl_FragColor = texel;
    }
}
