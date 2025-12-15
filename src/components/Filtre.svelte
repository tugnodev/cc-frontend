<script>
  function onSort() {
    console.log("Trier cliqué");
  }

  function onFilter() {
    console.log("Filtres cliqué");
  }
</script>

<div class="floating-filter">

  <button class="action" on:click={onSort}>
    <span>Trier</span>
    <span class="icon">
      <svg class="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5L12 19M12 5L16 9M12 5L8 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 19L12 5M12 19L16 15M12 19L8 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>

  <span class="separator"></span>

  <button class="action" on:click={onFilter}>
    <span>Filtres</span>
    <span class="icon">
      <svg class="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>

</div>

<style>
  .floating-filter {
    position: fixed;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: #1f1f1f;
    color: white;
    border-radius: 28px;
    padding: 12px 22px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.35);
    z-index: 999;
  }

  .action {
    background: none;
    border: none;
    color: white;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  /* Règle CSS pour dimensionner les SVG des icônes */
  .icon svg.w-6 {
    width: 24px; /* Taille pour l'icône */
    height: 24px;
    /* La couleur de remplissage (fill) est "none" et la ligne (stroke) est blanche dans le SVG. */
  }

  .separator {
    width: 1px;
    height: 20px;
    background: rgba(255,255,255,0.35);
  }

  .action:active {
    opacity: 0.7;
  }
</style>