<script setup>

</script>

<template>
    <h1> </h1>
    <img id="landing-page-img" src="public/images/about/lobby2.jpg"/>
    <h1>Eleganz seit 1476 – Willkommen im Hotel Vue</h1>
<p>Tradition, Charme und ein Gastgeber, der niemals schläft…</p>
<div d-flex flex-column flex-md-row gap-2 align-items-stretch>
    <b-button class="btn btn-primary w-49">Zimmer buchen</b-button>
    <b-button class="btn btn-secondary w-49">Das Hotel entdecken</b-button>
</div>
</template>

<style>
#landing-page-img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto 1rem;
}

.btn{
    background: var(--color-accent);
    margin: 0 1rem;

}
</style>

