// Utilidad para obtener la URL base de la API según el entorno
export const getApiBaseUrl = () => process.env.NEXT_PUBLIC_API_URL || '';
