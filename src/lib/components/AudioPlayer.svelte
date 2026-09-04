<script lang="ts">
	import { Music, VolumeX } from "@lucide/svelte";

	interface Props {
		isPlaying?: boolean;
		toggleAudio: () => void;
	}

	let { isPlaying = false, toggleAudio }: Props = $props();
</script>

<button
	onclick={toggleAudio}
	class="fixed top-5 right-5 z-40 cursor-pointer rounded-full border border-pink-500/40 bg-pink-950/60 p-3 text-pink-300 shadow-lg shadow-pink-900/30 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
	title={isPlaying ? "Pausar música" : "Reproducir música"}
>
	{#if isPlaying}
		<Music class="h-6 w-6 animate-spin" style="animation-duration: 4s;" />
	{:else}
		<VolumeX class="h-6 w-6 text-pink-400/50" />
	{/if}
</button>
