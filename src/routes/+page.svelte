<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let form;

  let file: File | null = null;

  function onChange(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
  }
  $: buttonClass = file
    ? "border-black bg-black text-white hover:bg-white hover:text-black"
    : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400";

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file-upload", file);
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("File upload failed:", await response.text());
      return;
    }
    // Redirect to a new page
    goto("/about");
  }
</script>

<main class="relative flex min-h-screen flex-col items-center justify-center">
  <style>
    @keyframes gradient-shift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  </style>
  <h1
    class="pt-4 pb-2 bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 bg-clip-text
    text-center text-6xl font-bold tracking-tight text-transparent md:text-9xl animate-gradient"
    style="font-family: 'Roboto', sans-serif; background-size: 200% 200%; animation: gradient-shift 5s ease infinite;"
  >
    Career Cue!
  </h1>
  <div
    class="flex flex-col items-center w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl
     dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
  >
    <form
      on:submit|preventDefault={handleSubmit}
      class="grid gap-6 w-full mt-2"
      action="?/upload"
      method="POST"
      enctype="multipart/form-data"
      use:enhance={() => {
        return async ({ update }) => {
          file = null;
          update({ reset: true });
        };
      }}
    >
      <div>
        <div class="space-y-1 mb-4">
          <h2 class="text-2xl font-semibold">Upload your resume file</h2>
          <p class="text-sm text-gray-500">Accepted formats: .PDF</p>
        </div>
        <label
          for="file-upload"
          class="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          {#if !file}
            <div class="absolute z-[5] h-full w-full rounded-md">
              <div
                class={`${""} absolute z-[3] flex h-full w-full flex-col items-center
                justify-center rounded-md px-10 transition-all
                ${"bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:from-teal-300 hover:via-teal-400 hover:to-teal-500 animate-gradient"}`}
              >
                <style>
                  @keyframes gradient-pulse {
                    0% {
                      background-position: 0% 50%;
                    }
                    50% {
                      background-position: 50% 50%;
                    }
                    100% {
                      background-position: 0% 50%;
                    }
                  }
                  .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient-pulse 20s ease infinite;
                  }
                  .animate-gradient:hover {
                    animation: gradient-pulse 1s ease infinite;
                  }
                </style>
                <style>
                  /* subtle jiggle animation on hover */
                  .jiggle:hover {
                    animation: jiggle 3s infinite;
                  }
                  /* subtle expansion on hover */
                  .expand:hover {
                    transform: scale(2);
                    transition: all 0.3s ease-in-out;
                  }
                  /* keyframes for jiggle animation */
                  @keyframes jiggle {
                    0%,
                    100% {
                      transform: translateX(0);
                    }
                    25% {
                      transform: translateX(-1px);
                    }
                    75% {
                      transform: translateX(1px);
                    }
                  }
                  /* keyframes for pulse animation */
                  @keyframes pulse {
                    0%,
                    100% {
                      transform: scale(1);
                    }
                    50% {
                      transform: scale(0.95);
                    }
                  }
                </style>

                <img
                  src="/logo.png"
                  alt="Logo"
                  class="w-24 mb-4 transition-all duration-500 transform jiggle pulse cursor-pointer"
                />
                <p class="mt-2 text-center text-sm text-gray-500">
                  Click to upload.
                </p>
                <p class="mt-2 text-center text-sm text-gray-500">
                  Max file size: 10MB
                </p>
                <span class="sr-only">File upload</span>
              </div>
            </div>
          {:else}
            <p>{file.name}</p>
          {/if}
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="application/pdf"
            class="sr-only"
            on:change={onChange}
          />
        </div>
      </div>

      <button
        disabled={!file}
        class="{buttonClass} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
      >
        <p class="text-sm">Confirm upload</p>
      </button>
      {#if form && !file}
        <div class="p-2">
          <p class="font-semibold text-gray-900">File uploaded!</p>
          <p class="mt-1 text-sm text-gray-500">
            Your file has been uploaded to{" "}
            <a
              class="font-medium text-gray-900 underline"
              href={form.uploaded}
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.uploaded}
            </a>
          </p>
        </div>
      {/if}
    </form>
  </div>
  <div
    class="flex justify-center gap-1 font-light text-gray-600 w-full max-w-lg text-center mt-6"
  >
    Built for Dartmouth Product Design & Development Class, Fall 2023.
  </div>
</main>
