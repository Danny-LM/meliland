<script lang="ts">
	import { Sparkles, Heart, Mail } from "@lucide/svelte";

	interface Props {
		onStart: (destination: "galaxy" | "letter") => void;
		isLoading: boolean;
		progress: number;
	}

	let { onStart, isLoading, progress }: Props = $props();

	let starClicks = $state(0);
	let isSecret = $state(false);

	function handleStarClick() {
		starClicks++;
		if (starClicks >= 3) {
			isSecret = !isSecret;
			starClicks = 0;
		}
	}
</script>

<div
	class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#080311] p-6 text-center text-pink-100 select-none"
>
	<div
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(circle at center, rgba(219, 39, 119, 0.25) 0%, rgba(8, 3, 17, 0) 70%);"
	></div>

	<div class="relative z-10 flex max-w-md flex-col items-center">
		<button
			onclick={handleStarClick}
			class="relative z-20 mb-6 cursor-pointer rounded-full border border-pink-500/30 bg-pink-950/40 p-3 text-pink-400 shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-110 active:scale-95"
		>
			{#if isSecret}
				<Mail class="h-8 w-8 animate-bounce" />
			{:else}
				<Sparkles class="h-8 w-8 animate-pulse" />
			{/if}
		</button>

		<h1
			class="mb-4 bg-linear-to-r from-pink-300 via-rose-300 to-pink-500 text-3xl font-extrabold tracking-tight md:text-5xl"
			style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent;"
		>
			Feliz Día de la Novia mi Niña
		</h1>

		<p
			class="mb-8 max-w-xs text-sm text-pink-200/70 transition-opacity duration-300 md:text-base {isSecret
				? "opacity-0"
				: "opacity-100"}"
		>
			Un universo hecho solo para ti :D
		</p>

		<div class="opacity-100 transition-opacity duration-500">
			{#if !isLoading}
				<button
					onclick={() => onStart(isSecret ? "letter" : "galaxy")}
					class="group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-linear-to-r from-pink-600 to-rose-500 px-8 py-4 font-semibold text-white shadow-lg shadow-pink-600/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-600/50 active:scale-95"
				>
					<span>{isSecret ? "ir al lugar secreto" : "click aquí mi princesa"}</span>
					<Heart
						class="h-5 w-5 fill-white transition-transform duration-300 group-hover:scale-125"
					/>
				</button>
			{:else}
				<div class="animate-fade-in flex w-full max-w-xs flex-col items-center gap-3">
					<span class="animate-pulse text-center text-sm font-medium text-pink-300">
						{#if isSecret}
							:0 lo descubriste... supongo tengo que llevarte ahi... {progress}%
						{:else}
							Cargando nuestro universo... {progress}%
						{/if}
					</span>

					<div
						class="h-2 w-full overflow-hidden rounded-full border border-pink-500/30 bg-pink-950/50"
					>
						<div
							class="h-full bg-linear-to-r from-pink-500 to-rose-400 transition-all duration-300 ease-out"
							style="width: {progress}%"
						></div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.animate-fade-in {
		animation: fadeIn 0.5s ease-out forwards;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
