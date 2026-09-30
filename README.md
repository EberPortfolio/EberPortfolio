# Eber · Portfolio

Portfolio de Eber, diseñador gráfico y director de arte. React 19 + Vite + Tailwind CSS v4 + Framer Motion.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # build de producción en dist/
npm run lint     # oxlint
```

## Temas

Tres temas: oscuro (por defecto), claro y cremita. Se eligen con el botón del navbar y se recuerdan en `localStorage` (`eber-theme`).

- Las clases `dark:` de Tailwind responden a la clase `.dark` en `<html>` (ver `@variant dark` en `src/index.css`), no al modo del sistema.
- Los colores de fondo de cada tema están en `src/context/ThemeContext.jsx` y en el script inline de `index.html` (tienen que coincidir).
- Los ajustes específicos de claro y cremita viven en `src/index.css`.

## Contenido

- Proyectos y obra de autor: `src/data/projects.js`
- Perfil, texto del About, servicios, redes y email: `src/data/services.js`
- Cada caso de estudio tiene link propio: `/#caso/<id>`.

## Imágenes (Cloudinary)

Las imágenes viven en Cloudinary (cloud `le59kgwh`). En los datos se referencian por **public ID** (por ejemplo `about_me`) y `src/lib/cloudinary.js` arma las URLs con formato y calidad automáticos (`f_auto,q_auto`) y un `srcset` responsivo. Las URLs completas (`https://…`) siguen funcionando tal cual.

El formulario de contacto no tiene backend: arma el mail con los datos completados y lo abre en el cliente de correo del visitante.
