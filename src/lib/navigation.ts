import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import type { Pathname } from "$app/types";

export function navigateTo(path: Pathname) {
    return goto(resolve(path));
}
