/**
 * Generic API response structure used throughout the application.
 */
export interface ApiResponse<T = any> {
    success: boolean
    message?: string
    data?: T
    error?: string
}

/**
 * Structure for paginated API responses.
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number
    page: number
    limit: number
}
