precision mediump float;
uniform sampler2D map;
varying vec2 vUv;
uniform float aspectRatio;

uniform bool hasHueShift;

uniform float hueShift;

struct Bubble {
    vec2 center;
    float radius;
};

uniform Bubble bubbles[3];
uniform bool hasBubbles;

vec3 shiftColorHue(vec3 color, float hue) {
    const vec3 k = vec3(0.57735);
    float cosAngle = cos(hue);
    float sinAngle = sin(hue);
    return vec3(color * cosAngle + cross(k, color) * sinAngle + k * dot(k, color) * (1.0 - cosAngle));
}

vec4 blendBorder(vec4 texel) {
    vec4 border = vec4(1, 1, 1, 0.15);
    return vec4(mix(texel.rgb, border.rgb, border.a), texel.a);
}

void drawBubble(in Bubble bubble, inout vec4 texel) {
    float borderWidth = 0.002;
    float bubbleRadius = bubble.radius;
    vec2 currentPoint = vec2(vUv.x * aspectRatio, vUv.y);
    vec2 bubbleCenter = vec2(bubble.center.x * aspectRatio, bubble.center.y);

    float distance = length(currentPoint - bubbleCenter);

    vec2 shift = vec2(0, 0);

    if (distance > bubbleRadius) {
        return;
    }

    float factorDistorsion = (1.0 - sqrt(distance / bubbleRadius));
    float scale = 1.2;
    shift = (bubble.center - vUv) * factorDistorsion;

    texel = texture2D(map, vUv + shift * scale);

    if (distance >= bubble.radius - borderWidth) {
        texel = blendBorder(texel);
    }

    float glareRadius = bubble.radius * 0.8;

    bool isInGlareCircle = distance >= (glareRadius - borderWidth) && distance < glareRadius;

    if (isInGlareCircle) {
        vec2 currentPointWithCenterFromBuble = currentPoint - bubbleCenter;
        if (currentPointWithCenterFromBuble.x < 0.0) {
            float cosinus = currentPointWithCenterFromBuble.y / length(currentPointWithCenterFromBuble);
            float angleRad = acos(cosinus);
            float angleDeg = degrees(angleRad);
            // если угол в диапазоне
            if (angleDeg > 30.0 && angleDeg < 70.0) {
                texel = blendBorder(texel);
                return;
            }
        }
    }
}

void main() {
    vec4 texel = texture2D(map, vUv);

    if (hasBubbles == true) {
        for (int i = 0; i < 3; i++) {
            drawBubble(bubbles[i], texel);
        }
    }

    if (hasHueShift == true) {
        vec3 shifted = shiftColorHue(texel.rgb, hueShift);
        gl_FragColor = vec4(shifted.rgb, 1);
    }
    else {
        gl_FragColor = texel;
    }
}
