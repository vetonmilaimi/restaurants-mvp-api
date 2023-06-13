import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallBack = (error: Error | null, destination: string) => void
type FileNameCallBack = (error: Error | null, filename: string) => void

class Multipart {
  private destination: string
  private allowedExtensions: string[]
  private limitFileSize: { fileSize: number }
  private storage: multer.StorageEngine

  constructor() {
    this.destination = 'public/images'
    this.allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg']
    this.limitFileSize = { fileSize: 1024 * 1024 * 30 }
    this.storage = multer.diskStorage({
      destination: this.handleDestination,
      filename: this.handleFileName,
    })
  }
  private handleDestination = (_req: Request, _file: Express.Multer.File, cb: DestinationCallBack): void => {
    cb(null, this.destination)
  }
  private handleFileName = (_req: Request, file: Express.Multer.File, cb: FileNameCallBack): void => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extArray = file.mimetype.split('/')
    const extension = extArray[extArray.length - 1]

    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }

  private handleFileFilter = (_request: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    cb(null, this.allowedExtensions.includes(file.mimetype))
  }

  public upload = (): multer.Multer => {
    return multer({
      storage: this.storage,
      fileFilter: this.handleFileFilter,
      limits: this.limitFileSize,
    })
  }
}

export default new Multipart()
