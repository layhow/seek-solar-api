import convict from 'convict'

const PORT = {
  doc: 'The port to bind',
  format: 'port',
  default: process.env.PORT,
  env: 'PORT'
}

const config = convict({
  port: PORT
})

const validated = config.validate({ allowed: 'strict' })

export default validated