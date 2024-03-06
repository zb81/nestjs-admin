import { Logger } from '@nestjs/common'
import { Logger as ITypeOrmLogger, LogLevel, LoggerOptions, QueryRunner } from 'typeorm'

export class TypeOrmLogger implements ITypeOrmLogger {
  private logger = new Logger(TypeOrmLogger.name)

  constructor(private options: LoggerOptions) { }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (!this.checkLogLevelEnabled('query'))
      return

    const sql
      = query
      + (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : '')

    this.logger.log(`[QUERY]: ${sql}`)
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    if (!this.checkLogLevelEnabled('error'))
      return

    const sql
      = query
      + (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : '')

    this.logger.error([`[FAILED QUERY]: ${sql}`, `[QUERY ERROR]: ${error}`])
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    const sql
      = query
      + (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : '')

    this.logger.warn(`[SLOW QUERY: ${time} ms]: ${sql}`)
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (!this.checkLogLevelEnabled('schema'))
      return

    this.logger.log(message)
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    if (!this.checkLogLevelEnabled('migration'))
      return

    this.logger.log(message)
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (!this.checkLogLevelEnabled(level))
      return

    switch (level) {
      case 'log':
        this.logger.debug(message)
        break
      case 'info':
        this.logger.log(message)
        break
      case 'warn':
        this.logger.warn(message)
        break
      default:
        break
    }
  }

  private stringifyParams(params: any[]) {
    try {
      return JSON.stringify(params)
    }
    catch (e) {
      this.logger.error(`Error serializing parameters: ${e.message}`)
      return params
    }
  }

  private checkLogLevelEnabled(level: LogLevel): boolean {
    return this.options === 'all'
      || this.options === true
      || (Array.isArray(this.options) && this.options.includes(level))
  }
}
