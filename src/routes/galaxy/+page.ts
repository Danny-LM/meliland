import { base } from "$app/paths";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    if (typeof window === "undefined") return {};

    const imagesToPreload = [
        `${base}/images/may1.png`,
        `${base}/images/may2.png`,
        `${base}/images/may3.png`,
        `${base}/images/may4.png`,
        `${base}/images/together1.png`,
        `${base}/images/together2.png`,
        `${base}/images/together3.png`,
        `${base}/images/together4.png`
    ];

    const preloadImage = (src: string) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    };

    const preloadAudio = (src: string) => {
        return new Promise((resolve) => {
            const audio = new Audio();
            audio.addEventListener("canplaythrough", resolve, { once: true });
            audio.addEventListener("error", resolve, { once: true });
            audio.preload = "auto";
            audio.src = src;
            audio.load();
        });
    };

    try {
        await Promise.all([
            ...imagesToPreload.map(preloadImage),
            preloadAudio(`${base}/music/CarlaMorrison-Compartir.mp3`)
        ]);
    } catch (e) {
        console.warn("An error while preloading assets: ", e);
    }

    return {};
};
