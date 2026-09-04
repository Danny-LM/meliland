import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { base } from "$app/paths";
import type { PlanetData } from "$lib/data/words";

export class GalaxyEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;

    private sunMesh!: THREE.Mesh;
    private planetMeshes: { mesh: THREE.Mesh; data: PlanetData; angle: number }[] = [];
    private wordSprites: { sprite: THREE.Sprite; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    private floatingTexts: { sprite: THREE.Sprite; life: number; seed: number }[] = [];
    private particlesMesh!: THREE.Points;

    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private envelopeClosedTex!: THREE.Texture;
    private envelopeOpenTex!: THREE.Texture;
    private hoveredMesh: THREE.Mesh | null = null;

    private animationFrameId: number = 0;
    private isPulsing = false;
    private pulseProgress = 0;
    private currentImageIndex: number;
    private time = 0;
    private currentMessageIndex = 0;

    private readonly TOTAL_IMAGES = 4;
    private readonly heartMessage = ["Feliz", "Día", "de la", "Novia", "mi Niña"];

    constructor(
        private canvas: HTMLCanvasElement,
        private words: string[],
        private planets: PlanetData[],
        private randomNum: number,
        private onSelectPlanet: (planet: PlanetData) => void
    ) {
        this.currentImageIndex = this.randomNum;

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x05020a, 0.02);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 8, 22);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 50;
        this.controls.minDistance = 5;
        this.controls.target.set(0, 0, 0);

        this.initLights();
        this.initObjects();
        this.animate();
    }

    private initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xf43f5e, 3, 50);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);
    }

    private initObjects() {
        const textureLoader = new THREE.TextureLoader();
        this.envelopeClosedTex = textureLoader.load(`${base}/icon/letter-closed.png`);
        this.envelopeOpenTex = textureLoader.load(`${base}/icon/letter-open.png`);

        const sunTexture = textureLoader.load(`${base}/images/may${this.currentImageIndex}.png`);
        const heartAlpha = this.createHeartAlphaTexture();
        const sunGeometry = new THREE.PlaneGeometry(6, 6);
        const sunMaterial = new THREE.MeshBasicMaterial({
            map: sunTexture,
            alphaMap: heartAlpha,
            transparent: true,
            alphaTest: 0.1,
            side: THREE.DoubleSide
        });
        this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(this.sunMesh);

        const glowMaterial = new THREE.SpriteMaterial({
            map: this.createGlowTexture(),
            transparent: true,
            depthWrite: false
        });
        const glowSprite = new THREE.Sprite(glowMaterial);
        glowSprite.scale.set(7, 7, 1);
        glowSprite.position.z = -0.5;
        this.sunMesh.add(glowSprite);

        this.planets.forEach((p, index) => {
            const pGeo = new THREE.PlaneGeometry(1.5, 1.5);
            const pMat = new THREE.MeshBasicMaterial({
                map: this.envelopeClosedTex,
                side: THREE.DoubleSide,
                transparent: true,
                alphaTest: 0.1
            });
            const mesh = new THREE.Mesh(pGeo, pMat);
            mesh.userData = p;
            mesh.position.y = 0.2;

            const ringGeo = new THREE.RingGeometry(p.orbitRadius - 0.05, p.orbitRadius + 0.05, 64);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xf472b6,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.2
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2;

            this.scene.add(ring);
            this.scene.add(mesh);
            this.planetMeshes.push({ mesh, data: p, angle: (index / this.planets.length) * Math.PI * 2 });
        });

        this.words.forEach((word) => {
            const texture = this.createTextTexture(word);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(spriteMaterial);

            const radius = 6 + Math.random() * 16;
            const angle = Math.random() * Math.PI * 2;
            const yOffset = (Math.random() - 0.5) * 8;
            const speed = (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1);

            sprite.scale.set(4, 1, 1);
            this.scene.add(sprite);
            this.wordSprites.push({ sprite, angle, radius, speed, yOffset });
        });

        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 80;
        }
        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({ size: 0.15, color: 0xfbcfe8, transparent: true, opacity: 0.8 });
        this.particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        this.scene.add(this.particlesMesh);
    }

    private animate = () => {
        this.animationFrameId = requestAnimationFrame(this.animate);
        this.time += 0.01;

        if (this.sunMesh) {
            this.sunMesh.lookAt(this.camera.position);
            let extraScale = 0;

            if (this.isPulsing) {
                this.pulseProgress += 0.15;
                extraScale = Math.sin(this.pulseProgress) * 0.8;

                if (this.pulseProgress >= Math.PI) {
                    this.isPulsing = false;
                    this.pulseProgress = 0;

                    let nextImg;
                    do nextImg = Math.floor(Math.random() * this.TOTAL_IMAGES + 1);
                    while (nextImg === this.currentImageIndex);
                    this.currentImageIndex = nextImg;

                    new THREE.TextureLoader().load(`${base}/images/may${this.currentImageIndex}.png`, (newTex) => {
                        const mat = this.sunMesh.material as THREE.MeshBasicMaterial;
                        const oldMap = mat.map;
                        mat.map = newTex;
                        mat.needsUpdate = true;
                        if (oldMap) oldMap.dispose();
                    });
                }
            }
            const baseScale = 1 + Math.sin(this.time * 3) * 0.05;
            const finalScale = baseScale + extraScale;
            this.sunMesh.scale.set(finalScale, finalScale, finalScale);
        }

        this.planetMeshes.forEach((item) => {
            item.angle += item.data.speed;
            item.mesh.position.x = Math.cos(item.angle) * item.data.orbitRadius;
            item.mesh.position.z = Math.sin(item.angle) * item.data.orbitRadius;
            item.mesh.lookAt(this.camera.position);
        });

        this.wordSprites.forEach((item) => {
            item.angle += item.speed;
            item.sprite.position.x = Math.cos(item.angle) * item.radius;
            item.sprite.position.z = Math.sin(item.angle) * item.radius;
            item.sprite.position.y = item.yOffset + Math.sin(this.time + item.angle) * 0.5;
        });

        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const item = this.floatingTexts[i];
            item.sprite.position.y += 0.03;
            item.sprite.position.z += 0.02;
            item.sprite.position.x = Math.sin(this.time * 2 + item.seed) * 1.5;

            const expansion = 1 + (1.0 - item.life) * 1.5;
            item.sprite.scale.set(8 * expansion, 3 * expansion, 1);
            item.life -= 0.006;
            item.sprite.material.opacity = Math.max(0, item.life);

            if (item.life <= 0) {
                this.scene.remove(item.sprite);
                item.sprite.material.dispose();
                if (item.sprite.material.map) item.sprite.material.map.dispose();
                this.floatingTexts.splice(i, 1);
            }
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };

    public handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public handlePointerDown(event: MouseEvent | TouchEvent) {
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        if (this.sunMesh) {
            const intersectsSun = this.raycaster.intersectObject(this.sunMesh);
            if (intersectsSun.length > 0) {
                if (!this.isPulsing) {
                    this.isPulsing = true;
                    this.pulseProgress = 0;

                    if (this.currentMessageIndex < this.heartMessage.length) {
                        const word = this.heartMessage[this.currentMessageIndex];
                        const texture = this.createTextTexture(word);
                        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
                        const sprite = new THREE.Sprite(material);
                        sprite.position.set(0, 3, 0);
                        sprite.scale.set(8, 3, 1);

                        this.scene.add(sprite);
                        this.floatingTexts.push({ sprite, life: 1.0, seed: Math.random() * Math.PI * 2 });

                        this.currentMessageIndex++;
                        if (this.currentMessageIndex >= this.heartMessage.length) {
                            setTimeout(() => { this.currentMessageIndex = 0; }, 2000);
                        }
                    }
                }
                return;
            }
        }

        const intersects = this.raycaster.intersectObjects(this.planetMeshes.map((p) => p.mesh));
        if (intersects.length > 0) {
            const clickedPlanet = intersects[0].object.userData as PlanetData;
            this.onSelectPlanet(clickedPlanet);
        }
    }

    public handlePointerMove(event: MouseEvent | TouchEvent) {
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.planetMeshes.map((p) => p.mesh));
        if (intersects.length > 0) {
            const object = intersects[0].object as THREE.Mesh;
            if (this.hoveredMesh !== object) {
                if (this.hoveredMesh) this.resetHoveredMesh();
                this.hoveredMesh = object;
                this.hoveredMesh.scale.set(1.2, 1.2, 1.2);
                const newMat = this.hoveredMesh.material as THREE.MeshBasicMaterial;
                newMat.map = this.envelopeOpenTex;
                newMat.needsUpdate = true;
                this.canvas.style.cursor = "pointer";
            }
        } else if (this.hoveredMesh) {
            this.resetHoveredMesh();
            this.canvas.style.cursor = "grab";
        }
    }

    private resetHoveredMesh() {
        if (!this.hoveredMesh) return;
        this.hoveredMesh.scale.set(1, 1, 1);
        const resetMat = this.hoveredMesh.material as THREE.MeshBasicMaterial;
        resetMat.map = this.envelopeClosedTex;
        resetMat.needsUpdate = true;
        this.hoveredMesh = null;
    }

    private updateMousePosition(event: MouseEvent | TouchEvent) {
        let clientX = 0;
        let clientY = 0;
        if (event instanceof MouseEvent) {
            clientX = event.clientX;
            clientY = event.clientY;
        } else if (event.touches && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    }

    private createTextTexture(text: string): THREE.CanvasTexture {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = 256; canvas.height = 100;
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "Bold 32px system-ui, sans-serif";
        ctx.fillStyle = "#fbcfe8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "#f472b6";
        ctx.shadowBlur = 20;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        ctx.shadowBlur = 10;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    private createHeartAlphaTexture(): THREE.CanvasTexture {
        const canvas = document.createElement("canvas");
        canvas.width = 512; canvas.height = 512;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 512, 512);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(256, 160);
        ctx.bezierCurveTo(256, 120, 220, 80, 150, 80);
        ctx.bezierCurveTo(40, 80, 40, 220, 40, 220);
        ctx.bezierCurveTo(40, 310, 150, 390, 256, 460);
        ctx.bezierCurveTo(360, 390, 472, 310, 472, 220);
        ctx.bezierCurveTo(472, 220, 472, 80, 360, 80);
        ctx.bezierCurveTo(290, 80, 256, 120, 256, 160);
        ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    private createGlowTexture(): THREE.CanvasTexture {
        const canvas = document.createElement("canvas");
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext("2d")!;
        const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
        grad.addColorStop(0, "rgba(244, 63, 94, 0.7)");
        grad.addColorStop(1, "rgba(244, 63, 94, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    public dispose() {
        cancelAnimationFrame(this.animationFrameId);

        this.scene.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Sprite || object instanceof THREE.Points) {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(m => this.disposeMaterial(m));
                    } else {
                        this.disposeMaterial(object.material);
                    }
                }
            }
        });

        if (this.envelopeClosedTex) this.envelopeClosedTex.dispose();
        if (this.envelopeOpenTex) this.envelopeOpenTex.dispose();

        this.controls.dispose();
        this.renderer.dispose();
    }

    private disposeMaterial(material: THREE.Material) {
        material.dispose();
        // @ts-expect-error this will fail...
        if (material.map) material.map.dispose();
        // @ts-expect-error this will fail...
        if (material.alphaMap) material.alphaMap.dispose();
    }
}
