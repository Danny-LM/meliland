<script lang="ts">
	import { Heart } from "@lucide/svelte";
	import type { PlanetData } from "../data/words";

	interface Props {
		planet: PlanetData | null;
		onClose: () => void;
	}

	let { planet, onClose }: Props = $props();

	let countdown = $state(0);

	$effect(() => {
		if (planet) {
			countdown = 3;

			const timer = setInterval(() => {
				countdown -= 1;
				if (countdown <= 0) {
					clearInterval(timer);
				}
			}, 1000);

			return () => clearInterval(timer);
		}
	});
</script>

{#if planet}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
		<div
			class="relative flex w-full max-w-md flex-col gap-4 rounded-2xl border border-pink-500/40 bg-[#12071f] p-6 text-pink-100 shadow-2xl shadow-pink-500/20"
		>

			{#if planet.image}
				<div
					class="h-48 w-full overflow-hidden rounded-xl border border-pink-500/20 bg-pink-950/30"
				>
					<img src={planet.image} alt={planet.title} class="h-full w-full object-cover" />
				</div>
			{/if}

			<div class="flex items-center gap-2 text-xl font-bold text-pink-400">
				<Heart class="h-5 w-5 fill-pink-500 text-pink-500" />
				<h2>{planet.title}</h2>
			</div>

			<p class="text-sm leading-relaxed text-pink-100/80 md:text-base">
				{planet.description}
			</p>

			<button
				onclick={onClose}
				disabled={countdown > 0}
                class="mt-2 w-full rounded-xl border border-pink-500/50 py-2.5 font-medium transition-all
                       {countdown > 0 
                           ? "cursor-not-allowed bg-pink-900/20 text-pink-400/50" 
                           : "cursor-pointer bg-pink-600/30 text-pink-200 hover:bg-pink-600/50"}"
			>
				{countdown > 0 ? `Espera (${countdown})...` : "Cerrar carta"}
			</button>
		</div>
	</div>
{/if}
