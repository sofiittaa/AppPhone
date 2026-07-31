# Guía de contribución

## Ramas

- `master` — rama estable. Solo recibe merges desde `develop` cuando el código está probado.
- `develop` — rama de trabajo activo. Los cambios nuevos se hacen acá (directamente o vía ramas `feature/...` si trabajás en equipo).

Flujo sugerido:

```bash
git checkout develop
git pull origin develop
# ... trabajás, commiteás ...
git push origin develop
# cuando develop está estable:
git checkout master
git merge develop
git push origin master
```

## Convención de commits

A partir de ahora, los commits siguen el formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>: <descripción breve en imperativo>
```

Tipos usados en este proyecto:

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad (ej. `feat: agregar checkout en dos pasos`) |
| `fix` | Corrección de un bug (ej. `fix: validar cvv en checkout`) |
| `docs` | Cambios de documentación (README, comentarios, este archivo) |
| `refactor` | Cambio de código que no agrega funcionalidad ni corrige un bug |
| `chore` | Tareas de mantenimiento (dependencias, limpieza de código muerto) |
| `style` | Cambios de formato/estilo que no afectan la lógica |
| `test` | Agregar o corregir tests |

Ejemplos:

```
feat: agregar historial de pedidos por usuario
fix: corregir validación de número en dirección de checkout
docs: completar README con instrucciones de instalación
chore: eliminar navegación legacy no utilizada (RootStack, AuthStack)
```

El historial de commits previo a esta convención no se modifica (reescribir commits ya subidos a GitHub puede romper el repositorio remoto); esta convención aplica desde el próximo commit en adelante.
