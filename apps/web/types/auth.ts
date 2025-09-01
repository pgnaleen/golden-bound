export interface User {
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface AuthContextType {
  user: User | null
  tokens: AuthTokens | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

export interface RegisterData {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface RefreshTokenResponse {
  accessToken: string
  expiresIn: number
  tokenType: string
}

export interface UpdateUserProfileData {
  firstName?: string
  lastName?: string
  email?: string
  username?: string
}
