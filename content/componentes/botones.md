# Botones

Los botones permiten al usuario ejecutar acciones. Su jerarquía visual comunica la importancia relativa de cada acción en la pantalla.

:::info
Embebe aquí el componente real de tu librería con `::figma <url del frame del botón>`. Mientras tanto, esta página documenta la estructura y las reglas de uso.
:::

## Variantes

| Variante | Uso | Cuántos por pantalla |
| --- | --- | --- |
| **Primario** | La acción principal del flujo | Solo uno |
| **Secundario** | Acciones alternativas de peso medio | Los necesarios |
| **Terciario / Ghost** | Acciones de baja prioridad | Los necesarios |
| **Destructivo** | Acciones irreversibles (eliminar, cancelar suscripción) | Solo cuando aplica |

## Anatomía

1. **Contenedor**: altura fija por tamaño, radio `radius-sm`, padding horizontal `space-4`.
2. **Etiqueta**: estilo `body` o `body-small` según tamaño, peso 600.
3. **Icono** (opcional): `icon-md`, antes o después de la etiqueta, separado por `space-2`.

## Tamaños

| Tamaño | Altura | Uso |
| --- | --- | --- |
| Grande | 48px | Momentos clave: onboarding, checkout |
| Mediano | 40px | Tamaño por defecto |
| Pequeño | 32px | Barras de herramientas y tablas |

## Estados

Todo botón define estos estados: **default, hover, active, focus, deshabilitado y cargando**.

- El estado de foco muestra un anillo visible de 2px (nunca se elimina el outline).
- El estado cargando reemplaza la etiqueta por un spinner y bloquea clics repetidos.
- El estado deshabilitado mantiene contraste suficiente para leerse (no menos de 3:1).

## Redacción de etiquetas

:::do
Usa verbos que describan el resultado: **"Guardar cambios"**, **"Crear proyecto"**, **"Enviar invitación"**.
:::

:::dont
Evita etiquetas genéricas como "Aceptar", "OK" o "Sí". Fuera de contexto no comunican qué va a pasar.
:::

## Reglas de uso

:::do
Coloca la acción primaria en la posición más prominente (abajo a la derecha en modales, al final del formulario) y mantén esa posición en todo el producto.
:::

:::dont
No uses dos botones primarios en la misma vista, ni un botón primario para acciones destructivas: usa la variante destructiva.
:::
