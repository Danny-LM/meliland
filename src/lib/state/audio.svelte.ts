import type { AudioTrack } from "$lib/types";

class AudioState {
    currentTrack = $state<AudioTrack | null>(null);
    isPlaying = $state(false);
    audioElement = $state<HTMLAudioElement | null>(null);

    init(audioEl: HTMLAudioElement) {
        this.audioElement = audioEl;
    }

    setTrack(track: AudioTrack) {
        if (this.currentTrack?.audioFile !== track.audioFile) {
            this.currentTrack = track;
            this.isPlaying = true;
            setTimeout(() => {
                this.audioElement?.play().catch(() => (this.isPlaying = false));
            }, 50);
        }
    }

    toggle() {
        if (!this.audioElement) return;
        if (this.isPlaying) {
            this.audioElement.pause();
            this.isPlaying = false;
        } else {
            this.audioElement.play().catch(() => { });
            this.isPlaying = true;
        }
    }

    pause() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.isPlaying = false;
        }
    }
}

export const globalAudio = new AudioState();
