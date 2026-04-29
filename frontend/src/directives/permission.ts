import type { App, Directive } from 'vue'
import { useUserStore } from '../stores/user'
import { canAccess, type PermissionRequirement } from '../utils/permission'

type PermissionElement = HTMLElement & {
  __previousDisplay?: string
}

const permissionDirective: Directive<PermissionElement, PermissionRequirement> = {
  mounted(el, binding) {
    applyVisibility(el, binding.value)
  },
  updated(el, binding) {
    applyVisibility(el, binding.value)
  },
}

function applyVisibility(el: PermissionElement, requirement: PermissionRequirement) {
  const store = useUserStore()
  const allowed = canAccess(store.permissions, requirement)

  if (allowed) {
    if (el.__previousDisplay !== undefined) {
      el.style.display = el.__previousDisplay
      delete el.__previousDisplay
    }
    return
  }

  if (el.__previousDisplay === undefined) {
    el.__previousDisplay = el.style.display
  }
  el.style.display = 'none'
}

export function registerPermissionDirective(app: App) {
  app.directive('permission', permissionDirective)
}

