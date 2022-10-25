<script lang="ts" setup>
import { presenter } from "@/presenter/index";
import Editor from "@/shared/components/Editor.vue";
import { onMounted, ref } from "vue";
import EmptyBackground from "./EmptyBackground.vue";

const init = `{
  "last_name": "balam"
}`

const state = ref(0);

const noCompile = ref(false)

const sendBackend = ref();
const reciveBackend = ref();

const reciveFront = ref();

const transform = () => {
    state.value = 1;

    const code = presenter({ value: sendBackend.value, style: "camel" });
    reciveFront.value = code;

    setTimeout(() => {
        reciveBackend.value = presenter({ value: code, style: "snake" });
        state.value = 2;
    }, 1000);

    setTimeout(() => {
        state.value = 3;
    }, 1100);

};

onMounted(() => {
    transform()
})
</script>

<template>
    <div
        class="w-full bg-gradient-to-br from-slate-800 to-gray-900 min-h-[100vh] top-0 left-0 py-32 px-24 flex justify-center">
        <div class="max-w-[80rem]">
            <div class="text-center">
                <p class="text-slate-300 text-6xl font-semibold tracking-wide">¿Capa de <span
                        class="text-blue-400">Presentación</span>?</p>
                <div class="mt-10 text-slate-400 px-32">
                    <p class="text-base tracking-[0.12rem]">En este pequeño post se enseña el funcionamiento de la capa
                        de
                        presentación dentro de una arquitectura Frontend, con la simulación de una comunicación
                        bidireccional
                        de un servicio Backend.
                    </p>
                </div>
                <div class="mt-20 text-slate-400">
                    <p class="!tracking-[0.6rem]">PLAYGROUND</p>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mt-8">
                <div class="bg-slate-800 bg-opacity-90 p-6 text-center rounded-t-2xl text-gray-500">
                    <p>Backend</p>
                </div>
                <div class=" col-span-2 bg-slate-800 bg-opacity-60 p-5 text-center rounded-t-2xl text-gray-500">
                    <p>Frontend</p>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mt-3">
                <!-- INIT: Backend -->
                <div class="flex flex-col gap-6">
                    <div class="bg-slate-800 bg-opacity-90 rounded-b-2xl p-10 h-full">
                        <div class="text-slate-600 text-sm">
                            <p>End-point service</p>
                        </div>
                        <Editor class="h-[10rem] mt-6" :initialValue="init" @update="(value: string) => {
                            sendBackend = value
                        }" @hasError="(value: boolean) => {
    noCompile = value
}" />
                        <div class="flex justify-center mt-8">
                            <button @click="transform" :disabled="noCompile || state === 1"
                                class="enabled:bg-blue-500 disabled:bg-slate-700 h-14 px-8 rounded-full enabled:active:scale-95 duration-100">
                                <p :class="[(noCompile || state === 1 ? 'text-slate-600' : 'text-blue-100')]">Send
                                    data</p>
                            </button>
                        </div>
                    </div>
                    <!-- <div class="h-2/4">
                        <EmptyBackground v-if="state < 4" class="h-full" />
                        <div v-else-if="state > 1" class="bg-slate-800 opacity-50 rounded-3xl p-10 text-slate-300 h-full">
                            {{ reciveFront }}</div>
                    </div> -->
                </div>
                <!-- END: Backend -->

                <!-- INIT: Presenter -->
                <div class="flex flex-col gap-6">
                    <div class="h-full">
                        <EmptyBackground :class="['h-full flex justify-center items-center text-center']">
                            <div>
                                <div class="text-center text-slate-400 text-base">
                                    <p class="font-semibold">PRESENTER LAYER</p>
                                </div>
                                <div v-if="state === 0">
                                    <p class="text-slate-600 text-sm">waiting</p>
                                    <i class='bx bxs-alarm-snooze text-3xl text-slate-600 mt-0.5'></i>
                                </div>
                                <div v-else-if="state === 1">
                                    <p class="text-slate-600 text-sm">snake_case to camelCase</p>
                                    <i class="bx bx-loader-alt text-3xl text-slate-600 animate-spin mt-0.5"></i>
                                </div>
                                <div v-else>
                                    <p class="text-slate-600 text-sm">Complete</p>
                                    <i class="bx bxs-check-circle text-3xl text-slate-600 mt-0.5"></i>
                                </div>
                            </div>
                        </EmptyBackground>
                    </div>
                    <!-- <div  class="h-2/4">
                        <EmptyBackground v-if="state === 0" class="h-full rounded-t-none" />
                        <div v-else-if="state > 0"
                            class="bg-slate-800 opacity-50 rounded-3xl p-10 flex justify-center items-center text-center h-full">
                            <div>
                                <p class="text-slate-100">Presenter</p>
                                <i v-if="state === 1" class='bx bx-loader-alt text-3xl text-slate-100 animate-spin mt-0.5'></i>
                                <i v-else class='bx bxs-check-circle text-3xl text-slate-100 mt-0.5'></i>
                            </div>
                        </div>
                    </div> -->
                </div>
                <!-- END: Presenter -->

                <!-- INIT: Frontend -->
                <div class="flex flex-col gap-6">
                    <div class="h-full">
                        <EmptyBackground class="h-full">
                            <div class="text-slate-600 text-sm">
                                <p>Service Layer</p>
                                <div v-show="state > 2">
                                    <div class="mt-6 h-[10rem] overflow-auto">
                                        <pre class="text-blue-400 text-base"><code>{{ reciveFront }}</code></pre>

                                    </div>
                                    <div class="flex justify-center mt-8">
                                        <button @click="transform" :disabled="noCompile || state === 1"
                                            class="border enabled:border-blue-400 disabled:border-slate-700 h-14 px-8 rounded-full enabled:active:scale-95 duration-100">
                                            <p
                                                :class="[(noCompile || state === 1 ? 'text-gray-500' : 'text-blue-400')]">
                                                Return</p>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </EmptyBackground>
                    </div>
                    <!-- <div class="h-2/4">
                        <EmptyBackground v-if="state < 3" class="h-full" />
                        <div v-else-if="state > 1" class="bg-slate-800 opacity-50 rounded-3xl p-10 text-slate-300 h-full">
                            {{ reciveFront }}</div>
                    </div> -->
                </div>
                <!-- END: Frontend -->
            </div>
            <div class="mt-20 flex justify-center">
                <a href="https://github.com/DidierBalam/presenter-layer-landing/blob/dev/src/presenter/index.ts"
                    target="_blank" class="flex justify-center items-center text-slate-400 hover:bg-slate-800 w-max px-6 py-2 rounded-full active:scale-95 duration-100" rel="noopener noreferrer">
                    <i class='bx bxl-github text-4xl'></i>
                    <p class="ml-2">Presenter</p>
                </a>
            </div>
        </div>
    </div>
</template>
