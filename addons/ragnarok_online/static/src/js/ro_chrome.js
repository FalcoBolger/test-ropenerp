(function () {

    var ImprovedNoise = function () {
        var p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
             23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
             174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
             133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
             89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
             202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
             248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
             178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
             14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
             93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

        for (var i=0; i < 256 ; i++) {
            p[256+i] = p[i];
        }

        function fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function lerp(t, a, b) {
            return a + t * (b - a);
        }

        function grad(hash, x, y, z) {
            var h = hash & 15;
            var u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z;
            return ((h &1 ) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }

        return {
            noise: function (x, y, z) {
                var floorX = ~~x, floorY = ~~y, floorZ = ~~z;
                var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;
                x -= floorX;
                y -= floorY;
                z -= floorZ;
                var xMinus1 = x -1, yMinus1 = y - 1, zMinus1 = z - 1;
                var u = fade(x), v = fade(y), w = fade(z);
                var A = p[X]+Y, AA = p[A]+Z, AB = p[A+1]+Z, B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;
                return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
                                grad(p[BA], xMinus1, y, z)),
                            lerp(u, grad(p[AB], x, yMinus1, z),
                                grad(p[BB], xMinus1, yMinus1, z))),
                        lerp(v, lerp(u, grad(p[AA+1], x, y, zMinus1),
                                grad(p[BA+1], xMinus1, y, z-1)),
                            lerp(u, grad(p[AB+1], x, yMinus1, zMinus1),
                                grad(p[BB+1], xMinus1, yMinus1, zMinus1))));
            }
        };
    };

    var instance = openerp;

    var RO = instance.ragnarok_online || {};
    var chrome = RO.chrome || {};

    openerp.ragnarok_online = RO;

    var QWeb = instance.web.qweb;
    var _t = instance.web._t;

    chrome.PlayButton = instance.web.Widget.extend({
        template: 'ro.WebClient.play_button',
        start: function () {
            var self = this;
            this.$('span.ui-icon').click(function (e) {
                self.trigger('ragnarok_online:start');
            });
            return this._super();
        },
    });

    chrome.RagnarokOnlineClient = instance.web.FullscreenWidget.extend({
        tagName: 'div',
        className: 'RagnarokOnlineClient',
        init: function (parent) {
            this._super(parent);
        },
        start: function () {
            var d = this._super.apply(this, arguments);
            this.initialize();
            return d;
        },
        initialize: function () {
            var self = this;

            this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
            this.camera.position.z = 500;

            this.scene = new THREE.Scene();

            var data = this._generateHeight(1024, 1024);
            var texture = new THREE.Texture(this._generateTexture(data, 1024, 1024));
            texture.needsUpdate = true;

            var material = new THREE.MeshBasicMaterial({
                map: texture,
                overdraw: true
            });

            var quality = 16, step = 1024 / quality;

            var plane = new THREE.PlaneGeometry(2000, 2000, quality - 1, quality - 1);
            plane.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));

            for (var i=0, l=plane.vertices.length; i<l; i++) {
                var x = i % quality, y = ~~ (i / quality);
                plane.vertices[ i ].y = data[( x * step ) + ( y * step ) * 1024] * 2 - 128;
            }

            plane.computeCentroids();

            this.mesh = new THREE.Mesh(plane, material);
            this.scene.add(this.mesh);

            this.renderer = new THREE.CanvasRenderer();
            this.renderer.setClearColor(0xbfd1e5);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.$el.append($(this.renderer.domElement));

            this.$el.on('mousemove', this._onDocumentMouseMove);
            $(window).on('resize', _.bind(self._onWindowResize, self));

            this.animate();
        },

        _generateHeight: function (width, height) {
            var data = Float32Array ? new Float32Array( width * height ) : [], perlin = new ImprovedNoise(),
            size = width * height, quality = 2, z = Math.random() * 100;

            var i;
            for (i=0; i<size; i++) {
                data[i] = 0;
            }
            var j;
            for (j=0; j<4; j++) {
                quality *= 4;
                for (i=0; i<size; i++) {
                    var x = i % width, y = ~~ (i / width);
                    data[i] += Math.floor(Math.abs(perlin.noise(x / quality, y / quality, z) * 0.5) * quality + 10);
                }
            }
            return data;
        },
        _generateTexture: function (data, width, height) {
            var canvas, context, image, imageData,
            level, diff, vector3, sun, shade;

            vector3 = new THREE.Vector3(0, 0, 0);

            sun = new THREE.Vector3(1, 1, 1);
            sun.normalize();

            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            context = canvas.getContext('2d');
            context.fillStyle = '#000';
            context.fillRect(0, 0, width, height);

            image = context.getImageData(0, 0, width, height);
            imageData = image.data;

            for (var i=0, j=0, l=imageData.length; i<l; i+=4, j++) {
                vector3.x = data[j - 1] - data[j + 1];
                vector3.y = 2;
                vector3.z = data[j - width] - data[j + width];
                vector3.normalize();

                shade = vector3.dot(sun);

                imageData[i] = (96 + shade * 128) * (data[j] * 0.007);
                imageData[i + 1] = (32 + shade * 96) * (data[j] * 0.007);
                imageData[i + 2] = (shade * 96) * (data[j] * 0.007);
            }

            context.putImageData(image, 0, 0);

            return canvas;
        },
        _onWindowResize: function () {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        _onDocumentMouseMove: function (event) {
            this.mouseX = event.clientX - this.windowHalfX;
            this.mouseY = event.clientY - this.windowHalfY;
        },
        animate: function () {
            var self = this;
            window.requestAnimationFrame(_.bind(self.render, self));
            this.render();
        },
        render: function () {
            this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
            this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.05;
            this.camera.lookAt(this.scene.position);

            this.renderer.render(this.scene, this.camera);
        },
    });

    chrome.CharacterManager = instance.web.Widget.extend({});

    instance.web.WebClient.include({
        init: function () {
            this._super.apply(this, arguments);
        },
        show_application: function () {
            if (this.session.uid === 1) {
                this._super.apply(this, arguments);
                this.play_button = new chrome.PlayButton(this);
                this.play_button.appendTo(this.$('.oe_systray'));
                this.play_button.on('ragnarok_online:start', this, function () {
                    this.hide_application();
                    this.show_ragnarok_online();
                });
            } else {
                this.show_ragnarok_online();
            }
        },
        show_ragnarok_online: function () {
            this.ro_client = new chrome.RagnarokOnlineClient(this);
            this.ro_client.appendTo(this.$el);
        },
        hide_application: function () {
        },
    });
})();
