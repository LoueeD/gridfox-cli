import {Command, Flags, CliUx} from '@oclif/core'
import {getTables, writeClassFile, writeJSONFile} from '../api/tables'
// import * as fs from 'fs-extra'
// import * as path from 'node:path'
import Table = require('easy-table')

export default class CreateScreen extends Command {
  static description = 'Generate Gridfox Custom Screen'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    let apikey = await CliUx.ux.prompt('Whats your Gridfox API key?')
    CliUx.ux.action.start('Getting Gridfox Tables ...')
    apikey = 'cli.NpUoypXCgPZe9fWbYGmdcWwMPoewcQywc4Xtvm3tPUZflcIWfjT8pDm6FhHNSDsX'

    const table = new Table()

    if (apikey) {
      const data = await getTables(apikey)

      for (const row of data) {
        const {name, singularName, fields, referenceFieldName} = row
        const singular = name === singularName ? '' : `(${singularName})`
        table.cell('Table Name', `${name} ${singular}`)
        table.cell('Primary Key', referenceFieldName)
        const fieldNames = fields.map((f: any) => f.name)
        table.cell('Fields', fieldNames.join(', '))
        table.newRow()
      }

      writeClassFile()
      writeJSONFile(data)
    }

    CliUx.ux.action.stop()

    this.log()
    this.log(table.toString())

    // const {args, flags} = await this.parse(CreateScreen)
    // const name = flags.name ?? 'world'
    // this.log(`hello ${apikey} from /Users/lou/git/gridfox-cli/src/commands/scaffold.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
