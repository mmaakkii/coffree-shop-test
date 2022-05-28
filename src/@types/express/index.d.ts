declare module 'express' {
  export interface Request {
    body: Record<string, any>
    params: Record<string, any>
  }
}
