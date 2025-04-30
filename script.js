// Declare global variable for timeline instance
var tl;

// Define dimensions for the renderer
const Width = 500;
const Height = 400;

// Handle DOM content loading
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements used for transitions
    const imageTargetEntity = document.querySelector('#imageTarget');
    const transitionContainer = document.querySelector('#transition-container');
    const guideImage = document.querySelector('#scanning-guide-container');
    const scanningText = document.querySelector('#scanning-text');
    const bottomText = document.querySelector('#bottom-text');


    // Initial state setup
    transitionContainer.setAttribute('visible', 'false');
    transitionContainer.style.opacity = '0';
    transitionContainer.style.transition = 'opacity 0.5s ease';

    guideImage.style.display = 'flex';

    // Make transition container a child of image target
    imageTargetEntity.appendChild(transitionContainer);

    // Handle image target found event
    imageTargetEntity.addEventListener('targetFound', () => {
        transitionContainer.style.opacity = '1';

        // Position transition container relative to image target
        transitionContainer.setAttribute('position', '0 0 0');
        transitionContainer.setAttribute('visible', 'true');
        transitionContainer.setAttribute('scale', '1 1 1');
        guideImage.style.display = 'none';

        bottomText.classList.add('visible');
        scanningText.style.display = 'none';

        setTimeout(() => {
            transitionContainer.setAttribute('visible', 'true');
            if (tl) {
                tl.seek(0);
                tl.play();
            }
        }, 500);
    });

    // Handle target lost event
    imageTargetEntity.addEventListener('targetLost', () => {
        // Fade out
        transitionContainer.style.opacity = '0';
        guideImage.style.display = 'flex';
        
        bottomText.classList.remove('visible');

        setTimeout(() => {
            scanningText.style.display = 'block'; 
            scanningText.classList.add('visible');
        }, 500);

            transitionContainer.setAttribute('visible', 'false');
            const mindarSystem = document.querySelector('a-scene').systems['mindar-image-system'];
            mindarSystem.ui.showScanning();

            if (tl) {
                tl.pause();
                tl.seek(0);
            }
            scanningText.classList.add('visible')
        }, 500);
    });


// Initialize animation when window loads
window.onload = init;

// Disable warning messages
console.warn = function() {};

