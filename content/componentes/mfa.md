# Verificación (MFA)

El componente `Input MFA` captura un código de verificación de un solo uso (OTP) dígito a dígito. Se usa en autenticación de dos factores y confirmación por correo/SMS.

## Previsualización

<div class="ds-preview ds-col">
<div class="ds-mfa">
<span class="cell is-filled">4</span>
<span class="cell is-filled">8</span>
<span class="cell is-filled">2</span>
<span class="cell is-active"></span>
<span class="cell"></span>
<span class="cell"></span>
</div>
<p class="ds-caption" style="font-size:13px;color:var(--n-medium)">Ingresa el código de 6 dígitos que enviamos a tu correo.</p>
</div>

## Anatomía

1. **Celdas**: una por dígito (habitualmente 4 o 6), con foco visible en la activa.
2. **Estados**: vacía, activa (con foco), rellena, y error (borde `Stroke/status/danger`).
3. **Ayuda**: dónde se envió el código y opción de reenviar.

## Comportamiento

- Al escribir un dígito, el foco avanza a la siguiente celda automáticamente.
- **Pegar** el código completo lo distribuye entre las celdas.
- `Backspace` en una celda vacía retrocede a la anterior.
- Botón **Reenviar** con cuenta regresiva para evitar spam.

## Reglas de uso

:::do
Permite pegar el código completo y detecta el autocompletado del SMS/correo del sistema operativo. Muestra claramente a dónde se envió.
:::

:::dont
No ocultes los dígitos ingresados ni bloquees el pegado: dificulta una tarea ya de por sí tediosa.
:::

## Accesibilidad

- Cada celda es un campo con etiqueta accesible ("dígito 1 de 6").
- Los errores se anuncian y explican el siguiente paso (reenviar, revisar).
- Todo el flujo es operable por teclado.
