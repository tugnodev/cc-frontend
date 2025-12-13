<script>
  import { onMount, onDestroy } from "svelte";

  export let images = [
    "https://via.placeholder.com/1000x260?text=Pub+1",
    "https://via.placeholder.com/1000x260?text=Pub+2",
    "https://via.placeholder.com/1000x260?text=Pub+3",
  ];

  export let interval = 5000;

  let idx = 0;
  /**
   * @type {number | null | undefined}
   */
  let timer;
  let touchStartX = 0;
  let touchEndX = 0;
  let isTransitioning = false;
  const SWIPE_THRESHOLD = 50;
  const TRANSITION_MS = 700;

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startTimer() {
    stopTimer();
    if (interval && interval > 0 && images.length > 1)
      timer = setInterval(next, interval);
  }

  function next() {
    if (!isTransitioning && images.length > 0) {
      isTransitioning = true;
      idx = (idx + 1) % images.length;
      setTimeout(() => {
        isTransitioning = false;
      }, TRANSITION_MS);
    }
  }

  function prev() {
    if (!isTransitioning && images.length > 0) {
      isTransitioning = true;
      idx = (idx - 1 + images.length) % images.length;
      setTimeout(() => {
        isTransitioning = false;
      }, TRANSITION_MS);
    }
  }

  onMount(() => {
    startTimer();
  });
  onDestroy(() => {
    stopTimer();
  });
</script>

<div
  class="ad-banner w-11/12 mx-auto my-4 relative overflow-hidden rounded-lg shadow-lg"
  role="region"
  aria-label="Carousel de publicités"
  on:mouseenter={stopTimer}
  on:mouseleave={startTimer}
  on:touchstart={(e) => {
    touchStartX = e.touches[0].clientX;
  }}
  on:touchmove={(e) => {
    touchEndX = e.touches[0].clientX;
  }}
  on:touchend={() => {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX = 0;
    touchEndX = 0;
  }}
>
  {#if images && images.length}
    <div class="image-container relative w-full bg-base-300 overflow-hidden">
      {#if images.length > 1}
        <!-- Left arrow -->
        <button
          class="arrow left-arrow absolute top-1/2 z-30 p-2 rounded-full shadow pointer-events-auto"
          on:click={() => {
            prev();
            startTimer();
          }}
          aria-label="Précédent"
          title="Précédent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 16.293a1 1 0 010-1.414L8.414 11l3.879-3.879a1 1 0 10-1.414-1.414l-5 5a1 1 0 000 1.414l5 5a1 1 0 001.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Right arrow -->
        <button
          class="arrow right-arrow absolute top-1/2 z-30 p-2 rounded-full shadow pointer-events-auto"
          on:click={() => {
            next();
            startTimer();
          }}
          aria-label="Suivant"
          title="Suivant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 3.707a1 1 0 010 1.414L11.586 9 7.707 12.879a1 1 0 101.414 1.414l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      {/if}

      <div
        class="slides-wrapper flex"
        style="transform: translateX(calc(-{idx} * 100%));"
      >
        {#each images as image}
          <img
            src={image}
            alt="banner"
            class="w-full h-40 object-cover flex-shrink-0"
          />
        {/each}
      </div>

      <div
        class="dots-over absolute bottom-2 left-0 right-0 flex justify-center z-20 pointer-events-auto"
      >
        <div class="dots flex items-center px-2 py-0.5 rounded">
          {#each images as _, i}
            <button
              class="dot w-3 h-3 rounded-full mx-1"
              on:click={() => {
                idx = i;
                startTimer();
              }}
              aria-label="go-to"
              style="background: {i === idx
                ? 'white'
                : 'rgba(255,255,255,0.5)'}"
            ></button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .ad-banner {
    background: hsl(var(--s) / 0.1);
    cursor: grab;
  }

  .image-container,
  img {
    will-change: opacity;
  }

  .slides-wrapper {
    height: 100%;
    width: 100%;
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  /* arrow base styles (visuals) */
  .arrow {
    background: rgba(0, 0, 0, 0.35);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 150ms ease,
      transform 150ms ease,
      background 150ms ease;
    backdrop-filter: blur(4px);
    outline: none;
  }
  .arrow:hover,
  .arrow:focus {
    background: rgba(0, 0, 0, 0.55);
    transform: scale(1.04);
  }

  .left-arrow {
    left: 0.5rem;
    transform: translateY(-50%);
    top: 50%;
  }
  .right-arrow {
    right: 0.5rem;
    transform: translateY(-50%);
    top: 50%;
  }

  .dot {
    transition: all 0.3s ease;
  }
  .dot:hover {
    transform: scale(1.2);
  }

  .arrow {
    opacity: 0;
    transform: translateY(-50%) scale(0.95);
    pointer-events: none;
  }
  .ad-banner:hover .arrow,
  .ad-banner:focus-within .arrow {
    opacity: 1;
    transform: translateY(-50%) scale(1);
    pointer-events: auto;
  }
</style>
