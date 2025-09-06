import { defineNuxtPlugin } from "#app";
import { gsap } from "gsap";
import scrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";
import TextPlugin from "gsap/dist/TextPlugin";

gsap.registerPlugin(scrambleTextPlugin, TextPlugin);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("gsap", gsap);
});
