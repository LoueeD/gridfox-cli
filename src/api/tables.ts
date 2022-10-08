import {apiGet} from '../helper/request'
import * as fs from 'node:fs'

export const getTables = (key?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'api.gridfox.com',
      port: '443',
      path: '/tables',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'gridfox-api-key': key,
      },
    }

    try {
      const data = apiGet(options)
      resolve(data)
    } catch (error: any) {
      reject(error)
    }
  })
}

export const writeClassFile = (): void => {
  const stream = fs.createWriteStream('employee.ts')
  stream.once('open', function () {
    stream.write('export interface Employee {\n')
    stream.write('  name: string;\n')
    stream.write('}\n')
    stream.end()
  })
}

export const writeJSONFile = (json: Record<string, any>): void => {
  const stream = fs.createWriteStream('tables.json')
  stream.once('open', function () {
    stream.write(JSON.stringify(json, null, 2))
    stream.end()
  })
}
