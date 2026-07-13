# Para desarrolladores

Cómo consumir el design system desde código y mantener la fidelidad con los diseños de Figma.

## Tokens de diseño

Los tokens son la representación en código de las decisiones de diseño (colores, tipografía, espaciado). Son la única fuente válida de estos valores: si un valor no existe como token, no debería estar en el código.

```css
:root {
  /* Color */
  --color-primary: #5B5BD6;
  --color-primary-hover: #4646C6;
  --color-text: #1A1A2E;
  --color-text-muted: #61616E;
  --color-surface: #FFFFFF;
  --color-border: #E4E4EA;

  /* Espaciado (base 4px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Tipografía */
  --font-family: "Inter", system-ui, sans-serif;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 24px;

  /* Bordes y sombras */
  --radius-sm: 8px;
  --radius-md: 12px;
  --shadow-sm: 0 1px 3px rgba(20, 20, 40, 0.08);
}
```

:::info
Esta tabla de tokens es un punto de partida. Sustitúyela por los valores reales exportados desde Figma (por ejemplo, con *Figma Variables* o herramientas como Tokens Studio / Style Dictionary).
:::

## Reglas de implementación

:::do
Usa siempre tokens (`var(--color-primary)`) en lugar de valores literales. Cuando el diseño cambie, tu código se actualizará solo.
:::

:::dont
No copies valores hexadecimales directamente desde Figma al CSS. Ese valor quedará huérfano en la próxima actualización de la paleta.
:::

## Flujo de trabajo con diseño

1. **Revisa la documentación del componente** antes de implementarlo: define estados y comportamiento que quizá no se ven en el mockup.
2. **Inspecciona en Figma** con el modo Dev para obtener medidas y tokens exactos.
3. **Valida accesibilidad**: navegación por teclado, foco visible, textos alternativos y contraste.
4. Si detectas una inconsistencia entre Figma y esta documentación, repórtala siguiendo el proceso de [contribución](#/recursos/contribuir).

## Definición de "hecho" para un componente

- [ ] Coincide visualmente con Figma en todos los estados.
- [ ] Usa solo tokens del sistema (sin valores mágicos).
- [ ] Es navegable por teclado y anuncia su estado a lectores de pantalla.
- [ ] Responde correctamente en móvil y escritorio.