// Initialize animation and scene setup
function init() {
    var root = new THREERoot({
        createCameraControls: !true,
        antialias: (window.devicePixelRatio === 1),
        fov: 80
    });

    // Renderer setup
    root.renderer.setClearColor(0x000000, 0);
    root.renderer.setPixelRatio(window.devicePixelRatio || 1);
    root.camera.position.set(0, 0, 60);

    // Dimensions for slides
    var width = 69;
    var height = 98;
  
    // Create slide objects with animation phases
    var slide = new Slide(width, height, 'out');
    var slide2 = new Slide(width, height, 'in');
    var slide3 = new Slide(width, height, 'in');
    var slide4 = new Slide(width, height, 'in');
    var slide5 = new Slide(width, height, 'in');
    var slide6 = new Slide(width, height, 'in');
    var slide7 = new Slide(width, height, 'in');
    var slide8 = new Slide(width, height, 'in');
    var slide9 = new Slide(width, height, 'in');
    var slide10 = new Slide(width, height, 'in');
    var slide11 = new Slide(width, height, 'in');


    // Array of slides with media URLs
    const slides = [
        { slide, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/Selcoria-Mural-scaled.jpg' },
        { slide: slide2, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/tarsier-vid.mp4' },
        { slide: slide3, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/clipfly-ai-20250426182035.mp4' },
        { slide: slide4, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/peafowl-vid.mp4' },
        { slide: slide5, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/turtle-vid.mp4' },
        { slide: slide6, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/asian-civet-vid.mp4' },
        { slide: slide7, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/masked-civet-vid.mp4' },
        { slide: slide8, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/carabao-vid.mp4' },
        { slide: slide9, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/croc-vid.mp4' },
        { slide: slide10, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/heron-vid.mp4' },
        { slide: slide11, url: 'https://sm-artist.co.uk/wp-content/uploads/2025/04/ar-ending-01-scaled.jpg' }

    ];

    // Load media onto slides and add to scene
    slides.forEach(({ slide, url }) => {
        loadMediaOnSlide(slide, url);
        root.scene.add(slide);
    });

    // Set up timeline animation with transitions
    tl = new TimelineMax({ repeat: -1, repeatDelay: 1.0, yoyo: false });

    // Add transitions to timeline with timings
    tl.add(slide.transition(), 0);
    tl.add(slide2.transition(), 4.0);
    tl.add(slide3.transition(), 12.0);
    tl.add(slide4.transition(), 20.0);
    tl.add(slide5.transition(), 28.0);
    tl.add(slide6.transition(), 36.0);
    tl.add(slide7.transition(), 44.0);
    tl.add(slide8.transition(), 52.0);
    tl.add(slide9.transition(), 60.0);
    tl.add(slide10.transition(), 68.0);
    tl.add(slide11.transition(), 74.0);

    // Restart timeline after completing a loop
    tl.add(() => {
        tl.seek(0);
    }, "+=0.1");

    // Create scrubber for controlling timeline
    createTweenScrubber(tl);
}

// Function to load media onto slides (images and videos)
function loadMediaOnSlide(slide, url) {
    const videoTypes = ['.mp4', '.webm'];

    if (videoTypes.some(type => url.endsWith(type))) {
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.style.display = 'none'

        // Event listener for when video is loaded
        video.addEventListener('loadeddata', () => {
            console.log("Video is ready! ReadyState:", video.readyState);

            // Create video texture for the slide
            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.colorSpace = THREE.SRGBColorSpace;

            slide.material.uniforms.map.value = videoTexture;
            slide.material.uniforms.map.needsUpdate = true;

            // Update texture
            const updateTexture = () => {
                videoTexture.needsUpdate = true;
                requestAnimationFrame(updateTexture);
            }
            updateTexture();

            // Ensure video plays
            video.play().catch(error => console.error("video playback failed:", error));
        });

        // Handle video errors
        video.addEventListener('error', (e) => {
            console.error("Video failed to load:", e);
        });

        // Append video to body for rendering
        document.body.appendChild(video);

        // Store video reference on slide object
        slide.video = video;

        
        // Play video forward, then reverse smoothly
        video.addEventListener('ended', () => {
            // Smooth reverse playback
            reverseVideo(video);
        });
    } else {
        // Load image as texture
        const loader = new THREE.ImageLoader();
        loader.setCrossOrigin('Anonymous');
        loader.load(url, function(img) {
            const texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.anisotropy = 16;

            slide.material.uniforms.map.value = texture;
        });
    }
}
// Function to smoothly reverse the video playback
function reverseVideo(video) {
    // Set the video playback rate to a negative value
    video.playbackRate = -1;
    video.currentTime = video.duration;  

    // Play video in reverse
    video.play().catch(error => console.error("video reverse playback failed:", error));
    
    // Listen for when reverse playback finishes to loop the behavior or trigger next action
    video.onended = () => {
        console.log("Video reversed, now looping...");
        video.playbackRate = 1; 
    };
}

// Function to reset animation to start
function resetAnimation() {
    tl.seek(0);
    tl.pause();
}


// Slide class for individual slides
function Slide(width, height, animationPhase) {
    var plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);

    THREE.BAS.Utils.separateFaces(plane);

    var geometry = new SlideGeometry(plane);

    geometry.bufferUVs();

    var aAnimation = geometry.createAttribute('aAnimation', 2);
    var aStartPosition = geometry.createAttribute('aStartPosition', 3);
    var aControl0 = geometry.createAttribute('aControl0', 3);
    var aControl1 = geometry.createAttribute('aControl1', 3);
    var aEndPosition = geometry.createAttribute('aEndPosition', 3);

    var minDuration = 0.8;
    var maxDuration = 1.2;
    var maxDelayX = 0.9;
    var maxDelayY = 0.125;
    var stretch = 0.11;

    this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

    var startPosition = new THREE.Vector3();
    var control0 = new THREE.Vector3();
    var control1 = new THREE.Vector3();
    var endPosition = new THREE.Vector3();

    var tempPoint = new THREE.Vector3();

    function getControlPoint0(centroid) {
        var signY = Math.sign(centroid.y);

        tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
        tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
        tempPoint.z = THREE.Math.randFloatSpread(20);

        return tempPoint;
    }

    function getControlPoint1(centroid) {
        var signY = Math.sign(centroid.y);

        tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
        tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
        tempPoint.z = THREE.Math.randFloatSpread(20);

        return tempPoint;
    }

    for (var i = 0, i2 = 0, i3 = 0, i4 = 0; i < geometry.faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
        var face = plane.faces[i];
        var centroid = THREE.BAS.Utils.computeCentroid(plane, face);

        var duration = THREE.Math.randFloat(minDuration, maxDuration);
        var delayX = THREE.Math.mapLinear(centroid.x, -width * 0.5, width * 0.5, 0.0, maxDelayX);
        var delayY;

        if (animationPhase === 'in') {
            delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, 0.0, maxDelayY)
        } else {
            delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, maxDelayY, 0.0)
        }

        for (var v = 0; v < 6; v += 2) {
            aAnimation.array[i2 + v] = delayX + delayY + (Math.random() * stretch * duration);
            aAnimation.array[i2 + v + 1] = duration;
        }

        endPosition.copy(centroid);
        startPosition.copy(centroid);

        if (animationPhase === 'in') {
            control0.copy(centroid).sub(getControlPoint0(centroid));
            control1.copy(centroid).sub(getControlPoint1(centroid));
        } else {
            control0.copy(centroid).add(getControlPoint0(centroid));
            control1.copy(centroid).add(getControlPoint1(centroid));
        }

        for (var v = 0; v < 9; v += 3) {
            aStartPosition.array[i3 + v] = startPosition.x;
            aStartPosition.array[i3 + v + 1] = startPosition.y;
            aStartPosition.array[i3 + v + 2] = startPosition.z;

            aControl0.array[i3 + v] = control0.x;
            aControl0.array[i3 + v + 1] = control0.y;
            aControl0.array[i3 + v + 2] = control0.z;

            aControl1.array[i3 + v] = control1.x;
            aControl1.array[i3 + v + 1] = control1.y;
            aControl1.array[i3 + v + 2] = control1.z;

            aEndPosition.array[i3 + v] = endPosition.x;
            aEndPosition.array[i3 + v + 1] = endPosition.y;
            aEndPosition.array[i3 + v + 2] = endPosition.z;
        }
    }

    var material = new THREE.BAS.BasicAnimationMaterial({
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
        uniforms: {
            uTime: { type: 'f', value: 0 }
        },
        shaderFunctions: [
            THREE.BAS.ShaderChunk['cubic_bezier'],
            THREE.BAS.ShaderChunk['ease_in_out_cubic'],
            THREE.BAS.ShaderChunk['quaternion_rotation']
        ],
        shaderParameters: [
            'uniform float uTime;',
            'attribute vec2 aAnimation;',
            'attribute vec3 aStartPosition;',
            'attribute vec3 aControl0;',
            'attribute vec3 aControl1;',
            'attribute vec3 aEndPosition;',
        ],
        shaderVertexInit: [
            'float tDelay = aAnimation.x;',
            'float tDuration = aAnimation.y;',
            'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
            'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
        ],
        shaderTransformPosition: [
            (animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'),
            'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);'
        ]
    }, {
        map: new THREE.Texture()
    });

    THREE.Mesh.call(this, geometry, material);
    this.frustumCulled = false;
}

// Inherit from THREE.Mesh
Slide.prototype = Object.create(THREE.Mesh.prototype);
Slide.prototype.constructor = Slide;

// Add time property getter/setter
Object.defineProperty(Slide.prototype, 'time', {
    get: function() {
        return this.material.uniforms['uTime'].value;
    },
    set: function(v) {
        this.material.uniforms['uTime'].value = v;
    }
});

// Add method to set image texture
Slide.prototype.setImage = function(image) {
    var texture = new THREE.Texture(image);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = Math.min(16, (this.material.uniforms.map.value?.anisotropy || 1));

    this.material.uniforms.map.value = texture;
};

// Add transition animation method
Slide.prototype.transition = function() {
    var delayTime = 5.0;
    return TweenMax.fromTo(this, 5.0, { time: 0.0 }, { time: this.totalDuration, ease: Power0.easeInOut, delay: delayTime });
};

// SlideGeometry class for handling buffer positions
function SlideGeometry(model) {
    THREE.BAS.ModelBufferGeometry.call(this, model);
}

SlideGeometry.prototype = Object.create(THREE.BAS.ModelBufferGeometry.prototype);
SlideGeometry.prototype.constructor = SlideGeometry;

// Buffer positions based on face centroids
SlideGeometry.prototype.bufferPositions = function() {
    var positionBuffer = this.createAttribute('position', 3).array;

    for (var i = 0; i < this.faceCount; i++) {
        var face = this.modelGeometry.faces[i];
        var centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

        var a = this.modelGeometry.vertices[face.a];
        var b = this.modelGeometry.vertices[face.b];
        var c = this.modelGeometry.vertices[face.c];

        positionBuffer[face.a * 3] = a.x - centroid.x;
        positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
        positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

        positionBuffer[face.b * 3] = b.x - centroid.x;
        positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
        positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

        positionBuffer[face.c * 3] = c.x - centroid.x;
        positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
        positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
    }
};

// THREERoot class for main scene setup
function THREERoot(params) {
    params = utils.extend({
        fov: 60,
        zNear: 10,
        zFar: 100000,
        createCameraControls: true
    }, params);

    this.renderer = new THREE.WebGLRenderer({
        antialias: params.antialias,
        alpha: true
    });

    this.renderer.setSize(Width, Height);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    const container = document.querySelector('#transition-container');
    if (container) {
        container.appendChild(this.renderer.domElement);
    } else {
        console.error('A-Frame entity not found!');
    }

    this.camera = new THREE.PerspectiveCamera(
        params.fov,
        500/400,
        params.zNear,
        params.zFar
    );

    this.scene = new THREE.Scene();
    if (params.createCameraControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);

    this.resize();
    this.tick();

    window.addEventListener('resize', this.resize, false);
}

THREERoot.prototype = {
    tick: function() {
        this.update();
        this.render();
        requestAnimationFrame(this.tick);
    },
    update: function() {
        this.controls && this.controls.update();
    },
    render: function() {
        this.renderer.render(this.scene, this.camera);
    },
    resize: function() {
        this.camera.aspect = 500/400;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(500, 400);
    }
};

// Utility functions
var utils = {
    extend: function(dst, src) {
        for (var key in src) {
            dst[key] = src[key];
        }
        return dst;
    },
    randSign: function() {
        return Math.random() > 0.5 ? 1 : -1;
    },
    ease: function(ease, t, b, c, d) {
        return b + ease.getRatio(t / d) * c;
    },
    fibSpherePoint: (function() {
        var vec = { x: 0, y: 0, z: 0 };
        var G = Math.PI * (3 - Math.sqrt(5));

        return function(i, n, radius) {
            var step = 2.0 / n;
            var r, phi;

            vec.y = i * step - 1 + (step * 0.5);
            r = Math.sqrt(1 - vec.y * vec.y);
            phi = i * G;
            vec.x = Math.cos(phi) * r;
            vec.z = Math.sin(phi) * r;

            radius = radius || 1;

            vec.x *= radius;
            vec.y *= radius;
            vec.z *= radius;

            return vec;
        }
    })(),
    spherePoint: (function() {
        return function(u, v) {
            u === undefined && (u = Math.random());
            v === undefined && (v = Math.random());

            var theta = 2 * Math.PI * u;
            var phi = Math.acos(2 * v - 1);

            var vec = {};
            vec.x = (Math.sin(phi) * Math.cos(theta));
            vec.y = (Math.sin(phi) * Math.sin(theta));
            vec.z = (Math.cos(phi));

            return vec;
        }
    })()
};

// Function to create scrubber for controlling timeline
function createTweenScrubber(tween, seekSpeed) {
    seekSpeed = seekSpeed || 0.001;

    function stop() {
        TweenMax.to(tween, 1, { timeScale: 0 });
    }

    function resume() {
        TweenMax.to(tween, 1, { timeScale: 1 });
    }

    function seek(dx) {
        var progress = tween.progress();
        var p = THREE.Math.clamp((progress + (dx * seekSpeed)), 0, 1);

        tween.progress(p);
    }

    var _cx = 0;
    var mouseDown = false;

    window.addEventListener('mousedown', function(e) {
        mouseDown = true;
        _cx = e.clientX;
        stop();
    });

    window.addEventListener('mouseup', function(e) {
        mouseDown = false;
        resume();
    });

    window.addEventListener('mousemove', function(e) {
        if (mouseDown === true) {
            var cx = e.clientX;
            var dx = cx - _cx;
            _cx = cx;
            seek(dx);
        }
    });

    window.addEventListener('touchstart', function(e) {
        _cx = e.touches[0].clientX;
        stop();
        e.preventDefault();
    });

    window.addEventListener('touchend', function(e) {
        resume();
        e.preventDefault();
    });

    window.addEventListener('touchmove', function(e) {
        var cx = e.touches[0].clientX;
        var dx = cx - _cx;
        _cx = cx;
        seek(dx);
        e.preventDefault();
    });
}