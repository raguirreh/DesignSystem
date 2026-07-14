# Introducción

Bienvenido a **Blister**, el **Design System de Pacífico Salud**. Este sitio es la fuente única de verdad para diseñar y construir los productos digitales de Pacífico Salud de forma consistente: aquí viven la arquitectura de tokens, los principios de diseño, la documentación de componentes y los recursos del equipo.

## Un sistema, varias marcas

El design system está construido sobre **tokens** y soporta varias marcas a la vez mediante *modos*. La misma estructura de tokens semánticos cambia de piel según la marca:

| Marca | Color primario | Color secundario |
| --- | --- | --- |
| **Pacífico** | `#0099CC` | `#E02667` |
| **Sanna** | `#01A355` | `#5D59EF` |
| **Tsana** | `#5D59EF` | `#01A355` |

Esto significa que un botón "primario" es siempre el mismo componente: al cambiar el modo de marca, adopta automáticamente los colores correctos sin rediseñar nada.

## Cómo está organizado

El sistema se reparte en dos librerías de Figma y esta documentación:

| Capa | Qué contiene | Dónde |
| --- | --- | --- |
| **Core Tokens Library** | Primitivos y tokens semánticos (color, tipografía, escala, medidas) | [Arquitectura de tokens](#/fundamentos/arquitectura-tokens) |
| **Global Components Library** | Componentes reutilizables (Button, Input, Radio, Toast…) | [Componentes](#/componentes/botones) |
| **Documentación** (este sitio) | Guías de uso, principios y buenas prácticas | Aquí mismo |

## El sistema en números

- **50** colores primitivos organizados en 10 familias (Blue, Pink, Green, Amber, Jade, Ruby, Sapphire, Purple, Topaz, Black).
- **175** tokens semánticos de color (Fill, Text, Icons, Stroke, Surface) × 3 modos de marca.
- **8** tamaños tipográficos (xs → 4xl) y una escala de espaciado de **15** pasos.
- Más de **100** familias de componentes documentadas.

## Cómo navegar

- Usa el **buscador** (⌘K o Ctrl+K); en la portada te pregunta directamente *¿qué necesitas saber hoy?*.
- Empieza por [Arquitectura de tokens](#/fundamentos/arquitectura-tokens) para entender cómo encaja todo.
- Cada página de componente sigue la misma estructura: **anatomía → variantes → estados → buenas prácticas**.

:::info
Esta documentación se alimenta directamente de las librerías de Figma **Core Tokens Library** y **Global Components Library**. Los valores que ves (colores, tamaños, nombres de token) son los reales del sistema.
:::
