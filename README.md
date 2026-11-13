# Éter · Gestor de energía

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
- Abre **Acciones rápidas** en la esquina superior izquierda. Toca una acción para ejecutarla y volver a la esfera. Cada fila indica cuántos puntos cambia y si afecta a la energía actual o al total. **Nueva acción** permite guardar otra. Pulsa **···** para editar o eliminar una acción. Para cerrar el menú sin cambiar la energía, toca la X o la zona exterior, o pulsa Escape.
- En **Ajustes** puedes escoger español o inglés y uno de los doce colores. La animación respeta la preferencia del dispositivo de reducir movimiento.
- Los cambios se guardan en el navegador de ese dispositivo y dirección. El uso sin conexión está disponible después de una primera carga completa con conexión y la instalación de la caché. Al borrar los datos del sitio se restablecen los valores iniciales.

## Probar antes de publicar

Puedes abrir `index.html` en el ordenador. Para probar también el modo sin conexión, sirve la carpeta por HTTP local o HTTPS. Por ejemplo, ejecuta `python3 -m http.server 8080` dentro de ella y abre http://localhost:8080/.
