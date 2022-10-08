import * as https from 'node:https'

export const apiGet = (options: https.RequestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    https.get(options, res => {
      let body = ''

      res.on('data', chunk => {
        body += chunk
      })

      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          resolve(json)
        } catch (error) {
          reject(error)
        }
      })
    }).on('error', error => {
      console.error(error.message)
    })
  })
}

export const httpRequest: any = (urlOptions: any, data = '') => {
  return new Promise((resolve, reject) => {
    const req = https.request(urlOptions, res => {
      const chunks = [] as any

      res.on('data', chunk => chunks.push(chunk))
      res.on('error', reject)
      res.on('end', () => {
        const {statusCode, headers} = res
        const validResponse = statusCode !== undefined && (statusCode >= 200 && statusCode <= 299)
        const body = chunks.join('')

        if (validResponse) resolve({statusCode, headers, body})
        else reject(new Error(`Request failed. status: ${statusCode}, body: ${body}`))
      })
    })

    req.on('error', reject)
    req.write(data, 'binary')
    req.end()
  })
}
