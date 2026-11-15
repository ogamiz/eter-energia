# Éter · Gestor de energía

**Versión actual: 1.7.0** · [Historial de versiones](CHANGELOG.md)

Web: https://ogamiz.github.io/eter-energia/

Repositorio: https://github.com/ogamiz/eter-energia

Web estática para móvil, tableta y escritorio. La primera partida empieza con 72 de 100 de energía y la esfera azul. El botón Reiniciar llena la reserva hasta el total configurado.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo, por ejemplo `eter-energia`. Con GitHub Free, elige la visibilidad pública.
2. Descomprime el paquete. En la pestaña **Code**, entra en **Add file → Upload files** y arrastra los archivos que hay dentro. Comprueba que `index.html` está en la raíz del repositorio, junto a `app.js`. Confirma con **Commit changes**.
3. En **Settings → Pages**, selecciona **Deploy from a branch**, rama **main**, carpeta **/(root)** y pulsa **Save**.
4. Cuando termine el despliegue, abre **Visit site** en esa misma pantalla. En Safari puedes usar **Compartir → Añadir a la pantalla de inicio**.

Guía de GitHub: https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Durante la partida

- Pulsa la esfera para abrir la calculadora. Teclea, por ejemplo, `−15 + 8` y comprueba el resultado antes de aceptar. La operación se suma a la energía actual. Cancelar descarta la entrada. También puedes usar un teclado físico.
- Los botones laterales cambian la energía actual de uno en uno. La energía puede bajar hasta cero y las recuperaciones llegan hasta el total.
- Pulsa **Energía total** para editar la capacidad. La energía actual se conserva incluso si supera el nuevo total. En ese caso puedes gastar desde el valor real, y las recuperaciones vuelven a estar disponibles cuando quedas por debajo del total.
- **Acciones rápidas** aparece debajo de la esfera en una lista con desplazamiento propio. La tarjeta de energía sigue visible mientras recorres las acciones. Toca una fila para ejecutarla o **···** para editarla. **Nueva acción** permite añadir otra.
- En **Ajustes** aparecen primero el nombre de la energía (por ejemplo, Maná o Ki), después los doce colores y, al final, el idioma. El pie de la ventana muestra la versión instalada. El nombre se conserva entre sesiones; dejarlo vacío restaura Energía. La animación respeta la preferencia de movimiento reducido.
- Los cambios se guardan en el navegador de ese dispositivo y dirección. El uso sin conexión está disponible después de una primera carga completa con conexión y la instalación de la caché. Al borrar los datos del sitio se restablecen los valores iniciales.

## Probar antes de publicar

Puedes abrir `index.html` en el ordenador. Para probar también el modo sin conexión, sirve la carpeta por HTTP local o HTTPS. Por ejemplo, ejecuta `python3 -m http.server 8080` dentro de ella y abre http://localhost:8080/.

## Historial y orden de acciones

- **Historial**, junto a **Reiniciar**, muestra los cambios del más reciente al más antiguo. Solo la primera fila permite deshacer. Se restauran los valores exactos anteriores, incluidos los cambios del total. El historial se guarda en este navegador. Reiniciar iguala la reserva al total y borra el historial tras confirmar.
- Arrastra el asa de puntos de una acción para reordenarla, también en pantallas táctiles. La lista se desplaza al acercar el asa a sus bordes. Con teclado, enfoca el asa y usa las flechas arriba/abajo o Inicio/Fin. El orden se conserva al recargar.

## Varias reservas

- El botón **+** de la barra superior permite crear más reservas con nombre y color propios. Cada pestaña muestra su nombre y una bolita del color correspondiente. La barra se desplaza horizontalmente cuando hay muchas.
- Cada reserva conserva su energía actual, total, nombre, color, acciones (y su orden) e historial de forma independiente. Reiniciar o deshacer afecta solo a la reserva seleccionada. El idioma es común a toda la aplicación.
- La actualización conserva la reserva de la versión anterior como primera pestaña. Las reservas se guardan en un registro nuevo del navegador, conservando intacto el registro anterior.
- Para cambiar de pestaña con teclado, usa las flechas izquierda/derecha o Inicio/Fin. La última reserva seleccionada se conserva al recargar.
- Desliza horizontalmente sobre la tarjeta de energía, incluida la esfera, para cambiar de reserva: hacia la izquierda avanza y hacia la derecha vuelve a la anterior, siguiendo el orden de las pestañas. En los extremos se detiene. El gesto requiere al menos 60 píxeles y una dirección claramente horizontal. Tocar sigue abriendo la calculadora; arrastrar no activa los botones. La lista de acciones mantiene su desplazamiento y arrastre propios. Con una sola reserva o una ventana modal abierta, el cambio por gesto está desactivado.

## Eliminar y reordenar pestañas

- En **Ajustes → Eliminar reserva**, confirma la eliminación de esa reserva con sus valores, acciones e historial. Cancelar conserva los datos. Al eliminar la reserva activa se selecciona la siguiente o, si no hay otra después, la anterior. Si eliminas todas, puedes crear una nueva desde la pantalla vacía.
- Arrastra el asa de puntos de una pestaña para cambiar su posición. También puedes usar **Alt + flecha izquierda/derecha** sobre una pestaña enfocada; **Alt + Inicio/Fin** la lleva al principio/final. El arrastre desplaza la barra al llegar a los bordes y Escape cancela el gesto. El orden queda guardado y la reserva seleccionada no cambia.

## Acciones sobre ambos valores

En el editor de una acción, **Aplicar a → Ambos** cambia la energía actual y el total en la misma cantidad. Por ejemplo, −6 pasa de 72/100 a 66/94; +8 con una reserva llena de 100/100 la deja en 108/108. Cada valor respeta sus límites de 0 a 999999. La acción queda como un solo paso del historial, con los dos cambios visibles, y Deshacer restaura ambos valores exactos. Las opciones de solo actual y solo total mantienen su comportamiento anterior.

## Versionado

La versión se define en [`version.js`](version.js). Ajustes y la caché sin conexión usan ese mismo valor. La versión de los datos guardados es independiente.

Se conserva la numeración interna de las publicaciones anteriores, reconstruida en [CHANGELOG.md](CHANGELOG.md) a partir de los commits y de las mejoras solicitadas en el chat. **1.6.0** corresponde a las acciones sobre ambos valores; **1.6.1** hace visible y documenta la versión.

Para cada publicación, incrementa `ETER_VERSION` en `version.js`, añade su entrada al historial y actualiza la versión al principio de este README. Usa el primer número para cambios incompatibles, el segundo para nuevas funcionalidades y el tercero para correcciones o mantenimiento. El cambio de versión renueva la caché de la aplicación.
