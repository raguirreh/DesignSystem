# Principios de diseño

Estos principios guían cada decisión de diseño del sistema. Cuando dudes entre dos soluciones, vuelve a esta página: la respuesta suele estar aquí.

## 1. Claridad ante todo

La interfaz debe comunicar su propósito sin necesidad de explicación. Cada pantalla responde a una pregunta: *¿qué puede hacer aquí el usuario y cómo?*

- Prioriza una acción principal por pantalla.
- Usa lenguaje directo y verbos concretos ("Guardar cambios", no "Aceptar").
- Elimina todo lo que no ayude a completar la tarea.

## 2. Consistente, no uniforme

Los mismos problemas se resuelven siempre de la misma manera, pero la consistencia no debe impedir que cada contexto reciba la solución que necesita.

- Reutiliza patrones existentes antes de inventar nuevos.
- Si necesitas apartarte del sistema, documenta por qué: esa excepción puede ser el origen de un nuevo patrón.

## 3. Accesible por defecto

La accesibilidad no es una capa final, es un requisito de partida. Diseñamos para todas las personas, en todos los contextos.

- Contraste mínimo **WCAG AA** en todo el texto.
- Toda funcionalidad debe poder completarse solo con teclado.
- El color nunca es el único vehículo de información.

## 4. El contenido manda

El diseño está al servicio del contenido, no al revés. La jerarquía visual debe reflejar la jerarquía de la información.

- Diseña primero con contenido real, no con *lorem ipsum*.
- Contempla los extremos: textos largos, listas vacías, datos faltantes.

## 5. Eficiente para el equipo

El sistema existe para que el equipo avance más rápido. Cada componente debe ser fácil de encontrar, entender y aplicar.

- Documenta cada componente con ejemplos de uso real.
- Nombra las cosas como las llamaría el equipo, no como las llamaría un framework.

:::info
¿Añadirías un principio? ¿Cambiarías uno? Los principios también evolucionan: propón cambios a través del [proceso de contribución](#/recursos/contribuir).
:::
