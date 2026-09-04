<script lang="ts">
	import { VolumeX, Music } from '@lucide/svelte';
	import { globalAudio } from '$lib/state/audio.svelte';
</script>

{#if globalAudio.currentTrack}
	<button
		onclick={() => globalAudio.toggle()}
		class="fixed bottom-5 left-5 z-60 flex cursor-pointer items-center gap-3 rounded-full border border-pink-500/40 bg-pink-500/10 p-3 text-left shadow-lg shadow-pink-900/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
	>
		<div
			class="relative flex h-10 w-10 items-center justify-center rounded-full border border-pink-500/50 bg-pink-950"
		>
			{#if globalAudio.isPlaying}
				<div class="flex animate-spin items-center justify-center" style="animation-duration: 3s;">
					<Music class="h-6 w-6 animate-spin" style="animation-duration: 12s;" />
				</div>
			{:else}
				<VolumeX class="h-5 w-5 text-pink-400/50" />
			{/if}
		</div>
		<div class="pr-2">
			<p class="text-sm leading-tight font-bold text-pink-100">
				{globalAudio.currentTrack.songName}
			</p>
			<p class="text-xs leading-tight text-pink-300/70">{globalAudio.currentTrack.artist}</p>
		</div>
	</button>
{/if}
