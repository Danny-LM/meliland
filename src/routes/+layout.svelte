<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { globalAudio } from '$lib/state/audio.svelte';

	let { children } = $props();
	let audioEl = $state<HTMLAudioElement | null>(null);

	$effect(() => {
		if (audioEl) {
			globalAudio.init(audioEl);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<audio bind:this={audioEl} src={globalAudio.currentTrack?.audioFile} loop preload="auto"></audio>

{@render children()}
