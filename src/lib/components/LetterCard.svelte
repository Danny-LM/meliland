<script lang="ts">
    import { base } from "$app/paths";
    import type { Letter } from "../types";

    interface Props {
        letter?: Letter | null;
        onclick?: () => void;
    }

    let { letter = null, onclick }: Props = $props();

    function formatShortDate(dateString: string) {
        const date = new Date(dateString + "T00:00:00");
        return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long" }).format(date);
    }
</script>

{#if letter}
    <button 
        {onclick} 
        class="group flex w-full cursor-pointer flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
    >
        <div class="relative aspect-square w-full overflow-hidden rounded-4xl p-4 md:p-5">
            <img src="{base}/icon/body.svg" alt="" class="absolute inset-0 h-full w-full object-contain object-bottom p-4 md:p-5" />
            
            <img 
                src="{base}/icon/flap-open.svg" 
                alt="" 
                class="absolute inset-0 h-full w-full object-contain object-bottom p-4 opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100 group-hover:delay-100 group-hover:duration-200 group-hover:ease-out motion-reduce:transition-none md:p-5" 
            />
            
            <img 
                src="{base}/icon/letter.svg" 
                alt="Carta" 
                class="absolute inset-0 h-full w-full translate-y-3 object-contain object-bottom p-4 opacity-0 transition-all duration-150 ease-in group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150 group-hover:duration-300 group-hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none md:p-5" 
            />
            
            <img src="{base}/icon/pocket-front.svg" alt="" class="absolute inset-0 h-full w-full object-contain object-bottom p-4 md:p-5" />
            
            <img 
                src="{base}/icon/flap-closed.svg" 
                alt="Sobre cerrado" 
                class="absolute inset-0 h-full w-full object-contain object-bottom p-4 opacity-100 transition-opacity duration-200 ease-in group-hover:opacity-0 group-hover:duration-150 group-hover:ease-out motion-reduce:transition-none md:p-5" 
            />
        </div>
        <span class="text-sm font-bold tracking-wide text-pink-100 transition-colors group-hover:text-white md:text-base">
            {formatShortDate(letter.date)}
        </span>
    </button>
{:else}
    <div class="flex w-full flex-col items-center gap-3">
        <div class="relative aspect-square w-full overflow-hidden rounded-4xl p-4 md:p-5">
            <img src="{base}/icon/body.svg" alt="" class="absolute inset-0 h-full w-full object-contain object-bottom p-4 opacity-10 blur-[1.5px] grayscale md:p-5" />
            <img src="{base}/icon/flap-closed.svg" alt="" class="absolute inset-0 h-full w-full object-contain object-bottom p-4 opacity-10 blur-[1.5px] grayscale md:p-5" />
        </div>
        <span class="text-sm font-bold tracking-wide text-pink-100/15 md:text-base">
            ???
        </span>
    </div>
{/if}
