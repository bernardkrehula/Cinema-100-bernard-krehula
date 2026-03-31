export class GenericError extends Error {
  isCustom: boolean;
  originalError: unknown;

  constructor(error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    super(message);
    this.name = "GenericError";
    this.isCustom = true;
    this.originalError = error;
  }
}