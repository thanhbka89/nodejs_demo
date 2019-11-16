import SettingRepository from '@/repositories/settingRepository'
import UserRepository from '@/repositories/userRepository'
import CodeRepository from '@/repositories/codeRepository'

const repositories = {
  setting: SettingRepository,
  user: UserRepository,
  code: CodeRepository
}

export default {
  get: name => repositories[name]
}
