export interface PersistedUserProfile {
  username: string
  displayName: string
  roles: string[]
  permissions: string[]
  authChecked: boolean
}

const USER_PROFILE_KEY = 'my-blog-user-profile'

export function getPersistedUserProfile(): PersistedUserProfile | null {
  const raw = localStorage.getItem(USER_PROFILE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as PersistedUserProfile
  } catch {
    localStorage.removeItem(USER_PROFILE_KEY)
    return null
  }
}

export function setPersistedUserProfile(profile: PersistedUserProfile): void {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
}

export function clearPersistedUserProfile(): void {
  localStorage.removeItem(USER_PROFILE_KEY)
}
