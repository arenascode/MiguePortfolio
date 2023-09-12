
export class ValidationError extends Error {

  constructor(message, details) {
    super(message) 
    this.name = "Validation Error",
    this.details = details;
    this.timestap = Date().toString(),
    this.trackrate = this.captureStackTrace();
  }

  captureStackTrace() {
    const stack = new Error().stack;
    return stack.split('/n').slice(3).join('/n')
  }
  
  logError() {
    console.error(`[${this.timestap}] [${this.name}]`)
    console.error(`[${this.message}]`)
    console.error(`[${this.details}]`)
    console.error(`[ Stack Trace: ${this.details}]`)
  }

}