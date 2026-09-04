<script lang="ts">
	import { onMount } from 'svelte';
	import { GalaxyEngine } from '$lib/three/GalaxyEngine';
	import type { PlanetData } from '../data/words';

	interface Props {
		words: string[];
		planets: PlanetData[];
		randomNum: number;
		onSelectPlanet: (planet: PlanetData) => void;
	}

	let { words, planets, randomNum, onSelectPlanet }: Props = $props();

	let canvasRef = $state<HTMLCanvasElement | null>(null);
	let engine: GalaxyEngine | null = null;

	onMount(() => {
		if (!canvasRef) return;

		engine = new GalaxyEngine(canvasRef, words, planets, randomNum, onSelectPlanet);

		const handleResize = () => engine?.handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (engine) engine.dispose();
		};
	});

	function onPointerDown(e: MouseEvent | TouchEvent) {
		if (engine) engine.handlePointerDown(e);
	}

	function onPointerMove(e: MouseEvent | TouchEvent) {
		if (engine) engine.handlePointerMove(e);
	}
</script>

<canvas
	bind:this={canvasRef}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	class="block h-screen w-full cursor-grab overflow-hidden outline-none active:cursor-grabbing"
	aria-label="Galaxia 3D interactiva"
>
</canvas>
