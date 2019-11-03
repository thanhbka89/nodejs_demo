import SettingRepository from '@/repositories/settingRepository'
import UserRepository from '@/repositories/userRepository'

const repositories = {
  setting: SettingRepository,
  user: UserRepository
}

export default {
  get: name => repositories[name]
}
