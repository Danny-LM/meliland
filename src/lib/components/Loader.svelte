<script lang="ts">
  import { Sparkles, Heart, Mail } from "@lucide/svelte";
  import { fade, fly, scale } from 'svelte/transition';

  interface Props {
    onStart: (destination: "galaxy" | "letter") => void;
    isLoading: boolean;
    progress: number;
  }

  let { onStart, isLoading, progress }: Props = $props();

  let starClicks = $state(0);
  let isSecret = $state(false);
  let secretPulse = $state(false);

  function handleStarClick() {
    starClicks++;
    if (starClicks >= 3) {
      isSecret = !isSecret;
      starClicks = 0;
      
      secretPulse = true;
      setTimeout(() => {
        secretPulse = false;
      }, 500);
    }
  }
</script>

<div class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#080311] p-6 text-center text-pink-100 select-none">
  
  <div
    class="pointer-events-none absolute inset-0 transition-all duration-700"
    style="background: radial-gradient(circle at center, {isSecret ? 'rgba(147, 51, 234, 0.3)' : 'rgba(219, 39, 119, 0.25)'} 0%, rgba(8, 3, 17, 0) 70%);"
  ></div>

  <div class="relative z-10 flex max-w-md flex-col items-center">
    
    <button
      onclick={handleStarClick}
      aria-pressed={isSecret}
      class="relative z-20 mb-6 cursor-pointer rounded-full border border-pink-500/30 bg-pink-950/40 p-3 shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-110 active:scale-95 {secretPulse ? 'secret-pulse' : ''} {isSecret ? 'text-purple-400' : 'text-pink-400'}"
    >
      {#if isSecret}
        <div in:scale={{ duration: 300, start: 0.5 }} out:scale={{ duration: 200, start: 0.5 }} class="absolute inset-0 flex items-center justify-center">
          <Mail class="h-8 w-8 animate-bounce" />
        </div>
      {:else}
        <div in:scale={{ duration: 300, start: 0.5 }} out:scale={{ duration: 200, start: 0.5 }} class="flex items-center justify-center">
          <Sparkles class="h-8 w-8 animate-pulse" />
        </div>
      {/if}
    </button>

    <h1
      class="mb-4 bg-linear-to-r text-3xl font-extrabold tracking-tight md:text-5xl {isSecret ? 'secret-title from-purple-300 via-fuchsia-300 to-purple-500' : 'from-pink-300 via-rose-300 to-pink-500'}"
      style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; transition: all 0.5s ease;"
    >
      MELILAND
    </h1>

    <div class="relative mb-8 h-6 w-full">
      {#if !isSecret}
        <p
          in:fly={{ y: -10, duration: 300, delay: 150 }}
          out:fly={{ y: 10, duration: 300 }}
          class="absolute inset-0 text-sm text-pink-200/70 md:text-base"
        >
          Un universo hecho solo para ti :D
        </p>
      {:else}
        <p
          in:fly={{ y: -10, duration: 300, delay: 150 }}
          out:fly={{ y: 10, duration: 300 }}
          class="absolute inset-0 text-sm font-medium italic text-purple-300/90 md:text-base"
        >
          Me has descubierto... :O
        </p>
      {/if}
    </div>

    <div class="transition-opacity duration-500 w-full flex justify-center">
      {#if !isLoading}
        <button
          onclick={() => onStart(isSecret ? "letter" : "galaxy")}
          class="group relative inline-flex cursor-pointer items-center gap-3 rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden
                 {isSecret ? 'bg-linear-to-r from-purple-700 to-fuchsia-600 shadow-purple-900/50 hover:shadow-purple-600/50' : 'bg-linear-to-r from-pink-600 to-rose-500 shadow-pink-600/30 hover:shadow-pink-600/50'}"
          in:scale={{ duration: 200, start: 0.95 }}
          out:fade={{ duration: 150 }}
        >
          <div class="relative h-6 w-48 overflow-hidden">
            {#if isSecret}
              <span in:fly={{ y: 20, duration: 300 }} out:fly={{ y: -20, duration: 300 }} class="absolute inset-0 flex items-center justify-center">Ir a investigar</span>
            {:else}
              <span in:fly={{ y: 20, duration: 300 }} out:fly={{ y: -20, duration: 300 }} class="absolute inset-0 flex items-center justify-center">Entrar a nuestro universo</span>
            {/if}
          </div>
          <Heart class="h-5 w-5 fill-white transition-transform duration-300 group-hover:scale-125 z-10" />
        </button>
      {:else}
        <div
          class="flex w-full max-w-xs flex-col items-center gap-3"
          in:fade={{ duration: 300, delay: 200 }}
          out:fade={{ duration: 200 }}
        >
          <span class="animate-pulse text-center text-sm font-medium {isSecret ? 'text-purple-300' : 'text-pink-300'}">
            {#if isSecret}
              no te asustes por lo que vayas a ver... {progress}%
            {:else}
              Cargando nuestro universo... {progress}%
            {/if}
          </span>
          <div class="h-2 w-full overflow-hidden rounded-full border border-pink-500/30 bg-pink-950/50">
            <div
              class="h-full transition-all duration-300 ease-out {isSecret ? 'bg-linear-to-r from-purple-500 to-fuchsia-400' : 'bg-linear-to-r from-pink-500 to-rose-400'}"
              style="width: {progress}%"
            ></div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .secret-pulse {
    animation: pulseGlow 0.5s ease-out;
  }

  @keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
    100% { box-shadow: 0 0 20px 10px rgba(168, 85, 247, 0); }
  }

  .secret-title {
    animation: glitch 0.3s linear 1;
  }

  @keyframes glitch {
    0% { transform: translate(0); filter: hue-rotate(0deg); }
    20% { transform: translate(-3px, 2px); filter: hue-rotate(90deg); }
    40% { transform: translate(3px, -2px); filter: hue-rotate(-90deg); }
    60% { transform: translate(-2px, 3px); filter: hue-rotate(45deg); }
    80% { transform: translate(2px, -3px); filter: hue-rotate(-45deg); }
    100% { transform: translate(0); filter: hue-rotate(0deg); }
  }
</style>
