<script lang="ts">
	import { X } from "@lucide/svelte";
	import type { Letter } from "../types";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	interface Props {
		letter: Letter;
		onClose: () => void;
	}

	let { letter, onClose }: Props = $props();

	function formatFullDate(dateString: string) {
		const date = new Date(dateString + "T00:00:00");
		return new Intl.DateTimeFormat("es-MX", {
			day: "numeric",
			month: "long",
			year: "numeric"
		}).format(date);
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
	transition:fade={{ duration: 300 }}
>
	<div class="absolute inset-0 cursor-pointer" aria-hidden="true" onclick={onClose}></div>

	<div
		class="relative flex h-[85vh] w-full max-w-lg flex-col rounded-sm border border-[#e2d5c3] bg-[#F9F4E8] p-6 shadow-2xl md:p-8"
		style="box-shadow: inset 0 0 40px rgba(139, 115, 85, 0.1), 0 25px 50px -12px rgba(0,0,0,0.5);"
		in:fly={{ y: 150, duration: 600, easing: cubicOut }}
		out:fade={{ duration: 200 }}
	>
		<button
			onclick={onClose}
			class="absolute top-4 right-4 z-10 cursor-pointer p-2 text-[#8b7355] transition-colors hover:text-[#5c4033]"
		>
			<X class="h-6 w-6" />
		</button>

		<div class="shrink-0 border-b border-[#d8c3a5] pb-4 text-center">
			<h2 class="mb-1 font-serif text-2xl font-bold text-[#5c4033] md:text-3xl">{letter.title}</h2>
			<p class="text-sm tracking-widest text-[#8b7355] uppercase">{formatFullDate(letter.date)}</p>
		</div>

		<div class="paper-scroll mt-5 flex-1 overflow-y-auto pr-3">
			<div
				class="prose prose-stone flex max-w-none flex-col gap-4 font-serif text-base leading-relaxed text-[#4a3b32] md:text-lg"
			>
				{#each letter.content as block, i (i)}
					{#if block.type === "text"}
						<p class="m-0 whitespace-pre-wrap">{block.text}</p>
					{:else if block.type === "image"}
						<div
							class="flex w-full"
							class:justify-start={block.align === "left"}
							class:justify-center={!block.align || block.align === "center"}
							class:justify-end={block.align === "right"}
						>
							<img
								src={block.src}
								alt={block.alt || "Imagen adjunta"}
								class="max-h-64 rounded-sm border-4 border-[#f1e6d0] object-cover shadow-sm sepia-20 transition-all duration-500 hover:sepia-0"
							/>
						</div>
					{:else if block.type === "video"}
						<div
							class="flex w-full"
							class:justify-start={block.align === "left"}
							class:justify-center={!block.align || block.align === "center"}
							class:justify-end={block.align === "right"}
						>
							<video
                                src={block.src}
                                controls
                                class="max-h-64 rounded-sm border-4 border-[#f1e6d0] object-cover shadow-sm"
                            >
                                <track kind="captions" />
                            </video>
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<div class="mt-5 shrink-0 border-t border-[#d8c3a5] pt-4 text-center">
			<button
				onclick={onClose}
				class="cursor-pointer rounded-sm border border-[#8b7355] px-6 py-2 font-serif text-[#5c4033] italic transition-colors hover:bg-[#e8dcc7]"
			>
				Guardar :D
			</button>
		</div>
	</div>
</div>

<style>
	.paper-scroll::-webkit-scrollbar {
		width: 6px;
	}
	.paper-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	.paper-scroll::-webkit-scrollbar-thumb {
		background-color: #d8c3a5;
		border-radius: 10px;
	}
	.paper-scroll::-webkit-scrollbar-thumb:hover {
		background-color: #c2a983;
	}
	.paper-scroll {
		scrollbar-width: thin;
		scrollbar-color: #d8c3a5 transparent;
	}
</style>
