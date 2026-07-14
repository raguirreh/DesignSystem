# Para desarrolladores

Cómo consumir el design system de Pacífico desde código manteniendo la fidelidad con Figma y el soporte multimarca.

## Tokens de diseño

Los tokens son la representación en código de las decisiones de diseño. Reflejan las colecciones de la **Core Tokens Library**. Este es un mapeo de ejemplo a variables CSS:

```css
:root {
  /* Primitivos de color (Primitives Colors) */
  --blue-medium: #0099CC;
  --blue-high: #007499;
  --black-xhigh: #121314;
  --black-medium: #6A6C74;

  /* Escala base (Primitives Scale) */
  --scale-100: 4px;
  --scale-200: 8px;
  --scale-300: 12px;
  --scale-400: 16px;
  --scale-500: 24px;

  /* Tipografía (Primitive Typography) */
  --size-xs: 12px;
  --size-s: 14px;
  --size-m: 16px;
  --size-l: 24px;

  /* Medidas (Core Sizes) */
  --radius-small: 8px;
  --radius-medium: 16px;
  --border-small: 1px;
}

/* Tokens semánticos por marca (modo) */
:root[data-brand="pacifico"] {
  --fill-brand-primary-medium: #0099CC;
  --fill-brand-secondary-medium: #E02667;
}
:root[data-brand="sanna"] {
  --fill-brand-primary-medium: #01A355;
  --fill-brand-secondary-medium: #5D59EF;
}
:root[data-brand="tsanna"] {
  --fill-brand-primary-medium: #5D59EF;
  --fill-brand-secondary-medium: #01A355;
}

/* Neutrales y estados: iguales en las tres marcas */
:root {
  --text-neutral-xhigh: #121314;
  --text-neutral-medium: #6A6C74;
  --fill-status-danger-medium: #DC3B31;
  --fill-status-success-medium: #1FA78D;
}
```

:::info
Los valores anteriores están extraídos de la librería real. Lo ideal es **exportarlos automáticamente** desde Figma (Figma Variables + Tokens Studio o Style Dictionary) para no mantenerlos a mano.
:::

## Multimarca

El sistema tiene tres modos: **Pacífico, Sanna, Tsana**. Solo cambian los tokens `brand/*`; `neutral/*` y `status/*` son compartidos. Implementa la marca como un atributo raíz (`data-brand`) y deja que los tokens semánticos hagan el resto: los componentes no cambian.

## Reglas de implementación

:::do
Consume siempre el token semántico (`var(--fill-brand-primary-medium)`), no el primitivo ni el hex. Así el cambio de marca y los ajustes de paleta se propagan solos.
:::

:::dont
No copies valores hexadecimales desde Figma al CSS. Ese valor quedará huérfano en la próxima actualización de la paleta o de la marca.
:::

## Definición de "hecho"

- [ ] Coincide visualmente con Figma en todos los estados.
- [ ] Usa solo tokens semánticos (sin primitivos ni valores mágicos).
- [ ] Funciona en las tres marcas sin cambios de código.
- [ ] Navegable por teclado y anuncia su estado a lectores de pantalla.
- [ ] Responde en móvil y escritorio.
