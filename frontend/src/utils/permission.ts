export type PermissionRequirement =
  | string
  | string[]
  | {
      any?: string[]
      all?: string[]
    }

function normalizeRequirement(requirement: PermissionRequirement): { any: string[]; all: string[] } {
  if (typeof requirement === 'string') {
    return { any: [requirement], all: [] }
  }

  if (Array.isArray(requirement)) {
    return { any: requirement, all: [] }
  }

  return {
    any: requirement.any ?? [],
    all: requirement.all ?? [],
  }
}

export function hasAnyPermission(userPermissions: string[], required: string[]): boolean {
  if (!required.length) {
    return true
  }

  if (!userPermissions.length) {
    return false
  }

  const permissionSet = new Set(userPermissions)
  return required.some((permission) => permissionSet.has(permission))
}

export function hasAllPermissions(userPermissions: string[], required: string[]): boolean {
  if (!required.length) {
    return true
  }

  if (!userPermissions.length) {
    return false
  }

  const permissionSet = new Set(userPermissions)
  return required.every((permission) => permissionSet.has(permission))
}

export function canAccess(userPermissions: string[], requirement: PermissionRequirement): boolean {
  const normalized = normalizeRequirement(requirement)
  return hasAllPermissions(userPermissions, normalized.all) && hasAnyPermission(userPermissions, normalized.any)
}
