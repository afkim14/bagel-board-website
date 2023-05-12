// === React Imports ===
import React from 'react';
import { spline } from "@georgedoescode/spline";
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const prng = alea('seed');
const simplex = createNoise2D(prng);
const noiseStep = 0.003; // how fast time goes
const defaultWidth = 200;
const defaultHeight = 200;
const defaultNoiseOffset = 10;

class Blob extends React.Component {
    blobRef;
    points;

    constructor(props) {
        super(props);
        this.points = this.createPoints();
    }

    componentDidMount() {
        this.animateBlobs()
    }

    animateBlobs = () => {
        const { noiseOffset } = this.props;
        for (let i = 0; i <this.points.length; i++) {
            const point = this.points[i];
            const nX = simplex(point.noiseOffsetX, point.noiseOffsetX);
            const nY = simplex(point.noiseOffsetY, point.noiseOffsetY);
            // map this noise value to a new value, somewhere between it's original location -offset and it's original location + offset
            const x = map(nX, -1, 1, point.originX - (noiseOffset || defaultNoiseOffset), point.originX + (noiseOffset || defaultNoiseOffset));
            const y = map(nY, -1, 1, point.originY - (noiseOffset || defaultNoiseOffset), point.originY + (noiseOffset || defaultNoiseOffset));
            // update the point's current coordinates
            point.x = x;
            point.y = y;

            // progress the point's x, y values through "time"
            point.noiseOffsetX += noiseStep;
            point.noiseOffsetY += noiseStep;
        }

        if (this.blobRef) {
            this.blobRef.setAttribute("d", spline(this.points, 1, true))
        }

        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        requestAnimationFrame(this.animateBlobs)
    }

    createPoints = () => {
        const { width, height, noiseOffset } = this.props;
        const points = [];
        const numPoints = 30;
        const angleStep = (Math.PI * 2) / numPoints;
        const rad = ((width || defaultWidth) / 2) - (noiseOffset || defaultNoiseOffset);
  
        for (let i = 1; i <= numPoints; i++) {
            const theta = i * angleStep;
            const x = ((width || defaultWidth) / 2) + Math.cos(theta) * rad;
            const y = ((height || defaultHeight) / 2) + Math.sin(theta) * rad;
  
            // store the point
            points.push({
                x: x,
                y: y,
                originX: x,
                originY: y,
                noiseOffsetX: random() * 1000,
                noiseOffsetY: random() * 1000,
            });
        }
  
        return points;
    }

    render() {
        const { className, color, canvasWidth, canvasHeight } = this.props;
        return (
            <svg className={className} viewBox={`0 0 ${canvasWidth || 500} ${canvasHeight || 500}`}>
                <path ref={(ref) => { this.blobRef = ref }} d="" fill={color || '#fff'}></path>
            </svg>
        )
    }
}

export default Blob;