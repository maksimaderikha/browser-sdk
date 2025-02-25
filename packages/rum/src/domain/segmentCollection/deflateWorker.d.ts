export function createDeflateWorker(): DeflateWorker

export interface DeflateWorker extends Worker {
  postMessage(message: DeflateWorkerAction): void
}

export type DeflateWorkerListener = (event: { data: DeflateWorkerResponse }) => void

export type DeflateWorkerAction =
  // Action to send when creating the worker to check if the communication is working correctly.
  // The worker should respond with a 'initialized' response.
  | {
      action: 'init'
    }
  // Action to send when writing some unfinished data. The worker will respond with a 'wrote'
  // response, with the same id and measurements of the wrote data bytes count.
  | {
      action: 'write'
      id: number
      data: string
    }
  // Action to send when finishing to write some data. The worker will respond with a 'flushed'
  // response, with the same id, measurements of the wrote data bytes count and the complete deflate
  // data.
  | {
      action: 'flush'
      id: number
      data?: string
    }

export type DeflateWorkerResponse =
  // Response to 'init' action
  | {
      type: 'initialized'
    }
  // Response to 'write' action
  | {
      type: 'wrote'
      id: number
      compressedBytesCount: number
      additionalBytesCount: number
    }
  // Response to 'flush' action
  | {
      type: 'flushed'
      id: number
      result: Uint8Array
      additionalBytesCount: number
      rawBytesCount: number
    }
  // Could happen at any time when something goes wrong in the worker
  | {
      type: 'errored'
      error: Error | string
    }
